import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';
import { env } from '../../../environments/env';

@Injectable({providedIn: 'root'})
export class ServiceNameService {

    private apiUrl:string = env.API_URL;
    private apiKey:string = env.API_KEY;

    constructor(private httpClient: HttpClient) { }
    

    searchCapital( term:string ): Observable<Country[]>{

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${this.apiKey}`);
        
        const params = new HttpParams()
            .set('q', term);
        
        return this.httpClient.get<Country[]>(`${this.apiUrl}/capitals`,{headers, params});
    }


}