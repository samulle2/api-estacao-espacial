// backend/src/types/express.d.ts
declare namespace Express {
  export interface Request {
    usuario?: {
      id: number;
      email: string;
      isAdmin: boolean;
    };
  }
}