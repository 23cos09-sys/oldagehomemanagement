import { residents, staff, donations, inventory } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';

const downloadCSV = (filename: string, headers: string[], rows: string[][]) => {
  const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const ReportsPage = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <p className="page-description">Generate and export reports</p>
      </div>

      <Tabs defaultValue="residents">
        <TabsList className="mb-4">
          <TabsTrigger value="residents" className="font-heading">Residents</TabsTrigger>
          <TabsTrigger value="donations" className="font-heading">Donations</TabsTrigger>
          <TabsTrigger value="staff" className="font-heading">Staff</TabsTrigger>
          <TabsTrigger value="inventory" className="font-heading">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="residents">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading font-medium">Resident Report</h3>
                <Button variant="outline" size="sm" onClick={() =>
                  downloadCSV('residents.csv', ['Name', 'Age', 'Gender', 'Room', 'Admission Date', 'Medical Conditions'],
                    residents.map(r => [r.name, String(r.age), r.gender, r.roomNumber, r.admissionDate, r.medicalConditions.join('; ')]))
                }>
                  <Download className="h-4 w-4 mr-2" />Export CSV
                </Button>
              </div>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Name</TableHead><TableHead>Age</TableHead><TableHead>Room</TableHead><TableHead>Admitted</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {residents.map(r => (
                    <TableRow key={r.id}>
                      <TableCell className="font-heading">{r.name}</TableCell>
                      <TableCell>{r.age}</TableCell>
                      <TableCell>{r.roomNumber}</TableCell>
                      <TableCell>{r.admissionDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading font-medium">Donation Report — Total: ₹{donations.reduce((s, d) => s + d.amount, 0).toLocaleString()}</h3>
                <Button variant="outline" size="sm" onClick={() =>
                  downloadCSV('donations.csv', ['Donor', 'Amount', 'Date', 'Method'],
                    donations.map(d => [d.donorName, String(d.amount), d.date, d.paymentMethod]))
                }>
                  <Download className="h-4 w-4 mr-2" />Export CSV
                </Button>
              </div>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Donor</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Method</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {donations.map(d => (
                    <TableRow key={d.id}>
                      <TableCell className="font-heading">{d.donorName}</TableCell>
                      <TableCell>₹{d.amount.toLocaleString()}</TableCell>
                      <TableCell>{d.date}</TableCell>
                      <TableCell className="capitalize">{d.paymentMethod.replace('_', ' ')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading font-medium">Staff Report</h3>
                <Button variant="outline" size="sm" onClick={() =>
                  downloadCSV('staff.csv', ['Name', 'Email', 'Role', 'Join Date'],
                    staff.map(s => [s.name, s.email, s.role, s.joinDate]))
                }>
                  <Download className="h-4 w-4 mr-2" />Export CSV
                </Button>
              </div>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Joined</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {staff.map(s => (
                    <TableRow key={s.id}>
                      <TableCell className="font-heading">{s.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell className="capitalize">{s.role}</TableCell>
                      <TableCell>{s.joinDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading font-medium">Inventory Report</h3>
                <Button variant="outline" size="sm" onClick={() =>
                  downloadCSV('inventory.csv', ['Item', 'Category', 'Quantity', 'Unit', 'Min Stock', 'Status'],
                    inventory.map(i => [i.name, i.category, String(i.quantity), i.unit, String(i.minStock), i.quantity < i.minStock ? 'Low' : 'OK']))
                }>
                  <Download className="h-4 w-4 mr-2" />Export CSV
                </Button>
              </div>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Item</TableHead><TableHead>Category</TableHead><TableHead>Qty</TableHead><TableHead>Status</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {inventory.map(i => (
                    <TableRow key={i.id}>
                      <TableCell className="font-heading">{i.name}</TableCell>
                      <TableCell className="capitalize">{i.category}</TableCell>
                      <TableCell>{i.quantity} {i.unit}</TableCell>
                      <TableCell className={i.quantity < i.minStock ? 'text-destructive' : 'text-muted-foreground'}>
                        {i.quantity < i.minStock ? 'Low Stock' : 'In Stock'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
