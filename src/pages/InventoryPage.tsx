import { useState } from 'react';
import { inventory as initialInventory } from '@/data/mockData';
import { InventoryItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, AlertTriangle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const InventoryPage = () => {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) || i.category.includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newItem: InventoryItem = {
      id: `i${Date.now()}`,
      name: fd.get('name') as string,
      category: fd.get('category') as InventoryItem['category'],
      quantity: parseInt(fd.get('quantity') as string),
      unit: fd.get('unit') as string,
      minStock: parseInt(fd.get('minStock') as string),
      lastRestocked: new Date().toISOString().split('T')[0],
    };
    setItems(prev => [...prev, newItem]);
    setIsAddOpen(false);
  };

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Inventory</h1>
          <p className="page-description">Track medicines, food supplies, and equipment</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-heading">Add Inventory Item</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-3">
              <div><Label className="font-heading text-xs">Name</Label><Input name="name" required /></div>
              <div><Label className="font-heading text-xs">Category</Label><Input name="category" placeholder="medicine / food / equipment" required /></div>
              <div className="grid grid-cols-3 gap-2">
                <div><Label className="font-heading text-xs">Quantity</Label><Input name="quantity" type="number" required /></div>
                <div><Label className="font-heading text-xs">Unit</Label><Input name="unit" required /></div>
                <div><Label className="font-heading text-xs">Min Stock</Label><Input name="minStock" type="number" required /></div>
              </div>
              <Button type="submit" className="w-full">Add Item</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search inventory..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table className="data-table">
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(i => {
                const isLow = i.quantity < i.minStock;
                return (
                  <TableRow key={i.id}>
                    <TableCell className="font-heading font-medium">{i.name}</TableCell>
                    <TableCell><Badge variant="secondary" className="capitalize">{i.category}</Badge></TableCell>
                    <TableCell className={isLow ? 'text-destructive font-semibold' : ''}>{i.quantity} {i.unit}</TableCell>
                    <TableCell>{i.minStock} {i.unit}</TableCell>
                    <TableCell>
                      {isLow ? (
                        <span className="flex items-center gap-1 text-destructive text-sm">
                          <AlertTriangle className="h-4 w-4" /> Low Stock
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">In Stock</span>
                      )}
                    </TableCell>
                    <TableCell>{i.lastRestocked}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;
