'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Table } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'

export default function UsersPage() {
  const [search, setSearch] = useState('')
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['users', search],
    queryFn: () => api.admin.getUsers({ search }),
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Korisnici</h1>
        <Input
          placeholder="Pretraga korisnika..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Ime</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Telefon</Table.Head>
            <Table.Head>Bodovi</Table.Head>
            <Table.Head>Registrovan</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users?.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.phone}</Table.Cell>
              <Table.Cell>{user.points}</Table.Cell>
              <Table.Cell>
                {new Date(user.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                {/* Akcije */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
