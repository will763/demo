export interface User {
    id: string;
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
    get(): Promise<Array<User>>;
    create(data: UserCreate):Promise<User>;
    delete(id: string ): Promise<User>;
    update(id: string, data: UserUpdate): Promise<User>;
    findByEmail(email: string ): Promise<User>;
  }