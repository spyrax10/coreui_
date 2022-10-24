import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { ApiHttpService } from '../_services/api-http.service';
import { SwalService } from './swal-service';

@Injectable({ providedIn: 'root' })

export class Users {
    constructor(public http: ApiHttpService,  public swal: SwalService) {
    }
    public api_get_user() {
        return this.http.getAPI('Useraccount') + '/getUser?';
    }
    public api_get_alluser() {
        return this.http.getAPI('Useraccount') + '/getAllUser?';
    }
    public api_new_user() {
        return this.http.getAPI('Useraccount') + '/newUser?';
    }

    public api_delete_user() {
        return this.http.getAPI('Useraccount') + '/deleteUser?';
    }

    public api_send_email() {
        return this.http.getAPI('Management') + '/sendEmailCPanel?';
    }

    public api_get_approver() {
        return this.http.getAPI('Approver') + '/getApprover?';
    }

    public api_new_approver() {
        return this.http.getAPI('Approver') + '/newApprover?';
    }

    public api_delete_approver() {
        return this.http.getAPI('Approver') + '/delApprover?';
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

    public getRoleAccess(): string {
        return this.getCurrentUser().roleAccess;
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

    public canAccessModule(mod_name: string = "") {
        let status: boolean = true;

        if (this.getRoleAccess() === "all") {
          status = true;
        }
        else {
            if (this.getRoleAccess().split(',').indexOf(mod_name.toLowerCase()) > -1) {
                status = true;
            }
            else {
                status = false;
            }
        }
        return status;
    }
}