import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../../environments/environments';
import { ICreateClientRes, IGetClientRes, IGetClientsRes } from '../interfaces/IClientSchema';

@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    constructor(private http: HttpClient) {}

    getClients() {
        return this.http.get<IGetClientsRes>(ENVIRONMENT.URL_API_CLIENTS);
    }

    createClient(client: any) {
        return this.http.post<ICreateClientRes>(ENVIRONMENT.URL_API_CLIENTS, client);
    }

    getClientById(id: string) {
        return this.http.get<IGetClientRes>(ENVIRONMENT.URL_API_CLIENTS + '/' + id);
    }

    updateClient(id: string, client: any) {
        return this.http.put<ICreateClientRes>(ENVIRONMENT.URL_API_CLIENTS + '/' + id, client);
    }

}
