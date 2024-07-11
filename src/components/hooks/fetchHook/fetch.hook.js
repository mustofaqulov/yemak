import { useState, useEffect } from 'react';
import { fetchData } from '../../../services/APIClient';

export function useFetch(url, options = {}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return ''; // Exit early if no URL is provided

    fetchData(url, options)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((fetchError) => {
        setError(fetchError);
        setLoading(false);
      });
  }, [url, options]); // Dependency array includes options

  return { error, loading, data };
}
