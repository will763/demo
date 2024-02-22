export interface User {
  id: number;
  email: string;
  name: string;
}

export interface UserCreate {
  email: string;
  name: string;
}

export interface UserUpdate {
  email: string;
  name: string;

}

export interface UserRepository {
  create(data: UserCreate): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  update(id: string, data: UserUpdate): Promise<User>;
  delete(id: string): Promise<User>;
}