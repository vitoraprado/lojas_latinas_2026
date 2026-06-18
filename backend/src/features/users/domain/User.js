export class User {
  constructor({ id = null, name, user_type, email, password }) {
    this.id = id;
    this.name = name;
    this.user_type = user_type;
    this.email = email;
    this.password = password;
  }
}