import { Injectable } from '@angular/core'; 
import { map, Observable } from 'rxjs';
import { ApiHttpService } from '../_services/api-http.service';
import { SwalService } from './swal-service';


export interface USRData {
    username: string,
    password: string
}

@Injectable({
    providedIn: 'root'
})

export class Users {
    constructor(public http: ApiHttpService, public swalService: SwalService) {}

    public user_api_link(username: any = '', password: any = '') {
        return this.http.getAPI('Useraccount') + '/' + username + '/' + password;
    }

    public checkUser(username: any = '', password: any = '') {
        console.log(this.getUser(username, password));
        return false;
    }

    public getUser(username: any = '', password: any = '') {
        var ret_arr: any = [];
        this.http.getData(this.user_api_link(username, password)).subscribe(result => { 
            Object.keys(result).forEach(key => {
                if (result[key]['userName'] === username && result[key]['password'] === password) {
                    ret_arr.push(result[key]);
                }
                else {
                    ret_arr = null;
                }
            });
        })
        return ret_arr;
    }
}