import NodeCache from "node-cache";
import ObjectHash from "object-hash";

export const DEFAULT_TTL = 60;

type CacheValue = any; // You might want to replace 'any' with a more specific type depending on your use case.

class NodeCacheContainer {
  private container: NodeCache;

  /**
   * Constructs a new NodeCacheContainer instance.
   * @param options - Configuration options for NodeCache.
   */
  constructor(options: NodeCache.Options = { stdTTL: DEFAULT_TTL }) {
    this.container = new NodeCache(options);
  }

  /**
   * Generates a unique cache key based on provided items.
   * @param items - Items to be included in the cache key.
   * @returns A hashed string representing the cache key.
   */
  getKey(...items: CacheValue[]): string {
    return ObjectHash(["NodeCacheContainer", ...items].join(":"));
  }

  /**
   * Retrieves statistics about the current cache state.
   * @returns An object containing cache statistics.
   */
  getStats(): NodeCache.Stats {
    return this.container.getStats();
  }

  /**
   * Sets a value in the cache.
   * @param key - The cache key under which the value is stored.
   * @param value - The value to store in the cache.
   * @param ttl - Time to live in seconds (optional, default: DEFAULT_TTL).
   */
  set(key: string, value: CacheValue, ttl: number = DEFAULT_TTL): void {
    try {
      this.container.set(key, value, ttl);
    } catch (error) {
      console.error(`Error setting cache value for key ${key}:`, error);
      // Handle or rethrow the error as needed
    }
  }

  /**
   * Retrieves a value from the cache.
   * @param key - The cache key to retrieve the value for.
   * @returns The cached value or undefined if not found.
   */
  get(key: string): CacheValue | undefined {
    try {
      return this.container.get(key);
    } catch (error) {
      console.error(`Error retrieving cache value for key ${key}:`, error);
      // Handle or rethrow the error as needed
      return undefined;
    }
  }
}

const cacheInstance = new NodeCacheContainer();
export default cacheInstance;
