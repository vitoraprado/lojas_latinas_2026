export class Order {
  constructor({ id = null, user_id, order_date, status }) {
    this.id = id;
    this.user_id = user_id;
    this.order_date = order_date;
    this.status = status;
  }
}