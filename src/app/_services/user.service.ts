import { Injectable } from '@angular/core'; 
import { map, Observable } from 'rxjs';
import { ApiHttpService } from '../_services/api-http.service';
import { SwalService } from './swal-service';


export interface USRData {
    username: string,
    password: string
}

@Injectable({
    providedIn: 'any'
})

export class Users {
    constructor(public http: ApiHttpService, public swal: SwalService) {
    }
    
    public user_api_link(username: any = '', password: any = '') {
        return this.http.getAPI('Useraccount') + '/' + username + '/' + password;
    }
}