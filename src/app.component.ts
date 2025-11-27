
import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { SupabaseService } from './services/supabase.service';
import { PirSensorData } from './models/pir-sensor-data.model';
import { MapDisplayComponent } from './components/map-display/map-display.component';
import { PatientStatusComponent } from './components/patient-status/patient-status.component';
import { DailyReportComponent } from './components/daily-report/daily-report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MapDisplayComponent,
    PatientStatusComponent,
    DailyReportComponent
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private supabaseService = inject(SupabaseService);

  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  sensorData = signal<PirSensorData | null>(null);
  lastUpdated = signal<Date | null>(null);
  
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.supabaseService.getLatestSensorData().subscribe({
      next: (data) => {
        if (data) {
          this.sensorData.set(data);
          this.lastUpdated.set(new Date());
        } else {
          this.error.set('No se pudieron obtener los datos. Verifique la conexión o intente más tarde.');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Ocurrió un error al cargar la información.');
        this.isLoading.set(false);
      }
    });
  }
}
