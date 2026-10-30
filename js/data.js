
const products = [
    {
        id: "P001",
        name: "Classic White Shirt",
        category: "shirt",
        price: 450000,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
        description: "Áo sơ mi trắng thanh lịch, chất liệu mềm mại, phù hợp đi học, đi làm và dạo phố."
    },
    {
        id: "P002",
        name: "Oversized Black Shirt",
        category: "shirt",
        price: 520000,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800",
        description: "Áo sơ mi đen form rộng hiện đại, dễ phối cùng nhiều phong cách."
    },
    {
        id: "P003",
        name: "Minimal Beige Shirt",
        category: "shirt",
        price: 490000,
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800",
        description: "Thiết kế tối giản với gam màu be trang nhã."
    },
    {
        id: "P004",
        name: "Straight Fit Trousers",
        category: "pants",
        price: 650000,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
        description: "Quần dáng suông thanh lịch, mang lại cảm giác thoải mái."
    },
    {
        id: "P005",
        name: "Classic Denim Jeans",
        category: "pants",
        price: 720000,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
        description: "Quần jeans cổ điển, dễ kết hợp với áo sơ mi và áo thun."
    },
    {
        id: "P006",
        name: "Leather Shoulder Bag",
        category: "accessory",
        price: 890000,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
        description: "Túi xách thiết kế tối giản, phù hợp với phong cách thanh lịch."
    },
    {
        id: "P007",
        name: "Minimal Watch",
        category: "accessory",
        price: 1100000,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800",
        description: "Đồng hồ thiết kế tinh tế, tạo điểm nhấn cho trang phục."
    },
    {
        id: "P008",
        name: "Fashion Sunglasses",
        category: "accessory",
        price: 390000,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
        description: "Kính thời trang hiện đại, phù hợp cho những chuyến đi và hoạt động ngoài trời."
    }
];

function formatPrice(price) {
    return Number(price).toLocaleString("vi-VN") + " đ";
}

function getProductById(id) {
    return products.find(product => product.id === id);
}
