export class Product {
  constructor({ id = null, category_id = null, name, price = null, stock = null }) {
    this.id = id;
    this.category_id = category_id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}