
import { Component, ChangeDetectionStrategy, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PirSensorData } from '../../models/pir-sensor-data.model';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-daily-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyReportComponent {
  data = input.required<PirSensorData>();
  private readonly geminiService = inject(GeminiService);

  report = signal<string | null>(null);
  isGenerating = signal<boolean>(false);
  error = signal<string | null>(null);

  async generateReport() {
    this.isGenerating.set(true);
    this.error.set(null);
    this.report.set(null);

    try {
      const result = await this.geminiService.generateDailyReport(this.data());
      this.report.set(result);
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : 'Ocurrió un error inesperado.';
      this.error.set(errorMessage);
    } finally {
      this.isGenerating.set(false);
    }
  }
}
