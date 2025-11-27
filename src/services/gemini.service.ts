
import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { PirSensorData } from '../models/pir-sensor-data.model';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    // IMPORTANT: This relies on process.env.API_KEY being available in the execution environment.
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
       this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
       console.error("API_KEY environment variable not set. Gemini service will not work.");
    }
  }

  async generateDailyReport(data: PirSensorData): Promise<string> {
    if (!this.ai) {
      return Promise.reject("Gemini AI client is not initialized. Is the API_KEY set?");
    }

    let parsedHistory = 'No history available';
    try {
        const historyArray = JSON.parse(data.movementhistory);
        if (Array.isArray(historyArray)) {
            parsedHistory = historyArray.join(', ');
        }
    } catch (e) {
        console.warn("Could not parse movement history.");
    }

    const prompt = `
      Eres un asistente virtual cariñoso y profesional para "Corazones Dorados", una aplicación que ayuda a familias a cuidar de sus seres queridos mayores.
      Genera un breve informe del día para el familiar de un adulto mayor, basado en los siguientes datos.
      El tono debe ser tranquilizador, positivo y fácil de entender. No uses lenguaje técnico.

      Datos del día:
      - Pasos caminados: ${data.dailystepcount}
      - Nivel de actividad general: ${data.activitylevel}
      - Secuencia de actividad (historial): ${parsedHistory}
      - ¿Se detectó alguna caída?: ${data.falldetected ? 'Sí' : 'No'}

      Por favor, resume el día en un párrafo corto y amigable. Si todo parece normal, resáltalo. Si hay algo inusual (como una caída detectada o actividad 'none' por mucho tiempo), menciónalo con calma y sugiere estar pendiente.
    `;

    try {
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error('Error generating report with Gemini:', error);
        return Promise.reject('No se pudo generar el informe. Por favor, inténtelo de nuevo más tarde.');
    }
  }
}
