import { Injectable } from '@angular/core'; 
import { ApiHttpService } from '../_services/api-http.service';

@Injectable({ providedIn: 'root' })

export class Users {
    constructor(public http: ApiHttpService) {
    }
    public api_get_user() {
        return this.http.getAPI('Useraccount') + '/getUser?';
    }
    public api_new_user() {
        return this.http.getAPI('Useraccount') + '/newUser?';
    }

    public api_send_email() {
        return this.http.getAPI('Management') + '/sendEmail?';
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