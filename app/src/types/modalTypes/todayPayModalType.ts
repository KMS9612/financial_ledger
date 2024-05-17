export interface FormData {
  date: string;
  type: string;
  amount: number;
  place: string;
  [key: string]: string | number;
}
