import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  baseUrl!: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.pyBaseUrl;
  }

  getPrice(
    building_floors: any,
    building_year: any,
    room_num: any,
    floor_num: any
  ): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}?building_floors=${building_floors}&building_year=${building_year}&room_num=${room_num}&floor_num=${floor_num}`
    );
  }
}
