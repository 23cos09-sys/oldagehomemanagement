import { useState } from 'react';
import { residents as initialResidents } from '@/data/mockData';
import { Resident } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Trash2, Edit, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ITEMS_PER_PAGE = 5;

const ResidentsPage = () => {
  const [residents, setResidents] = useState<Resident[]>(initialResidents);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const filtered = residents.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.roomNumber.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = (id: string) => {
    setResidents(prev => prev.filter(r => r.id !== id));
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newResident: Resident = {
      id: `r${Date.now()}`,
      name: fd.get('name') as string,
      age: parseInt(fd.get('age') as string),
      gender: fd.get('gender') as 'Male' | 'Female' | 'Other',
      roomNumber: fd.get('roomNumber') as string,
      admissionDate: fd.get('admissionDate') as string,
      medicalConditions: (fd.get('medicalConditions') as string).split(',').map(s => s.trim()).filter(Boolean),
      medications: [],
      emergencyContact: {
        name: fd.get('ecName') as string,
        phone: fd.get('ecPhone') as string,
        relation: fd.get('ecRelation') as string,
      },
      notes: fd.get('notes') as string,
    };
    setResidents(prev => [...prev, newResident]);
    setIsAddOpen(false);
  };

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Residents</h1>
          <p className="page-description">Manage resident profiles and information</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Resident</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">Add New Resident</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="font-heading text-xs">Name</Label><Input name="name" required /></div>
                <div><Label className="font-heading text-xs">Age</Label><Input name="age" type="number" required /></div>
                <div><Label className="font-heading text-xs">Gender</Label><Input name="gender" placeholder="Male/Female/Other" required /></div>
                <div><Label className="font-heading text-xs">Room Number</Label><Input name="roomNumber" required /></div>
              </div>
              <div><Label className="font-heading text-xs">Admission Date</Label><Input name="admissionDate" type="date" required /></div>
              <div><Label className="font-heading text-xs">Medical Conditions (comma-separated)</Label><Input name="medicalConditions" /></div>
              <div className="grid grid-cols-3 gap-2">
                <div><Label className="font-heading text-xs">Emergency Contact</Label><Input name="ecName" placeholder="Name" /></div>
                <div><Label className="font-heading text-xs">Phone</Label><Input name="ecPhone" placeholder="Phone" /></div>
                <div><Label className="font-heading text-xs">Relation</Label><Input name="ecRelation" placeholder="Relation" /></div>
              </div>
              <div><Label className="font-heading text-xs">Notes</Label><Input name="notes" /></div>
              <Button type="submit" className="w-full">Add Resident</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name or room..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table className="data-table">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-heading font-medium">{r.name}</TableCell>
                  <TableCell>{r.age}</TableCell>
                  <TableCell>{r.gender}</TableCell>
                  <TableCell>{r.roomNumber}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {r.medicalConditions.map(c => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedResident(r); setIsViewOpen(true); }}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">{filtered.length} resident(s)</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm flex items-center px-2">{page} / {totalPages || 1}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">{selectedResident?.name}</DialogTitle>
          </DialogHeader>
          {selectedResident && (
            <div className="space-y-3 text-sm font-body">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Age:</span> {selectedResident.age}</div>
                <div><span className="text-muted-foreground">Gender:</span> {selectedResident.gender}</div>
                <div><span className="text-muted-foreground">Room:</span> {selectedResident.roomNumber}</div>
                <div><span className="text-muted-foreground">Admitted:</span> {selectedResident.admissionDate}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Medical Conditions:</span>
                <div className="flex flex-wrap gap-1 mt-1">{selectedResident.medicalConditions.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Medications:</span>
                <div className="flex flex-wrap gap-1 mt-1">{selectedResident.medications.map(m => <Badge key={m} variant="outline">{m}</Badge>)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Emergency Contact:</span>
                <p>{selectedResident.emergencyContact.name} ({selectedResident.emergencyContact.relation}) — {selectedResident.emergencyContact.phone}</p>
              </div>
              {selectedResident.notes && <div><span className="text-muted-foreground">Notes:</span> {selectedResident.notes}</div>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResidentsPage;
