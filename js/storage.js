
const STORAGE_KEYS = {
    USERS: "reviewverse_users",
    SESSION: "reviewverse_session",
    PRODUCTS: "reviewverse_products",
    REVIEWS: "reviewverse_reviews"
};

function readStorage(key, fallback = []) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        console.error("Không thể đọc dữ liệu:", error);
        return fallback;
    }
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Khởi tạo dữ liệu mẫu
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        writeStorage(STORAGE_KEYS.USERS, [
            {
                id: "ADMIN001",
                name: "Quản trị viên",
                username: "admin",
                password: "admin123",
                role: "admin",
                active: true
            }
        ]);
    }

    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
        writeStorage(STORAGE_KEYS.PRODUCTS, products);
    }

    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
        writeStorage(STORAGE_KEYS.REVIEWS, []);
    }
}

// Người dùng
function getUsers() {
    return readStorage(STORAGE_KEYS.USERS, []);
}

function saveUsers(users) {
    writeStorage(STORAGE_KEYS.USERS, users);
}

// Phiên đăng nhập
function getSession() {
    return readStorage(STORAGE_KEYS.SESSION, null);
}

function saveSession(user) {
    writeStorage(STORAGE_KEYS.SESSION, {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
    });
}

function clearSession() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
}

// Sản phẩm
function getProducts() {
    return readStorage(STORAGE_KEYS.PRODUCTS, products);
}

function saveProducts(items) {
    writeStorage(STORAGE_KEYS.PRODUCTS, items);
}

// Đánh giá
function getReviews() {
    return readStorage(STORAGE_KEYS.REVIEWS, []);
}

function saveReviews(reviews) {
    writeStorage(STORAGE_KEYS.REVIEWS, reviews);
}

initializeStorage();
