import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { SwalService } from '../_services/swal-service';
import { Constants } from '../_config/constant';

@Injectable({
    providedIn: 'root'
})
  
export class ApiHttpService { 
constructor( private http: HttpClient, public swalService: SwalService ) { } 

    public getData(api: any = '') {
        return this.http.get<any>(api);
    }

    public getAPI(module: string = '') {
        return Constants.API_ENDPOINT + "api/" + module;
    }

}