
document.addEventListener("DOMContentLoaded", function () {
    const authNavigation = document.getElementById("auth-navigation");

    if (!authNavigation) return;

    const session = getSession();

    // Chưa đăng nhập
    if (!session) {
        authNavigation.innerHTML = `
            <a href="login.html" class="login-link">
                ĐĂNG NHẬP
            </a>
        `;
        return;
    }

    // Kiểm tra tài khoản còn tồn tại và đang hoạt động
    const users = getUsers();

    const currentUser = users.find(user =>
        user.id === session.id && user.active
    );

    if (!currentUser) {
        clearSession();

        authNavigation.innerHTML = `
            <a href="login.html" class="login-link">
                ĐĂNG NHẬP
            </a>
        `;
        return;
    }

    // Hiển thị thông tin tài khoản
    const welcome = document.createElement("span");
    welcome.className = "welcome-user";
    welcome.textContent = `Xin chào, ${currentUser.name}`;

    authNavigation.innerHTML = "";
    authNavigation.appendChild(welcome);

    // Nếu là Admin thì hiển thị nút quản trị
    if (currentUser.role === "admin") {
        const adminLink = document.createElement("a");

        adminLink.href = "admin/index.html";
        adminLink.className = "admin-link";
        adminLink.textContent = "QUẢN TRỊ";

        authNavigation.appendChild(adminLink);
    }

    // Nút đăng xuất
    const logoutButton = document.createElement("button");

    logoutButton.type = "button";
    logoutButton.className = "logout-button";
    logoutButton.textContent = "ĐĂNG XUẤT";

    logoutButton.addEventListener("click", function () {
        clearSession();
        window.location.reload();
    });

    authNavigation.appendChild(logoutButton);
});
