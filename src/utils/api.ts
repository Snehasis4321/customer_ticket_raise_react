interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export const apiCall = async <T>(
  url: string,
  options: RequestInit = {},
  token?: string | null
): Promise<ApiResponse<T>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (response.status === 401) {
      // Token is invalid, trigger logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return { status: 401, error: 'Authentication required' };
    }

    return {
      data: response.ok ? data : undefined,
      error: response.ok ? undefined : data.error || 'Request failed',
      status: response.status,
    };
  } catch (error) {
    return {
      status: 500,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
};