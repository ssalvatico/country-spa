import { Object } from "./country.interface";
import { Region } from "./region.type";

export interface CacheStore {
    byCapital   : TermCountries,
    byCountry   : TermCountries,
    byRegion    : RegionCountries,

}

export interface TermCountries {
    term        :string,
    countries   :Object[],
    page        :number,
    total       :number,
}

export interface RegionCountries {
    term        :Region,
    countries   :Object[],
    page        :number,
    total       :number,
}