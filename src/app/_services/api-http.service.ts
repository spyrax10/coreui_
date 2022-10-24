import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { SwalService } from '../_services/swal-service';
import { Constants } from '../_config/constant';

@Injectable({
    providedIn: 'root'
})
  
export class ApiHttpService {
    
constructor( private http: HttpClient, public swalService: SwalService ) {} 
    public getData(api: any = '', params: any) {
        return this.http.get<any>(api, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("aToken")
            },
            params: params
        });
    }

    public deleteData(api: any = '', params: any) {
        return this.http.delete<any>(api, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("aToken")
            },
            params: params
        });
    }
    
    public getAPI(module: string = '') {
        return Constants.API_ENDPOINT + "api/" + module;
    }
}