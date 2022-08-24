import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Constants } from '../_config/constant';
import { SwalService } from '../_services/swal-service';

@Injectable({
    providedIn: 'root'
})
  
export class ApiHttpService { 
constructor( private http: HttpClient, public swalService: SwalService ) { } 

    public data: any = {};
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

    public getData() {
        return this.http.get(Constants.API_ENDPOINT);;
    }
    
    public getContacts() {
        this.getData().subscribe(data => {
          console.log(data);
          this.data = data;
        },
        error => this.swalService.commonSwalCentered('Cannot Connect to Server!', 'error')
        );
    }
}