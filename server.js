const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// data.json is inside /public
const DATA_FILE = path.join(__dirname, 'public', 'data.json');

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeData(d) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2));
}

/* =========================
   AUTH
   ========================= */
app.post('/api/auth/login', (req, res) => {
  const { username, password, role } = req.body;
  const data = readData();

  const user = data.users.find(
    u => u.username === username && u.password === password && u.role === role
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const { password: pw, ...safeUser } = user;
  res.json(safeUser);
});

/* =========================
   EMPLOYEE LEAVES
   ========================= */

// Get my requests
app.get('/api/leaves/my-requests', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const data = readData();
  const myLeaves = data.leaves.filter(l => l.userId === userId);
  res.json(myLeaves);
});

// Apply new leave
app.post('/api/leaves', (req, res) => {
  const { userId, leaveType, startDate, endDate, totalDays, reason } = req.body;

  if (!userId || !leaveType || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const data = readData();
  const nextId = data.leaves.length
    ? Math.max(...data.leaves.map(l => l.id)) + 1
    : 1;

  const newLeave = {
    id: nextId,
    userId,
    leaveType,                 // sick | casual | vacation
    startDate,
    endDate,
    totalDays: totalDays || 1,
    reason: reason || '',
    status: 'pending',
    managerComment: '',
    createdAt: new Date().toISOString()
  };

  data.leaves.push(newLeave);
  writeData(data);

  res.json(newLeave);
});

// Cancel a leave (used by employee)
app.delete('/api/leaves/:id', (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const idx = data.leaves.findIndex(l => l.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: 'Leave not found' });
  }

  data.leaves.splice(idx, 1);
  writeData(data);
  res.json({ success: true });
});

/* =========================
   MANAGER LEAVES
   ========================= */

app.get('/api/leaves/all', (req, res) => {
  const data = readData();
  res.json(data.leaves);
});

app.get('/api/leaves/pending', (req, res) => {
  const data = readData();
  const pending = data.leaves.filter(l => l.status === 'pending');
  res.json(pending);
});

// Approve
app.put('/api/leaves/:id/approve', (req, res) => {
  const id = Number(req.params.id);
  const { managerComment } = req.body;

  const data = readData();
  const leave = data.leaves.find(l => l.id === id);
  if (!leave) return res.status(404).json({ error: 'Not found' });

  leave.status = 'approved';
  leave.managerComment = managerComment || '';
  writeData(data);

  res.json(leave);
});

// Reject
app.put('/api/leaves/:id/reject', (req, res) => {
  const id = Number(req.params.id);
  const { managerComment } = req.body;

  const data = readData();
  const leave = data.leaves.find(l => l.id === id);
  if (!leave) return res.status(404).json({ error: 'Not found' });

  leave.status = 'rejected';
  leave.managerComment = managerComment || '';
  writeData(data);

  res.json(leave);
});

/* =========================
   LEAVE BALANCE
   ========================= */
// Base quota
const BASE_BALANCE = {
  sick: 10,
  casual: 5,
  vacation: 5
};

app.get('/api/leaves/balance', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const data = readData();
  const user = data.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Start from base
  const balance = { ...BASE_BALANCE };

  // Subtract approved leaves only
  const myApproved = data.leaves.filter(
    l => l.userId === userId && l.status === 'approved'
  );

  myApproved.forEach(l => {
    if (balance[l.leaveType] !== undefined) {
      balance[l.leaveType] = Math.max(0, balance[l.leaveType] - l.totalDays);
    }
  });

  res.json({
    sickLeave: balance.sick,
    casualLeave: balance.casual,
    vacation: balance.vacation
  });
});

/* =========================
   FALLBACK FOR FRONTEND
   (don’t catch /api)
   ========================= */
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* =========================
   START SERVER
   ========================= */
app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});
