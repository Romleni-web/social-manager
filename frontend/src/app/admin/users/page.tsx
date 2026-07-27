'use client';

import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Star } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'PRO', credits: 450, status: 'Active' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@test.com', plan: 'FREE', credits: 2, status: 'Active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@dev.io', plan: 'BUSINESS', credits: 1800, status: 'Active' },
  { id: 4, name: 'Jane Wilson', email: 'jane@corp.com', plan: 'STARTER', credits: 80, status: 'Banned' },
];

export default function UserManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1">Audit, ban, or upgrade user accounts.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-800 border border-white/5 rounded-2xl flex items-center px-4 py-2 gap-3 min-w-[300px]">
            <Search className="w-4 h-4 text-slate-500" />
            <input placeholder="Search users by name or email..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <button className="p-3 bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-white">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-white/5 rounded-[32px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">User</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plan</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Credits</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center font-bold text-xs">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-widest ${
                    user.plan === 'BUSINESS' ? 'bg-purple-500/20 text-purple-400' :
                    user.plan === 'PRO' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-medium text-slate-300">{user.credits}</span>
                </td>
                <td className="px-8 py-5">
                  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold ${
                    user.status === 'Active' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition-all">
                      <Star className="w-4 h-4" />
                    </button>
                    <button className={`p-2 hover:bg-white/10 rounded-lg transition-all ${
                      user.status === 'Active' ? 'text-rose-500' : 'text-emerald-500'
                    }`}>
                      {user.status === 'Active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
