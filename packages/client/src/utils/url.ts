export const getQuerys = () => {
  const { search } = window.location;
  if (search[0] === '?') {
    const querys = search.substring(1);
    const kvs = querys.split('&');
    return kvs.reduce((prev: Record<string, unknown>, kv: string) => {
      const [key, value] = kv.split('=');
      prev[key] = value;
      return prev;
    }, {});
  }
  return {};
};

export const getHashes = () => {
  const { hash } = window.location;
  if (hash[0] === '#') {
    const hashs = hash.substring(1);
    const kvs = hashs.split('&');
    return kvs.reduce((prev: Record<string, unknown>, kv: string) => {
      const [key, value] = kv.split('=');
      prev[key] = value;
      return prev;
    }, {});
  }
  return {};
};

