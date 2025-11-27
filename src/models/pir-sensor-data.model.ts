
export interface PirSensorData {
  id: number;
  patientid: string;
  lastmovementtimestamp: string;
  currentroom: 'Living' | 'Kitchen' | 'Bedroom' | 'Bathroom' | string;
  ismoving: boolean;
  activitylevel: 'normal' | 'low' | 'high' | 'none' | string;
  falldetected: boolean;
  dailystepcount: number;
  movementhistory: string; // This is a JSON string
}
