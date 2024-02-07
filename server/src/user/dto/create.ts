export class CreateUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor() {
    this.id = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
  }
}
