import redis from '../config/redis.js';

const normalize = (value = '') => String(value).toLowerCase().trim();

const buildKey = (base, query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = normalize(query.search).slice(0, 50);
  const sort = normalize(query.sort);

  return `${base}:p:${page}:l:${limit}:s:${search}:o:${sort}`;
};

export const paginationCache = (baseKey, ttl = 60) => {
  return async (req, res, next) => {
    const key = buildKey(baseKey, req.query);

    try {
      const cached = await redis.get(key);

      if (cached) {
        console.log(`⚡ Cache HIT: ${key}`);
        return res.json(JSON.parse(cached));
      }

      console.log(`🐢 Cache MISS: ${key}`);

      const originalJson = res.json.bind(res);
      let isCached = false;

      res.json = async (data) => {
        if (!isCached && res.statusCode === 200 && data) {
          try {
            await redis.set(key, JSON.stringify(data), 'EX', ttl);
            isCached = true;
          } catch (error) {
            console.error('❌ Redis Cache Error:', error.message);
          }
        }
        return originalJson(data);
      };

      next();
    } catch {
      next();
    }
  };
};

export const cacheById = ({ baseKey = 'profile', ttl = 300, getId = (req) => req.params?.id || req.user?.id } = {}) => {
  return async (req, res, next) => {
    const id = getId(req);
    if (!id) {
      return next();
    }

    const key = `${baseKey}:${id}`;

    try {
      const cached = await redis.get(key);

      if (cached) {
        console.log(`⚡ Cache HIT: ${key}`);
        return res.json(JSON.parse(cached));
      }

      console.log(`🐢 Cache MISS: ${key}`);

      const originalJson = res.json.bind(res);
      let isCached = false;

      res.json = async (data) => {
        if (!isCached && res.statusCode === 200 && data) {
          try {
            await redis.set(key, JSON.stringify(data), 'EX', ttl);
            isCached = true;
          } catch (error) {
            console.error('❌ Redis Cache Error:', error.message);
          }
        }
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('❌ Redis Cache Error:', error.message);
      next();
    }
  };
};
