export class SignUp {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  rePassword?:string
  role?: string[];
  constructor(name:string, username:string, email:string, password:string, rePassword:string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.rePassword = rePassword
    this.role = ['user']
  }

}
