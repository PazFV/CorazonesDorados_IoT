
import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { PirSensorData } from '../../models/pir-sensor-data.model';

@Component({
  selector: 'app-patient-status',
  standalone: true,
  templateUrl: './patient-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientStatusComponent {
  data = input.required<PirSensorData>();
  
  activityLevelText = computed(() => {
    switch(this.data().activitylevel) {
      case 'normal': return 'Normal';
      case 'low': return 'Bajo';
      case 'high': return 'Alto';
      case 'none': return 'Nulo';
      default: return 'Desconocido';
    }
  });

  movementStatusText = computed(() => this.data().ismoving ? 'En Movimiento' : 'Detenido');
}
