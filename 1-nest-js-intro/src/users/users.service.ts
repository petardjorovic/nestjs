export class UsersService {
  users: { id: number; name: string; age: number; isMarried: boolean }[] = [
    { id: 1, name: 'Petar', age: 36, isMarried: false },
    { id: 2, name: 'Nenad', age: 31, isMarried: false },
    { id: 3, name: 'Milica', age: 26, isMarried: true },
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
  }) {
    this.users.push(user);
  }
}
