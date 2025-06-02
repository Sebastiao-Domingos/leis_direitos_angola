export interface UserDate {
  id?: number;
  username: string;
  password: string;
}

export class UserService {
  async login({
    password,
    username,
  }: {
    username: string;
    password: string;
  }): Promise<UserDate> {
    if (!username || !password) {
      throw new Error("O nome de usuário e senha válidos.");
    }

    const users: UserDate[] = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      throw new Error("Usuário ou senha inválidos.");
    }

    localStorage.setItem("user_logged", JSON.stringify(user));

    return user;
  }

  async register(user: UserDate): Promise<boolean> {
    if (!user.username || !user.password) {
      throw new Error("O nome de usuário e senha são obrigatórios.");
    }
    const users: UserDate[] = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.some(
      (existingUser) => existingUser.username === user.username
    );

    if (existingUser) {
      throw new Error("Já existe um usuário com esse nome de usuário.");
    }

    const ids = users.map((u) => u.id!);
    const maxId = ids.length ? Math.max(...ids) : 0;
    user.id = maxId + 1;

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }

  async getUsers(): Promise<UserDate[]> {
    const users: UserDate[] = JSON.parse(localStorage.getItem("users") || "[]");
    return users;
  }

  async getUserById(id: number): Promise<UserDate | undefined> {
    const users: UserDate[] = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find((user) => user.id === id);
  }

  async getUserLogged(): Promise<UserDate | undefined> {
    const user: UserDate | undefined = JSON.parse(
      localStorage.getItem("user_logged") ?? ""
    );

    if (user) {
      return user;
    } else return undefined;
  }

  async logout(): Promise<void> {
    localStorage.removeItem("user_logged");
  }
}
