import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { SwalService } from '../_services/swal-service';
import { Constants } from '../_config/constant';

@Injectable({
    providedIn: 'root'
})
  
export class ApiHttpService { 
constructor( private http: HttpClient, public swalService: SwalService ) { } 

    public get(url: string, options?: any) { 
        return this.http.get(url, options); 
    } 
    public post(url: string, data: any, options?: any) { 
        return this.http.post(url, data, options); 
    } 
    public put(url: string, data: any, options?: any) { 
        return this.http.put(url, data, options); 
    } 
    public delete(url: string, options?: any) { 
        return this.http.delete(url, options); 
    } 

    public getData(api: any = '') {
        return this.http.get<any>(api);
    }

    public getAPI(module: string = '') {
        return Constants.API_ENDPOINT + "api/" + module;
    }

    public getAPIData(api_add: string = '', api_key: string = '') {
        var ret_arr: any = [];
    
        this.getData(api_add).subscribe(main => {

            ret_arr.push(main);
            // Object.keys(main).forEach(key => {
            //     if (key === 'entries') {
            //         main[key].forEach( {

            //             if (api_key != '') {
            //                 if (data.Auth == api_key) {
            //                     ret_arr.push(data);
            //                 }
            //             }
            //             else {
            //                 ret_arr.push(data);
            //             }
            //         });
            //     }
            // });
        });
        
        return ret_arr;
    }
}