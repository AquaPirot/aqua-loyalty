// src/app/admin/restaurants/add/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddRestaurantPage() {
  const [formData, setFormData] = useState({
    name: '',
    pib: '',
    address: '',
    pointsRatio: 200
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      // Handle success
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Ime restorana"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="PIB"
          className="w-full p-2 border rounded"
          value={formData.pib}
          onChange={e => setFormData({...formData, pib: e.target.value})}
        />
        <input
          type="text"
          placeholder="Adresa"
          className="w-full p-2 border rounded"
          value={formData.address}
          onChange={e => setFormData({...formData, address: e.target.value})}
        />
        <Button type="submit">Sačuvaj</Button>
      </div>
    </form>
  );
}
