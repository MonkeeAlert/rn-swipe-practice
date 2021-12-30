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
