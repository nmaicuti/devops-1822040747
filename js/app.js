
// ========================================
// REVIEWVERSE - MAIN APPLICATION
// ========================================

let reviews = getReviews();
let votedReviews = getVotedReviews();

let activeCategory = "all";

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryTabs = document.getElementById("category-tabs");
const reviewForm = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");
const reviewFilter = document.getElementById("review-filter");
const reviewSort = document.getElementById("review-sort");
const modal = document.getElementById("product-modal");
const formMessage = document.getElementById("form-message");

// ========================================
// 1. PRODUCT RENDERING
// ========================================

function getProductReviews(productId) {
    return reviews.filter(
        review => Number(review.productId) === Number(productId)
    );
}

function calculateAverage(productReviews) {
    if (!productReviews.length) return 0;

    const total = productReviews.reduce(
        (sum, review) => sum + review.rating, 0
    );

    return total / productReviews.length;
}

function renderProducts() {
    const keyword = searchInput.value.trim().toLowerCase();

    const filteredProducts = PRODUCTS.filter(product => {
        const matchCategory =
            activeCategory === "all" ||
            product.category === activeCategory;

        const matchKeyword =
            product.name.toLowerCase().includes(keyword);

        return matchCategory && matchKeyword;
    });

    document.getElementById("product-total").textContent =
        `${filteredProducts.length} PRODUCTS`;

    productGrid.replaceChildren();

    if (!filteredProducts.length) {
        productGrid.innerHTML =
            '<div class="empty-state">Không tìm thấy sản phẩm phù hợp.</div>';
        return;
    }

    filteredProducts.forEach(product => {
        const productReviews = getProductReviews(product.id);
        const average = calculateAverage(productReviews);

        const card = document.createElement("article");
        card.className = "product-card";

        const imageBox = document.createElement("div");
        imageBox.className = "product-image";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const tag = document.createElement("span");
        tag.className = "product-tag";
        tag.textContent = product.tag;

        imageBox.append(image, tag);

        const info = document.createElement("div");
        info.className = "product-info";

        const category = document.createElement("span");
        category.className = "product-category";
        category.textContent = product.categoryName;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const rating = document.createElement("div");
        rating.className = "product-rating";

        rating.textContent =
            (average > 0
                ? "★".repeat(Math.round(average))
                : "☆☆☆☆☆");

        const count = document.createElement("small");
        count.textContent = productReviews.length
            ? `${average.toFixed(1)} (${productReviews.length})`
            : "Chưa có đánh giá";

        rating.append(count);

        const bottom = document.createElement("div");
        bottom.className = "product-bottom";

        const price = document.createElement("span");
        price.className = "product-price";
        price.textContent = formatPrice(product.price);

        const detail = document.createElement("button");
        detail.className = "detail-button";
        detail.textContent = "Chi tiết ↗";
        detail.type = "button";
        detail.addEventListener("click", () => openProductModal(product.id));

        bottom.append(price, detail);
        info.append(category, name, rating, bottom);
        card.append(imageBox, info);

        productGrid.appendChild(card);
    });
}

// ========================================
// 2. PRODUCT CATEGORY AND SEARCH
// ========================================

categoryTabs.addEventListener("click", event => {
    const button = event.target.closest(".category-btn");

    if (!button) return;

    activeCategory = button.dataset.category;

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.toggle("active", btn === button);
    });

    renderProducts();
});

searchInput.addEventListener("input", renderProducts);

// ========================================
// 3. PRODUCT DETAIL MODAL
// ========================================

function openProductModal(id) {
    const product = getProductById(id);

    if (!product) return;

    const productReviews = getProductReviews(id);
    const average = calculateAverage(productReviews);

    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-name").textContent = product.name;
    document.getElementById("modal-price").textContent =
        formatPrice(product.price);

    document.getElementById("modal-rating").textContent =
        `${average.toFixed(1)} ★ (${productReviews.length} đánh giá)`;

    document.getElementById("modal-description").textContent =
        product.description;

    document.getElementById("modal-review-button").onclick = () => {
        document.getElementById("review-product").value = String(product.id);
        closeProductModal();
        document.getElementById("reviews").scrollIntoView({
            behavior: "smooth"
        });
    };

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeProductModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

document.getElementById("modal-close")
    .addEventListener("click", closeProductModal);

document.getElementById("modal-backdrop")
    .addEventListener("click", closeProductModal);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeProductModal();
});

// ========================================
// 4. REVIEW PRODUCT SELECT
// ========================================

function renderProductOptions() {
    const select = document.getElementById("review-product");

    PRODUCTS.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

// ========================================
// 5. CREATE REVIEW
// ========================================

reviewForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(reviewForm);

    const productId = Number(formData.get("productId"));
    const name = String(formData.get("name") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const rating = Number(formData.get("rating"));

    const product = getProductById(productId);

    if (!product || !name || !content ||
        !Number.isInteger(rating) || rating < 1 || rating > 5) {
        formMessage.textContent =
            "Vui lòng kiểm tra và nhập đầy đủ thông tin.";
        return;
    }

    const newReview = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
        productId,
        name,
        content,
        rating,
        helpful: 0,
        date: new Date().toLocaleString("vi-VN"),
        createdAt: Date.now()
    };

    reviews.push(newReview);

    if (!saveReviews(reviews)) {
        reviews.pop();
        formMessage.textContent =
            "Không thể lưu đánh giá. Vui lòng kiểm tra trình duyệt.";
        return;
    }

    formMessage.textContent =
        "Đánh giá đã được gửi thành công. Cảm ơn bạn!";

    reviewForm.reset();

    document.getElementById("character-count").textContent = "0/500";
    document.getElementById("rating-hint").textContent =
        "Chọn số sao bạn muốn đánh giá.";

    reviewFilter.value = "all";
    reviewSort.value = "newest";

    refreshAll();
});

// ========================================
// 6. REVIEW STATISTICS
// ========================================

function renderStatistics() {
    const total = reviews.length;
    const average = calculateAverage(reviews);

    document.getElementById("average-score").textContent =
        average.toFixed(1);

    document.getElementById("average-stars").textContent =
        "★".repeat(Math.round(average)) +
        "☆".repeat(5 - Math.round(average));

    document.getElementById("average-count").textContent =
        total === 0
            ? "Chưa có đánh giá"
            : `${total} đánh giá từ cộng đồng`;

    document.getElementById("review-total").textContent =
        `${total} REVIEWS`;

    const breakdown = document.getElementById("rating-breakdown");
    breakdown.replaceChildren();

    for (let star = 5; star >= 1; star--) {
        const count = reviews.filter(
            review => review.rating === star
        ).length;

        const percent = total ? (count / total) * 100 : 0;

        const row = document.createElement("div");
        row.className = "rating-row";

        const label = document.createElement("span");
        label.textContent = `${star} ★`;

        const bar = document.createElement("div");
        bar.className = "rating-bar";

        const fill = document.createElement("span");
        fill.style.width = `${percent}%`;

        bar.appendChild(fill);

        const number = document.createElement("span");
        number.textContent = count;

        row.append(label, bar, number);
        breakdown.appendChild(row);
    }
}

// ========================================
// 7. RENDER REVIEW LIST
// ========================================

function createReviewElement(review) {
    const product = getProductById(review.productId);

    const card = document.createElement("article");
    card.className = "review-card";

    const header = document.createElement("div");
    header.className = "review-card-header";

    const identity = document.createElement("div");

    const author = document.createElement("p");
    author.className = "review-author";
    author.textContent = review.name;

    const productName = document.createElement("p");
    productName.className = "review-product-name";
    productName.textContent = product ? product.name : "Sản phẩm";

    identity.append(author, productName);

    const stars = document.createElement("span");
    stars.className = "review-card-stars";
    stars.textContent =
        "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    header.append(identity, stars);

    const content = document.createElement("p");
    content.className = "review-text";
    content.textContent = review.content;

    const footer = document.createElement("div");
    footer.className = "review-card-footer";

    const date = document.createElement("span");
    date.className = "review-date";
    date.textContent = review.date;

    const helpful = document.createElement("button");
    helpful.className = "helpful-button";
    helpful.type = "button";

    const hasVoted = votedReviews.has(review.id);

    helpful.textContent = `♡ Hữu ích (${review.helpful || 0})`;

    if (hasVoted) {
        helpful.classList.add("voted");
        helpful.disabled = true;
    }

    helpful.addEventListener("click", () => voteHelpful(review.id));

    footer.append(date, helpful);
    card.append(header, content, footer);

    return card;
}

function renderReviews() {
    let filtered = [...reviews];

    const filterValue = reviewFilter.value;
    const sortValue = reviewSort.value;

    if (filterValue !== "all") {
        filtered = filtered.filter(
            review => review.rating === Number(filterValue)
        );
    }

    if (sortValue === "highest") {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortValue === "lowest") {
        filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortValue === "helpful") {
        filtered.sort(
            (a, b) => (b.helpful || 0) - (a.helpful || 0)
        );
    } else {
        filtered.sort((a, b) => b.createdAt - a.createdAt);
    }

    reviewList.replaceChildren();

    if (filtered.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent =
            "Chưa có đánh giá phù hợp. Hãy chia sẻ trải nghiệm đầu tiên!";
        reviewList.appendChild(empty);
        return;
    }

    filtered.forEach(review => {
        reviewList.appendChild(createReviewElement(review));
    });
}

// ========================================
// 8. HELPFUL VOTE
// ========================================

function voteHelpful(id) {
    const review = reviews.find(item => item.id === id);

    if (!review || votedReviews.has(id)) return;

    review.helpful = (review.helpful || 0) + 1;
    votedReviews.add(id);

    const reviewsSaved = saveReviews(reviews);
    const votesSaved = saveVotedReviews(votedReviews);

    if (!reviewsSaved || !votesSaved) {
        review.helpful--;
        votedReviews.delete(id);

        alert("Không thể lưu bình chọn. Vui lòng thử lại.");
        return;
    }

    renderReviews();
}

// ========================================
// 9. FILTER AND SORT
// ========================================

reviewFilter.addEventListener("change", renderReviews);
reviewSort.addEventListener("change", renderReviews);

// ========================================
// 10. STAR RATING AND CHARACTER COUNT
// ========================================

const ratingMessages = {
    1: "Rất không hài lòng",
    2: "Chưa thực sự hài lòng",
    3: "Trải nghiệm ổn",
    4: "Rất hài lòng",
    5: "Tuyệt vời!"
};

document.querySelectorAll('input[name="rating"]').forEach(input => {
    input.addEventListener("change", () => {
        document.getElementById("rating-hint").textContent =
            ratingMessages[input.value];
    });
});

document.getElementById("review-content")
    .addEventListener("input", event => {
        document.getElementById("character-count").textContent =
            `${event.target.value.length}/500`;
    });

// ========================================
// 11. MOBILE MENU
// ========================================

document.getElementById("menu-toggle").addEventListener("click", () => {
    document.querySelector(".navigation").classList.toggle("show");
});

document.querySelectorAll(".navigation a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".navigation").classList.remove("show");
    });
});

// ========================================
// 12. REFRESH ALL DATA
// ========================================

function refreshAll() {
    renderProducts();
    renderStatistics();
    renderReviews();
}

// START APPLICATION
renderProductOptions();
refreshAll();
