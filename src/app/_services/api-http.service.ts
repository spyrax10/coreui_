import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { SwalService } from '../_services/swal-service';
import { Constants } from '../_config/constant';

@Injectable({
    providedIn: 'root'
})
  
export class ApiHttpService { 
    serverUri = 'https://localhost:44382/api/Useraccount/';

    headers: HttpHeaders = new HttpHeaders();
    
constructor( private http: HttpClient, public swalService: SwalService ) {
    this.headers.set('Content-Type','application/json');
    this.headers.set('Accept', 'application/json');
 } 

    public getData(api: any = '') {
        return this.http.get<any>(api, {
            headers: this.headers
        });
    }

    public getAPI(module: string = '') {
        return Constants.API_ENDPOINT + "api/" + module;
    }

}