const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth-token')
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API request failed')
  }

  return response.json()
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (data: any) =>
      fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  receipts: {
    scan: (data: any) =>
      fetchApi('/receipts/scan', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getHistory: () => fetchApi('/receipts/history'),
  },
  rewards: {
    getAll: () => fetchApi('/rewards'),
    redeem: (rewardId: string) =>
      fetchApi(`/rewards/${rewardId}/redeem`, {
        method: 'POST',
      }),
  },
}
