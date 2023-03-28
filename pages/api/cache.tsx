import NodeCache from "node-cache";
import ObjectHash from "object-hash";

export const DEFAULT_TTL = 60;

class NodeCacheContainer {
  private container: NodeCache;

  constructor(options = { stdTTL: DEFAULT_TTL }) {
    this.container = new NodeCache(options);
  }

  getKey(...items: any[]) {
    return ObjectHash(["NodeCacheContainer"].concat(items || []).join(":"));
  }

  getStats() {
    return this.container.getStats();
  }

  async set(key: string, value: any, ttl = DEFAULT_TTL) {
    this.container.set(key, value, ttl);
  }

  async get(key: string) {
    return this.container.get(key);
  }
}

const cacheInstance = new NodeCacheContainer();
export default cacheInstance;
