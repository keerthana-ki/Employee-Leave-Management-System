document.getElementById("loginBtn").addEventListener("click", async () => {
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter username & password");
        return;
    }

    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role })
        });

        if (!res.ok) {
            alert("Invalid credentials!");
            return;
        }

        const user = await res.json();

        
        localStorage.setItem("lm_user", JSON.stringify(user));

        // redirect based on role
        if (role === "manager") {
            window.location.href = "manager.html";
        } else {
            window.location.href = "employee.html";
        }

    } catch (error) {
        console.error(error);
        alert("Server error");
    }
});
