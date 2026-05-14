import { useState, useEffect } from 'react';
import api from '../../services/api';
import { formatDate } from '../../utils/formatters';

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => { api.get('/admin/users').then((r) => setUsers(r.data.users)); }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold mb-6">Users ({users.length})</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-xl shadow-md">
          <thead className="bg-brand-gray">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.phone}</td>
                <td className="px-4 py-3">{formatDate(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
