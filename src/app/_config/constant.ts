import { Injectable } from '@angular/core'; 

@Injectable() 

export class Constants {
    public static readonly API_ENDPOINT: string = 'https://api.publicapis.org/entries'; 
    public static readonly API_MOCK_ENDPOINT: string = ''; 
} 