import { Injectable } from '@angular/core'; 
import { ApiHttpService } from '../_services/api-http.service';
import { SwalService } from './swal-service';

@Injectable({ providedIn: 'root' })

export class Users {
    constructor(public http: ApiHttpService, public swal: SwalService) {
    }
    
    public user_api_link(username: any = '', password: any = '', token_only: boolean = false) {
        var link: any = '';
        
        if (token_only) {
            link = this.http.getAPI('Useraccount') + '/' + username + '/' + password + '/true';
        }
        else {
            link = this.http.getAPI('Useraccount') + '/' + username + '/' + password;
        }
        return link;
    }

    public getCurrentUser(): any {
        return JSON.parse(localStorage.getItem('userData'));
    }

    public getUserName(): string {
        return this.getCurrentUser().userName;
    }
    
    public getPassword(): string {
        return this.getCurrentUser().password;
    }
    
    public isLoggedIn(): boolean {
        const data = this.getCurrentUser();
        return data ? true : false;
    }
    
    public getUserRole(): number {
        return this.getCurrentUser().securityLevel;
    }

    public getUserFullName() : string {
        const data = this.getCurrentUser();
        return data.lastName + ", " + data.firstName + " " + data.middleInitial;
    }
}