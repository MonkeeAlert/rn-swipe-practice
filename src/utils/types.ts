export interface ActionType<T, P> {
  type: T;
  payload: P;
}

export interface IIcon {
  name: string;
  family: string;
  size?: number;
  color?: string;
}

export interface ITodoColor {
  title: string;
  color: string;
}

export interface IUserTheme {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
}
