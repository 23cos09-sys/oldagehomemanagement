import { useState, useRef, useCallback } from 'react';
import { medications as initialMeds } from '@/data/mockData';
import { Medication } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock } from 'lucide-react';

const MedicationsPage = () => {
  const [meds, setMeds] = useState<Medication[]>(initialMeds);
  const holdTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const [holdingId, setHoldingId] = useState<string | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const startHold = useCallback((id: string) => {
    setHoldingId(id);
    setHoldProgress(0);
    const startTime = Date.now();
    const duration = 1500;

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setHoldProgress(Math.min(elapsed / duration, 1));
    }, 30);

    const timer = setTimeout(() => {
      setMeds(prev => prev.map(m =>
        m.id === id ? { ...m, given: true, givenAt: new Date().toISOString(), givenBy: 'Current User' } : m
      ));
      setHoldingId(null);
      setHoldProgress(0);
      if (progressInterval.current) clearInterval(progressInterval.current);
    }, duration);

    holdTimers.current.set(id, timer);
  }, []);

  const cancelHold = useCallback((id: string) => {
    const timer = holdTimers.current.get(id);
    if (timer) { clearTimeout(timer); holdTimers.current.delete(id); }
    if (progressInterval.current) clearInterval(progressInterval.current);
    setHoldingId(null);
    setHoldProgress(0);
  }, []);

  const pending = meds.filter(m => !m.given);
  const given = meds.filter(m => m.given);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Medication Tracking</h1>
        <p className="page-description">Today's medication schedule — press and hold to mark as given</p>
      </div>

      <h2 className="font-heading text-lg font-medium mb-3 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" /> Pending ({pending.length})
      </h2>
      <Card className="mb-8">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Medicine</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.map(m => (
                <TableRow key={m.id} className="relative overflow-hidden">
                  <TableCell className="font-heading">{m.time}</TableCell>
                  <TableCell className="font-medium">{m.residentName}</TableCell>
                  <TableCell>{m.medicineName}</TableCell>
                  <TableCell>{m.dosage}</TableCell>
                  <TableCell><Badge variant="outline">{m.schedule}</Badge></TableCell>
                  <TableCell>
                    <button
                      onMouseDown={() => startHold(m.id)}
                      onMouseUp={() => cancelHold(m.id)}
                      onMouseLeave={() => cancelHold(m.id)}
                      onTouchStart={() => startHold(m.id)}
                      onTouchEnd={() => cancelHold(m.id)}
                      className="relative px-4 py-2 rounded-md border border-primary text-primary text-sm font-heading overflow-hidden select-none cursor-pointer transition-colors hover:bg-primary/5"
                    >
                      {holdingId === m.id && (
                        <span
                          className="absolute inset-0 bg-primary/20 origin-left"
                          style={{ transform: `scaleX(${holdProgress})`, transition: 'none' }}
                        />
                      )}
                      <span className="relative z-10">Hold to Confirm</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {pending.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">All medications administered ✓</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <h2 className="font-heading text-lg font-medium mb-3 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-primary" /> Administered ({given.length})
      </h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Medicine</TableHead>
                <TableHead>Given At</TableHead>
                <TableHead>Given By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {given.map(m => (
                <TableRow key={m.id} className="opacity-70">
                  <TableCell className="font-heading">{m.time}</TableCell>
                  <TableCell>{m.residentName}</TableCell>
                  <TableCell>{m.medicineName}</TableCell>
                  <TableCell>{m.givenAt ? new Date(m.givenAt).toLocaleTimeString() : '-'}</TableCell>
                  <TableCell>{m.givenBy || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationsPage;
