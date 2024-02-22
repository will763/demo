import { UserCreate } from "../user/interface.js";

export interface Login {
    id: number;
    email: string;
    name: string;
    password: string
    userId: number
}

export interface CreateLoginWithUser {
    email: string;
    name: string;
    password: string
    user: UserCreate
}

export interface CreateLoginWithUserId {
    email: string;
    name: string;
    password: string
    userId: number
}

export interface LoginRepository {
    createLoginWithUser(data: CreateLoginWithUser): Promise<void>
    createLoginWithUserId(data: CreateLoginWithUserId): Promise<void>;
    findByEmail(email: string): Promise<Login | null>;
}