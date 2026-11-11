import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { Country, Object } from '../interfaces/country.interface';
import { env, SearchTerm } from '../../../environments/env';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService{

    private apiUrl:string = env.API_URL;
    private apiKey:string = env.API_KEY;
    private _countries = signal<Object[]>([]);
    public countries = this._countries.asReadonly();

    public cacheStore:CacheStore = {
        byCapital   : {term     : '', countries : [], page : 1, total : 0},
        byCountry   : {term     : '', countries : [], page : 1, total : 0},
        byRegion    : {term     : '', countries : [], page : 1, total : 0},
    };

    constructor(private httpClient: HttpClient) {
        this.loadFromLocalStorage();
    }
    
    clearCache(searchTerm:SearchTerm){
        switch(searchTerm){
            case SearchTerm.Capital:
                this.cacheStore.byCapital.countries = [];
                this.cacheStore.byCapital.term = '';
                this.cacheStore.byCapital.page = 1;
                this.cacheStore.byCapital.total = 0;
                break;
            case SearchTerm.Country:
                this.cacheStore.byCountry.countries = [];;
                this.cacheStore.byCountry.term = '';;
                this.cacheStore.byCountry.page = 1;
                this.cacheStore.byCountry.total = 0;
                break;
            case SearchTerm.Region:
                this.cacheStore.byRegion.countries = [];;
                this.cacheStore.byRegion.term = '';;
                this.cacheStore.byRegion.page = 1;
                this.cacheStore.byRegion.total = 0;
                break;
            default:
                break;
        }
        this.saveToLocalStorage();
    }

    private saveToLocalStorage(){
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
    }
    private loadFromLocalStorage(){
        if(!localStorage.getItem('cacheStore')) return;
        this.cacheStore = JSON.parse( localStorage.getItem( 'cacheStore' )! );
    }

    //! COMO LA PETICION LA HACE EL FRONT, LA API_KEY QUEDA EXPUESTA
    searchByTerm( term:string, searchTerm: SearchTerm, page:number = 1 ): Observable<Country | null>{

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${this.apiKey}`);
        const pageSize = 30;
        let params = new HttpParams()
            .set('limit', pageSize)
            .set('offset', (page - 1) * pageSize);
        let searchUrl = '';
        let cacheStoreField:{
            term        :String|Region,
            countries   :Object[],
            page        :number,
            total       :number,
        };

        switch (searchTerm) {
            
            case SearchTerm.Capital:
                searchUrl = `${this.apiUrl}/capitals`;
                params = params.set('q', term);
                cacheStoreField = this.cacheStore.byCapital;
                break;
            
            case SearchTerm.Country:
                searchUrl = `${this.apiUrl}/names.common`;
                params = params.set('q',term);
                cacheStoreField = this.cacheStore.byCountry;
                break;
                
            case SearchTerm.Region:
                searchUrl = `${this.apiUrl}`;
                params = params.set('region',term);
                cacheStoreField = this.cacheStore.byRegion;
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
                tap( ({ data }:Country) => {
                    if(searchTerm === SearchTerm.AlphaCode3) return;
                    cacheStoreField.term = term;
                    cacheStoreField.countries = data.objects;
                    cacheStoreField.page = page;
                    cacheStoreField.total = data.meta.total;
                }),
                tap( () => this.saveToLocalStorage() ),
                catchError( () => of(null)),
            );
    }
}