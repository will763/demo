export interface Login {
    id: number;
    email: string;
    name: string;
    password: string
  }

  export interface LoginCreate {
    email: string;
    name: string;
    password: string
  }

  export interface LoginUpdate {
    email: string;
    name: string;
    password: string
  }

  export interface LoginRepository {
    create(data: LoginCreate):Promise<String>;
    findByEmail(email: string ): Promise<Login | null>;
    
    get(): Promise<Login[]>;

    update(id: string, data: LoginUpdate): Promise<Login>;

    delete(id: string ): Promise<Login>;
  }