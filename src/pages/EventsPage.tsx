import { useState } from 'react';
import { events as initialEvents } from '@/data/mockData';
import { Event } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Stethoscope, Users, PartyPopper, Sun } from 'lucide-react';

const typeConfig = {
  doctor_visit: { label: 'Doctor Visit', icon: Stethoscope, variant: 'default' as const },
  volunteer: { label: 'Volunteer', icon: Users, variant: 'secondary' as const },
  celebration: { label: 'Celebration', icon: PartyPopper, variant: 'default' as const },
  daily_program: { label: 'Daily Program', icon: Sun, variant: 'outline' as const },
};

const EventsPage = () => {
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newEvent: Event = {
      id: `e${Date.now()}`,
      name: fd.get('name') as string,
      date: fd.get('date') as string,
      time: fd.get('time') as string,
      description: fd.get('description') as string,
      type: fd.get('type') as Event['type'],
      participants: [],
    };
    setEventsList(prev => [...prev, newEvent]);
    setIsAddOpen(false);
  };

  const sorted = [...eventsList].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Events & Activities</h1>
          <p className="page-description">Manage scheduled events and daily programs</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-heading">Create Event</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-3">
              <div><Label className="font-heading text-xs">Event Name</Label><Input name="name" required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="font-heading text-xs">Date</Label><Input name="date" type="date" required /></div>
                <div><Label className="font-heading text-xs">Time</Label><Input name="time" type="time" required /></div>
              </div>
              <div><Label className="font-heading text-xs">Type</Label><Input name="type" placeholder="doctor_visit / volunteer / celebration / daily_program" required /></div>
              <div><Label className="font-heading text-xs">Description</Label><Input name="description" /></div>
              <Button type="submit" className="w-full">Create Event</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(ev => {
          const config = typeConfig[ev.type];
          const Icon = config.icon;
          return (
            <Card key={ev.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="font-heading font-medium">{ev.name}</h3>
                  </div>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{ev.description}</p>
                <p className="text-sm font-body">
                  <span className="text-muted-foreground">Date:</span> {ev.date} at {ev.time}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{ev.participants.length} participant(s)</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPage;
