export type Train = {
    id: string;
    from: string;
    to: string;
    departureDate: Date;
    seats: number;
  };

export interface SearchFormData {
    from: string; // Откуда
    to: string; // Куда
    date: Date | null; // Дата отправления
  }