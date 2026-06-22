export class CartItem {
  constructor({ id = null, user_id, product_id, quantity }) {
    this.id = id;
    this.user_id = user_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }
}