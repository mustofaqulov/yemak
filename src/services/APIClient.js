export async function fetchData(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: options.headers || {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.body) || null,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
