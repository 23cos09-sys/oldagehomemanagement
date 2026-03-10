import { useState } from 'react';
import { donations as initialDonations } from '@/data/mockData';
import { Donation } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DonationsPage = () => {
  const [donationsList, setDonationsList] = useState<Donation[]>(initialDonations);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const total = donationsList.reduce((s, d) => s + d.amount, 0);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newDonation: Donation = {
      id: `d${Date.now()}`,
      donorName: fd.get('donorName') as string,
      contact: fd.get('contact') as string,
      amount: parseFloat(fd.get('amount') as string),
      date: fd.get('date') as string,
      paymentMethod: fd.get('paymentMethod') as Donation['paymentMethod'],
    };
    setDonationsList(prev => [...prev, newDonation]);
    setIsAddOpen(false);
  };

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Donations</h1>
          <p className="page-description">Track and manage donations received</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Record Donation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-heading">Record Donation</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-3">
              <div><Label className="font-heading text-xs">Donor Name</Label><Input name="donorName" required /></div>
              <div><Label className="font-heading text-xs">Contact</Label><Input name="contact" required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="font-heading text-xs">Amount (₹)</Label><Input name="amount" type="number" required /></div>
                <div><Label className="font-heading text-xs">Date</Label><Input name="date" type="date" required /></div>
              </div>
              <div><Label className="font-heading text-xs">Payment Method</Label><Input name="paymentMethod" placeholder="cash / bank_transfer / cheque / online" required /></div>
              <Button type="submit" className="w-full">Record</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6 stat-card">
        <CardContent className="p-0 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-muted text-primary"><Heart className="h-6 w-6" /></div>
          <div>
            <p className="text-sm text-muted-foreground">Total Donations</p>
            <p className="text-2xl font-heading font-semibold">₹{total.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table className="data-table">
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donationsList.map(d => (
                <TableRow key={d.id}>
                  <TableCell className="font-heading font-medium">{d.donorName}</TableCell>
                  <TableCell>{d.contact}</TableCell>
                  <TableCell className="font-heading">₹{d.amount.toLocaleString()}</TableCell>
                  <TableCell>{d.date}</TableCell>
                  <TableCell><Badge variant="secondary" className="capitalize">{d.paymentMethod.replace('_', ' ')}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsPage;
