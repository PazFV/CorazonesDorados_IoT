
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PirSensorData } from '../models/pir-sensor-data.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly http = inject(HttpClient);
  private readonly supabaseUrl = 'https://nkfhburtmexhnltxhkyu.supabase.co';
  private readonly supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZmhidXJ0bWV4aG5sdHhoa3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTMyMDIsImV4cCI6MjA3OTU2OTIwMn0.kHSkKtfeBzyOgRAgumTXhPsVZAXv7hM4eLWeK0aWbCg';

  getLatestSensorData(): Observable<PirSensorData | null> {
    const headers = new HttpHeaders({
      'apikey': this.supabaseKey,
      'Authorization': `Bearer ${this.supabaseKey}`,
    });

    const url = `${this.supabaseUrl}/rest/v1/pir_sensor_data?select=*&order=lastmovementtimestamp.desc&limit=1`;

    return this.http.get<PirSensorData[]>(url, { headers }).pipe(
      map(response => (response && response.length > 0) ? response[0] : null),
      catchError(error => {
        console.error('Error fetching data from Supabase:', error);
        return of(null);
      })
    );
  }
}
