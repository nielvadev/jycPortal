export interface IGetClientsRes {
    success: boolean;
    data: IClient[];
    message: string;
}

export interface IGetClientRes {
    success: boolean;
    data: IClient;
    message: string;
}

export interface IClient {
    id: string;
    clientDoc: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
}

export interface ICreateClient {
    clientDoc: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export interface IUpdateClient {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export interface ICreateClientRes {
    success: boolean;
    data: IClient;
    message: string;
}
