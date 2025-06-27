declare namespace Express {
  export interface Request {
    usuario?: {
      id: number;
      email: string;
      isAdmin: boolean;
    };
  }
}