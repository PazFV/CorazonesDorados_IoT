
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-map-display',
  standalone: true,
  templateUrl: './map-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapDisplayComponent {
  currentRoom = input.required<string>();
  
  rooms = [
    { name: 'Living', label: 'Sala', gridArea: '1 / 1 / 3 / 3' },
    { name: 'Kitchen', label: 'Cocina', gridArea: '1 / 3 / 2 / 4' },
    { name: 'Bedroom', label: 'Dormitorio', gridArea: '3 / 1 / 4 / 3' },
    { name: 'Bathroom', label: 'Baño', gridArea: '2 / 3 / 3 / 4' },
  ];
}
