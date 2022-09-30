import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { SwalService } from '../_services/swal-service';
import { Constants } from '../_config/constant';

@Injectable({
    providedIn: 'root'
})
  
export class ApiHttpService {
    
constructor( private http: HttpClient, public swalService: SwalService ) {
 } 

    public getData(api: any = '', token: any = '') {
        return this.http.get<any>(api, {
            headers: {
                Authorization: 'Bearer ' + token
            } 
        });
    }

    public getAPI(module: string = '') {
        return Constants.API_ENDPOINT + "api/" + module;
    }

}