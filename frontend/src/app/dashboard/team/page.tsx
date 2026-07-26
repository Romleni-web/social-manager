import React from 'react';
import { UserPlus, MoreHorizontal, ShieldCheck, Edit3, Eye, CheckCircle } from 'lucide-react';

const members = [
  { id: 1, name: 'Alex Johnson', email: 'alex@company.com', role: 'Owner', status: 'Active', avatar: 'AJ' },
  { id: 2, name: 'Sarah Miller', email: 'sarah@company.com', role: 'Admin', status: 'Active', avatar: 'SM' },
  { id: 3, name: 'David Chen', email: 'david@company.com', role: 'Editor', status: 'Active', avatar: 'DC' },
  { id: 4, name: 'Elena Rodriguez', email: 'elena@company.com', role: 'Approver', status: 'Pending', avatar: 'ER' },
  { id: 5, name: 'James Wilson', email: 'james@company.com', role: 'Viewer', status: 'Active', avatar: 'JW' },
];

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'Owner': return <ShieldCheck className="w-4 h-4 text-purple-400" />;
    case 'Admin': return <ShieldCheck className="w-4 h-4 text-blue-400" />;
    case 'Editor': return <Edit3 className="w-4 h-4 text-emerald-400" />;
    case 'Approver': return <CheckCircle className="w-4 h-4 text-amber-400" />;
    case 'Viewer': return <Eye className="w-4 h-4 text-slate-400" />;
    default: return null;
  }
};

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-slate-400 mt-1">Collaborate with your team members and manage permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-600/20">
          <UserPlus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Member</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center font-bold text-sm border border-primary-600/20">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(member.role)}
                    <span className="text-sm font-medium text-slate-300">{member.role}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 hover:bg-white/10 rounded-xl text-slate-500 group-hover:text-white transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
