import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, delay, Observable, of } from 'rxjs';

import { Country, Object } from '../interfaces/country';
import { env, SearchTerm } from '../../../environments/env';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl:string = env.API_URL;
    private apiKey:string = env.API_KEY;
    private _countries = signal<Object[]>([]);
    public countries = this._countries.asReadonly();

    constructor(private httpClient: HttpClient) { }
    
    //! COMO LA PETICION LA HACE EL FRONT, LA API_KEY QUEDA EXPUESTA
    searchByTerm( term:string, searchTerm: SearchTerm ): Observable<Country | null>{

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${this.apiKey}`);
        let params = new HttpParams().set('limit',20);
        let searchUrl = '';
        switch (searchTerm) {
            
            case SearchTerm.Capital:
                searchUrl = `${this.apiUrl}/capitals`;
                params = params.set('q', term);
                break;
            
            case SearchTerm.Country:
                searchUrl = `${this.apiUrl}/names.common`;
                params = params.set('q',term);
                break;
                
            case SearchTerm.Region:
                searchUrl = `${this.apiUrl}`;
                params = params.set('region',term);
                break;
            
            case SearchTerm.AlphaCode3:
                searchUrl = `${this.apiUrl}/codes.alpha_3/${term}`;
                params = params.set('pretty',1);
                break;

            default:
                throw new Error("Invalid search term.");
        }
        
        return this.httpClient.get<Country>(searchUrl,{headers, params})
            .pipe(
                catchError( () => of(null)),
                delay( 500 )
            );
    }

}