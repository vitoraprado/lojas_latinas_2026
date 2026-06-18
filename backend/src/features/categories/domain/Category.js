export class Category {
  constructor({ id = null, name, description = null }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}