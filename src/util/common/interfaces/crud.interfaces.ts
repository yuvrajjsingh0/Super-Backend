import { Response } from "./response.interface";

export interface CRUD {
    list: (limit: number, page: number) => Promise<Response>;
    create: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<Response>;
    readById: (id: string) => Promise<any>;
    deleteById: (id: string) => Promise<string>;
    patchById: (id: string, resource: any) => Promise<Response>;
}