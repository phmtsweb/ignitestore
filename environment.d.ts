export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_URL: string;
      STRIPE_PRIVATE_KEY: string;
      NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
    }
  }
}