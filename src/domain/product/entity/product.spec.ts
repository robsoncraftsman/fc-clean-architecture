import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should throw error when id, name and price are invalid", () => {
    expect(() => {
      const product = new Product("", "", -1);
    }).toThrowError("product: Id is required, product: Name is required, product: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should not change name if it is invalid", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changeName("");
    }).toThrowError("product: Name is required");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should not change price if it is invalid", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changePrice(-1);
    }).toThrowError("product: Price must be greater than zero");
  });
});
