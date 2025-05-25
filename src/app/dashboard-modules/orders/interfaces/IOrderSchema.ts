export interface IGetOrdersRes {
    success: boolean;
    data: IOrder[];
    message: string;
}

export interface IOrder {
    id: string;
    orderDate: Date;
    estimatedDeliveryDate: Date;
    status: string;
    clientId: string;
    clientName: string;
    details: Detail[];
    client: Client;
    orderDetails: Detail[];
}

export interface Client {
    id: string;
    clientDoc: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export interface Detail {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    productPrice: number;
}

export interface IGetOrderRes {
    success: boolean;
    data: IOrder;
    message: string;
}
