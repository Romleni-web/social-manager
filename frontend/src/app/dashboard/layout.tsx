import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
