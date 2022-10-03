export interface RefreshToken {
  token: string;
  expDate: Date;
  genDate?: Date;
  userId: string;
}
