import CryptoJS from 'crypto-js';

export class TokenStorage {
  private static secretKey = 'my_secret_key';

  public set(key: string, value: any) {
    if (typeof window === "undefined") return null;
    const encryptedValue = this.encrypt(value, TokenStorage.secretKey);
    localStorage.setItem(key, encryptedValue);
  }

  public get(key: string) {
    if (typeof window === "undefined") return null;
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      return this.decrypt(encryptedValue);
    } else return null;
  }

  public clear(key: string) {
    if (typeof window === "undefined") return null;
    localStorage.removeItem(key);
  }

  private encrypt(value: string, secretKey: string) {
    const encrypted = CryptoJS.AES.encrypt(value, secretKey);
    return encrypted.toString();
  }

  private decrypt(encryptedValue: string) {
    const decrypted = CryptoJS.AES.decrypt(encryptedValue, TokenStorage.secretKey)
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

export const Storage = new TokenStorage();
