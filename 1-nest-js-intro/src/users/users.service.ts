export class UsersService {
  users: {
    id: number;
    name: string;
    age: number;
    isMarried: boolean;
    gender: string;
  }[] = [
    { id: 1, name: 'Petar', age: 36, isMarried: false, gender: 'male' },
    { id: 2, name: 'Nenad', age: 31, isMarried: false, gender: 'male' },
    { id: 3, name: 'Milica', age: 26, isMarried: true, gender: 'female' },
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
  }) {
    this.users.push(user);
  }
}
