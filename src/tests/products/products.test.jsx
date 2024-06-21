// products.test.js
const productsData = require("../../products/products.json");

describe("Products JSON Data", () => {
  test("contains an array of products", () => {
    expect(productsData).toHaveProperty("products");
    expect(Array.isArray(productsData.products)).toBe(true);
  });

  test("each product has expected properties", () => {
    productsData.products.forEach((product) => {
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("amount");
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("img");
    });
  });

  test("product IDs are unique", () => {
    // Verificar que todos los IDs de productos son únicos
    const ids = productsData.products.map((product) => product.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });
});
