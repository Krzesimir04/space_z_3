
export interface VitalSignCreate {
  id: number;
  timestamp?: string;
  energy_level: number;
  heart_rate: number;
  temperature: number;
  mood: string;
}

export interface MessageCreate {
  id?: number;
  sender: string;
  content: string;
}
// --- 5x VITAL SIGNS ---
export const mockVitals: VitalSignCreate[] = [
  {
    id: 1,
    energy_level: 100,
    heart_rate: 72,
    temperature: 36.6,
    mood: "Wesoły"
  },
  {
    id: 2,
    energy_level: 45,
    heart_rate: 60,
    temperature: 36.4,
    mood: "Śpiący"
  },
  {
    id: 3,
    energy_level: 85,
    heart_rate: 110,
    temperature: 37.1,
    mood: "Zestresowany (start rakiety)"
  },
  {
    id: 4,
    energy_level: 15,
    heart_rate: 65,
    temperature: 36.8,
    mood: "Skrajnie zmęczony"
  },
  {
    id: 5,
    energy_level: 90,
    heart_rate: 80,
    temperature: 36.7,
    mood: "Skupiony"
  }
];

// --- 4x MESSAGES ---
export const mockMessages: MessageCreate[] = [
  {
    sender: "Ziemia",
    content: "Krzysiu, zgłoś się. Jak parametry życiowe po wejściu na orbitę? Odbiór."
  },
  {
    sender: "Krzysiu",
    content: "Ziemia, tu Krzysiu. Wszystko w normie. Właśnie zjadłem kosmiczną kanapkę. Odbiór."
  },
  {
    sender: "Ziemia",
    content: "Potwierdzam odebranie telemetrii. Uważaj na okruchy w stanie nieważkości!"
  },
  {
    sender: "Krzysiu",
    content: "Zrozumiałem. Włączam odkurzacz pokładowy i przechodzę w tryb drzemki. Bez odbioru."
  }
];