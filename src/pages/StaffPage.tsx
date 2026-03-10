import { useState } from 'react';
import { staff as initialStaff, residents } from '@/data/mockData';
import { Staff } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const StaffPage = () => {
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = staffList.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.email.includes(search)
  );

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newStaff: Staff = {
      id: `s${Date.now()}`,
      name: fd.get('name') as string,
      phone: fd.get('phone') as string,
      email: fd.get('email') as string,
      role: (fd.get('role') as string) === 'admin' ? 'admin' : 'staff',
      assignedResidentIds: [],
      joinDate: new Date().toISOString().split('T')[0],
    };
    setStaffList(prev => [...prev, newStaff]);
    setIsAddOpen(false);
  };

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Staff Management</h1>
          <p className="page-description">Manage caregivers and administrators</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Staff</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-heading">Add Staff Member</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-3">
              <div><Label className="font-heading text-xs">Name</Label><Input name="name" required /></div>
              <div><Label className="font-heading text-xs">Email</Label><Input name="email" type="email" required /></div>
              <div><Label className="font-heading text-xs">Phone</Label><Input name="phone" required /></div>
              <div><Label className="font-heading text-xs">Role</Label><Input name="role" placeholder="admin or staff" required /></div>
              <Button type="submit" className="w-full">Add Staff</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search staff..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table className="data-table">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Assigned Residents</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-heading font-medium">{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell><Badge variant="secondary" className="capitalize">{s.role}</Badge></TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {s.assignedResidentIds.map(rid => {
                        const r = residents.find(res => res.id === rid);
                        return r ? <Badge key={rid} variant="outline" className="text-xs">{r.name}</Badge> : null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setStaffList(prev => prev.filter(x => x.id !== s.id))}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPage;
