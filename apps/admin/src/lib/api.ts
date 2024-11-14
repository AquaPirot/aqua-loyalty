const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = {
  admin: {
    getStats: () => 
      fetch(`${API_URL}/admin/stats`).then(res => res.json()),
    
    getUsers: ({ search }: { search?: string } = {}) =>
      fetch(`${API_URL}/admin/users?search=${search || ''}`).then(res => res.json()),
    
    getRewards: () =>
      fetch(`${API_URL}/admin/rewards`).then(res => res.json()),
    
    updateReward: ({ id, ...data }: { id: number; [key: string]: any }) =>
      fetch(`${API_URL}/admin/rewards/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    
    createReward: (data: any) =>
      fetch(`${API_URL}/admin/rewards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
  },
}
