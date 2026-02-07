import { camelCase, isArray, isObject, snakeCase, transform } from 'lodash';

const changeCasing = (
  obj: Record<string, unknown>,
  modifier: (string: string) => string
) =>
  transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const camelKey = isArray(target)
        ? key
        : key == key.toUpperCase()
          ? modifier(key).toUpperCase()
          : modifier(key);
      result[camelKey] = isObject(value)
        ? changeCasing(value as Record<string, unknown>, modifier)
        : value;
    }
  );

export const fetchApi = async <T>(
  url: string,
  options?: Omit<RequestInit, 'body'> & { body?: Record<string, unknown> }
): Promise<T> => {
  const userData = localStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;
  const baseUrl = import.meta.env.VITE_BASE_URL || '';
  if (!baseUrl) {
    throw new Error('API base URL is not defined in environment variables');
  }

  try {
    const response = await fetch(
      `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}${url}`,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
          ...options?.headers,
        },
        body: options?.body
          ? JSON.stringify(changeCasing(options.body, snakeCase))
          : undefined,
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'An error occurred');
    }
    const data = changeCasing(await response.json(), camelCase);

    return data as T;
  } catch (error) {
    console.error('Fetch API error:', error);
    throw error;
  }
};
