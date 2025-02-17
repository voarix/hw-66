export interface IMealForm {
  time: string;
  text: string;
  calories: number;
}
export interface IMeal extends IMealForm {
  id: string;
}

export interface IMealApi {
  [id: string]: MealForm;
}
