export class UsersService {
  users: {
    id: number;
    name: string;
    email: string;
    age: number;
    isMarried: boolean;
    gender: string;
  }[] = [
    {
      id: 1,
      name: 'Petar',
      age: 36,
      isMarried: false,
      gender: 'male',
      email: 'petar@gmail.com',
    },
    {
      id: 2,
      name: 'Nenad',
      age: 31,
      isMarried: false,
      gender: 'male',
      email: 'nenad@gmail.com',
    },
    {
      id: 3,
      name: 'Milica',
      age: 26,
      isMarried: true,
      gender: 'female',
      email: 'milica@gmail.com',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    age: number;
    isMarried: boolean;
    gender: string;
    email: string;
  }) {
    this.users.push(user);
  }
}
