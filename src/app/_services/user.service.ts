import { Injectable } from '@angular/core'; 
import { ApiHttpService } from '../_services/api-http.service';
import { SwalService } from './swal-service';

@Injectable({ providedIn: 'root' })

export class Users {
    constructor(public http: ApiHttpService, public swal: SwalService) {
    }
    
    public user_api_link(username: any = '', password: any = '', token_only: boolean = false) {
        return this.http.getAPI('Useraccount') + '/' + username + '/' + password + '/' + token_only;
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

    public getUserToken(): string {
        return this.getCurrentUser().lastRowHash;
    }

    public isRefeshTokenActive(): boolean {
        return this.getCurrentUser().refreshTokenActive === 1 ? true : false;
    }

    public getUserFullName() : string {
        const data = this.getCurrentUser();
        return data.lastName + ", " + data.firstName + " " + data.middleInitial;
    }
}