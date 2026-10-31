
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".review-button");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productName = button.dataset.product;

            alert(
                "Bạn đang quan tâm đến: " +
                productName +
                "\nCảm ơn bạn đã sử dụng REVIEWVERSE!"
            );
        });
    });

    console.log("REVIEWVERSE website is ready!");
});
