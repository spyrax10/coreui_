import { Injectable } from '@angular/core'; 
import { ApiHttpService } from '../_services/api-http.service';


@Injectable({
    providedIn: 'root'
})
  
export class Users {
    constructor(public http: ApiHttpService) {}

    user_found: boolean = false;

    public checkUser(username: any = '', password: any = '') {
        this.getUser(username, password);
        return this.user_found;
    }

    public getUser(username: any = '', password: any = '') {
        var user_link = this.http.getAPI('Useraccount') + '/' + username + '/' + password;
        console.log(user_link);

        this.http.getData(user_link).subscribe(main => { 
            Object.keys(main).forEach((key: any) => {
                console.log(main);
                if (Object.keys(main[key]).length === 1) {
                    this.user_found = true;
                }
            });
        });
    }
}