export class User {
  id!: number;
  name!: string;
  username!: string;
  password!: string;
  photo!: string;
  gender!: string;
  dob!: string;
}

export class UserLogin {
  username!: string;
  password!: string;
}

export class UserRegister {
  name!: string;
  username!: string;
  password!: string;
}
