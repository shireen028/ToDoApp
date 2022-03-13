export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type Action = {
  type: string;
  payload: any;
};

export enum FILTERS {
  ALL,
  COMPLETED,
  INCOMPLETE,
}
