
/* Hiển thị thông tin phiên bản khi nhấn nút */
const versionButton = document.getElementById("version-button");
const versionInfo = document.getElementById("version-info");

versionButton.addEventListener("click", function () {
    versionInfo.textContent =
        "Phiên bản 1.0 - Website hồ sơ sinh viên đã sẵn sàng.";

    versionButton.textContent = "Đã xem thông tin";
});
