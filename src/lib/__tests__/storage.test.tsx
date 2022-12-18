import { TokenStorage } from '../storage';

const testValue = 'test';
const testKey = 'test_key';

describe('TokenStorage', () => {
  let tokenStorage: TokenStorage;

  beforeEach(() => {
    tokenStorage = new TokenStorage();
  });

  afterEach(() => {
    tokenStorage.clear(testKey);
  });

  it('should encrypt value', () => {
    tokenStorage.set(testKey, testValue);
    const encrypted = localStorage.getItem(testKey);
    expect(encrypted).not.toEqual(testValue);
  });

  it('should encrypt and decrypt a value correctly', () => {
    tokenStorage.set(testKey, testValue);
    const decryptedValue = tokenStorage.get(testKey);

    expect(decryptedValue).toEqual(testValue);
  });

  it('should remove an item from storage when clear is called', () => {
    tokenStorage.set(testKey, testValue);
    tokenStorage.clear(testKey);
    const decryptedValue = tokenStorage.get(testKey);

    expect(decryptedValue).toBeNull();
  });
});
