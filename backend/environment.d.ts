declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    PWD: string;
    MONGO_URI: string;
  }
}

export {};
