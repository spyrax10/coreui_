import { Injectable } from '@angular/core'; 

@Injectable() 

export class Constants {
    public static readonly API_ENDPOINT: string = 'https://address-book-demo.herokuapp.com/api/contacts'; 
    public static readonly API_MOCK_ENDPOINT: string = ''; 
} 