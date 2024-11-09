import { faker } from "@faker-js/faker";
import fs from "fs";

faker.location = {
  country: "Vietnam",
};

const Categories = 8;
const Products = 30;
const Foods = 10;

// Hàm tạo dữ liệu danh mục (categories)
const generateCategories = () => {
  const categories = [];
  const categoryNames = [
    "Hạt cho mèo",
    "Pate cho mèo",
    "Súp thưởng cho mèo",
    "Sữa cho mèo",
    "Xúc xích cho mèo",
    "Bánh thưởng cho mèo",
    "Dinh dưỡng cho mèo",
    "Cỏ cho mèo",
  ];

  categoryNames.forEach((categoryName, index) => {
    categories.push({
      id: index + 1,
      name: categoryName,
      image:
        "https://www.petmart.vn/wp-content/uploads/2020/11/thuc-an-cho-meo-anh-long-ngan-catidea-fairy-chef-british-shorthair-300x300.jpg",
    });
  });

  return categories;
};

// Hàm tạo dữ liệu sản phẩm (products)
const generateProducts = (categories) => {
  const products = [];
  for (let i = 0; i < Products; i++) {
    const product = {
      id: i + 1,
      name: faker.commerce.productName(),
      image:
        "https://www.petmart.vn/wp-content/uploads/2020/11/thuc-an-cho-meo-anh-long-ngan-catidea-fairy-chef-british-shorthair-300x300.jpg",
    };
    products.push(product);
  }
  return products;
};

// Hàm tạo dữ liệu thức ăn cho mèo (foods)
const generateFoodData = (categories) => {
  const foods = [];
  for (let i = 0; i < Foods; i++) {
    const food = {
      id: i + 1,
      name: `Thức ăn cho mèo con ROYAL CANIN Kitten ${faker.commerce.productName()}`,
      price: faker.commerce.price(100000, 500000, 0),
      rating: parseFloat(
        faker.number.float({ min: 1, max: 5, precision: 0.1 }).toFixed(1)
      ),
      category:
        categories[faker.number.int({ min: 0, max: categories.length - 1 })]
          .name,
      description: faker.commerce.productDescription(),
      image:
        "https://www.petmart.vn/wp-content/uploads/2020/11/thuc-an-cho-meo-anh-long-ngan-catidea-fairy-chef-british-shorthair-300x300.jpg",
    };
    foods.push(food);
  }
  return foods;
};

// Tạo dữ liệu
const categoriesData = generateCategories();
const productsData = generateProducts(categoriesData);
const foodsData = generateFoodData(categoriesData);

// Lưu toàn bộ dữ liệu vào file db.json
const dataToSave = {
  categories: categoriesData,
  products: productsData,
  foods: foodsData,
};

fs.writeFileSync("db.json", JSON.stringify(dataToSave, null, 2), "utf-8");
console.log("Tạo data thành công!", dataToSave);
