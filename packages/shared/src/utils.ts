// Result helper types for error handling
export type Result<T, E = Error> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

export const success = <T>(data: T): Result<T> => ({
  success: true,
  data,
});

export const failure = <E = Error>(error: E): Result<never, E> => ({
  success: false,
  error,
});

// Environment utilities
export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is required`);
  }
  return value;
};

export const getEnvNumber = (key: string, defaultValue?: number): number => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is required`);
  }
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }
  return parsed;
};

export const getEnvBoolean = (key: string, defaultValue?: boolean): boolean => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is required`);
  }
  return value.toLowerCase() === 'true';
};

// Crypto utilities (placeholder for future token encryption)
export const encrypt = (text: string, key: string): string => {
  // TODO: Implement actual encryption
  console.warn('encrypt() is a placeholder - implement actual encryption');
  return Buffer.from(text).toString('base64');
};

export const decrypt = (encryptedText: string, key: string): string => {
  // TODO: Implement actual decryption
  console.warn('decrypt() is a placeholder - implement actual decryption');
  return Buffer.from(encryptedText, 'base64').toString();
};

// Utility functions
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  backoffMs: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i === maxRetries) {
        throw lastError;
      }
      await sleep(backoffMs * Math.pow(2, i));
    }
  }
  
  throw lastError!;
};