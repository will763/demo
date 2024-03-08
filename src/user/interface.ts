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
  password: string;
}

export interface UserRepository {
  create(data: UserCreate): Promise<void>;
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  update(id: number, data: UserUpdate): Promise<User>;
  delete(id: number): Promise<User>;
}