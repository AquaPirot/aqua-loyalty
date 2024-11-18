import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export default async function RestaurantsPage() {
  const restaurants = await prisma.restaurant.findMany();

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Restorani</h1>
        <Button variant="outline">Dodaj Restoran</Button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Ime</th>
              <th className="p-4 text-left">PIB</th>
              <th className="p-4 text-left">Adresa</th>
              <th className="p-4 text-left">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id} className="border-b">
                <td className="p-4">{restaurant.name}</td>
                <td className="p-4">{restaurant.pib}</td>
                <td className="p-4">{restaurant.address}</td>
                <td className="p-4">
                  <Button variant="outline">Uredi</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
