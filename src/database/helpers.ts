export type nameFields<T> = {
  [P in keyof T]: string;
};

export interface Entity<T> {
  tableName: string;
  namesFields: nameFields<T>;
}
