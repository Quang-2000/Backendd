import { faker } from "@faker-js/faker";
import fs from "fs";

faker.location = {
  country: "Vietnam",
};

const generateRandomCategories = (count) => {
  const categories = [];
  for (let i = 0; i < count; i++) {
    const category = {
      id: i + 1,
      name: faker.commerce.productName(),
      image:
        "https://www.petmart.vn/wp-content/uploads/2020/11/thuc-an-cho-meo-anh-long-ngan-catidea-fairy-chef-british-shorthair-300x300.jpg",
    };
    categories.push(category);
  }
  return categories;
};

const generateRandomProducts = (categories, count) => {
  const products = [];
  for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    for (let j = 0; j < count; j++) {
      const product = {
        categoryId: element.id,
        id: j + 1,
        name: faker.commerce.productName(),
        image:
          "https://www.petmart.vn/wp-content/uploads/2020/11/thuc-an-cho-meo-anh-long-ngan-catidea-fairy-chef-british-shorthair-300x300.jpg",
        price: faker.commerce.price(100000, 500000, 0),
        rating: (Math.random() * 4 + 1).toFixed(1),
        category: element.name,
      };
      products.push(product);
    }
  }
};

// const generateRandomDetails = (products) => {
//   if (!Array.isArray(products) || products.length === 0) {
//     throw new Error("Products array is invalid or empty");
//   }

//   return products.map((product) => {
//     return {
//       productId: product.id,
//       manufacturer: faker.company.name(),
//       description: faker.lorem.paragraph(),
//     };
//   });
// };
const generateData = () => {
  const categories = generateRandomCategories(8);
  const products = generateRandomProducts(categories, 20);
  // const productDetails = generateRandomDetails(products);

  const data = {
    categories: categories,
    products: products,
    // productDetails: productDetails,
  };
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2), () => {
    console.log("Lưu dữ liệu vào file db.json thành công!");
  });
};
generateData();
