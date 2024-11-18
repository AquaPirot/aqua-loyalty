'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRestaurantPage() {
  const router = useRouter();
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
      router.push('/admin/restaurants');
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dodaj Novi Restoran</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ime Restorana</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">PIB</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.pib}
            onChange={e => setFormData({...formData, pib: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adresa</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">RSD po Bodu</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={formData.pointsRatio}
            onChange={e => setFormData({...formData, pointsRatio: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Sačuvaj</Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.back()}
          >
            Odustani
          </Button>
        </div>
      </form>
    </div>
  );
}
