import { Card, CardContent } from '@/components/ui/card';
import { residents, staff, donations, events, activities, medications } from '@/data/mockData';
import { Users, UserCog, Heart, CalendarDays, Pill, AlertTriangle } from 'lucide-react';
import { inventory } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';
const DashboardPage = () => {
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date('2026-03-10')).length;
  const pendingMeds = medications.filter(m => !m.given).length;
  const lowStockItems = inventory.filter(i => i.quantity < i.minStock);

  const stats = [
    { label: 'Total Residents', value: residents.length, icon: Users, color: 'text-primary' },
    { label: 'Total Staff', value: staff.length, icon: UserCog, color: 'text-primary' },
    { label: 'Total Donations', value: `₹${(totalDonations / 1000).toFixed(0)}K`, icon: Heart, color: 'text-primary' },
    { label: 'Upcoming Events', value: upcomingEvents, icon: CalendarDays, color: 'text-primary' },
    { label: 'Pending Medications', value: pendingMeds, icon: Pill, color: 'text-destructive' },
    { label: 'Low Stock Alerts', value: lowStockItems.length, icon: AlertTriangle, color: 'text-destructive' },
  ];

  const donationsByMonth = [
    { month: 'Jan', amount: 200000 },
    { month: 'Feb', amount: 175000 },
    { month: 'Mar', amount: 90000 },
  ];

  const residentsByGender = [
    { name: 'Female', value: residents.filter(r => r.gender === 'Female').length },
    { name: 'Male', value: residents.filter(r => r.gender === 'Male').length },
  ];
  const pieColors = ['hsl(20, 26%, 52%)', 'hsl(40, 10%, 65%)'];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">Overview of the old age home</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(s => (
          <Card key={s.label} className="stat-card">
            <CardContent className="p-0 flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-muted ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-body">{s.label}</p>
                <p className="text-2xl font-heading font-semibold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-heading text-lg font-medium mb-4">Donations Overview</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={donationsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 10%, 85%)" />
                <XAxis dataKey="month" tick={{ fontFamily: 'Source Sans 3', fontSize: 12 }} />
                <YAxis tick={{ fontFamily: 'Source Sans 3', fontSize: 12 }} tickFormatter={v => `₹${v / 1000}K`} />
                <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']} />
                <Bar dataKey="amount" fill="hsl(20, 26%, 52%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-heading text-lg font-medium mb-4">Residents by Gender</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={residentsByGender} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {residentsByGender.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-heading text-lg font-medium mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {events.filter(e => new Date(e.date) >= new Date('2026-03-10')).slice(0, 4).map(ev => (
                <div key={ev.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CalendarDays className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-heading font-medium">{ev.name}</p>
                    <p className="text-xs text-muted-foreground">{ev.date} at {ev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-heading text-lg font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activities.slice(0, 5).map(a => (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-body">{a.details}</p>
                    <p className="text-xs text-muted-foreground">{a.user} · {new Date(a.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
