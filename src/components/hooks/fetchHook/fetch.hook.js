import { useState, useEffect } from 'react';
import { fetchData } from '../../../services/APIClient';

export function useFetch(url, options = {}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return '';

    fetchData(url, options)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((fetchError) => {
        setError(fetchError);
        setLoading(false);
      });
  }, [url, options]);

  return { error, loading, data };
}
