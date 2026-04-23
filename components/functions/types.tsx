export interface User {
  name: string;
  email: string;
  role: string;
  googleId: string;
}

export interface DefinedError {
  error: Error & { digest?: string };
  reset: () => void;
}
