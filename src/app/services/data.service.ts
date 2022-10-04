import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiData } from '../schemas/data';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getApiData():Observable<ApiData[]>{
    return this.http.get<ApiData[]>(this.getBaseApiUrl()+'apis');
  }

  removeApiData(id: number): Observable<any>{
    return this.http.delete<any>(this.getBaseApiUrl()+'apis/'+id);
  }

  private getBaseApiUrl(): string {
    return isDevMode() ? environment.apiBaseUrl : environment.apiBaseUrl;
  }
}
