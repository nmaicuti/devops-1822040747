
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document
            .getElementById("username")
            .value.trim();

        const password = document
            .getElementById("password")
            .value;

        const message = document.getElementById("login-message");

        const users = getUsers();

        const user = users.find(item =>
            item.username === username &&
            item.password === password
        );

        if (!user) {
            message.textContent = "Tên đăng nhập hoặc mật khẩu không đúng!";
            return;
        }

        if (!user.active) {
            message.textContent = "Tài khoản đã bị khóa. Vui lòng liên hệ Admin!";
            return;
        }

        saveSession(user);

        if (user.role === "admin") {
            window.location.href = "admin/index.html";
        } else {
            window.location.href = "index.html";
        }
    });
}
