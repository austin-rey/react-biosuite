import { useState, useEffect,useRef } from 'react';

import gbif from '../api/gbif'

export const useFetch = (url,initialValue) => {
  const cache = useRef({})
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log(cache);
      (async () => {
          try {
            if (cache.current[url]) {
              setData(cache.current[url]);
            } else {
              const req = await gbif.get(url)
              cache.current[url] = req.data;
              setData(req.data);
            }
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
      })();
  }, [url])

  return {data, error, loading};
}

