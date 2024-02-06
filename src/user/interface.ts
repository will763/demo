export interface User {
    id: number;
    email: string;
    name: string;
    password: string
  }

  export interface UserCreate {
    email: string;
    name: string;
    password: string
  }

  export interface UserUpdate {
    email: string;
    name: string;
    password: string
  }

  export interface UserRepository {
    create(data: UserCreate):Promise<String>;
    findByEmail(email: string ): Promise<User | null>;
    
    get(): Promise<User[]>;

    update(id: string, data: UserUpdate): Promise<User>;

    delete(id: string ): Promise<User>;
  }