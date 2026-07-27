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
    case 'Owner': return <ShieldCheck className="w-4 h-4 text-primary-600" />;
    case 'Admin': return <ShieldCheck className="w-4 h-4 text-black" />;
    case 'Editor': return <Edit3 className="w-4 h-4 text-slate-400" />;
    case 'Approver': return <CheckCircle className="w-4 h-4 text-primary-500" />;
    case 'Viewer': return <Eye className="w-4 h-4 text-slate-300" />;
    default: return null;
  }
};

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Team Management</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Collaborate with your team members and manage permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-black hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-black/10">
          <UserPlus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Member</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Role</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-xs shadow-lg shadow-black/10">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-black text-black uppercase tracking-tight">{member.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-3">
                    {getRoleIcon(member.role)}
                    <span className="text-xs font-black uppercase tracking-widest text-slate-600">{member.role}</span>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    member.status === 'Active' ? 'bg-primary-50 text-primary-600 border border-primary-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <button className="p-3 hover:bg-white hover:shadow-md rounded-xl text-slate-300 hover:text-black border border-transparent hover:border-slate-100 transition-all">
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
