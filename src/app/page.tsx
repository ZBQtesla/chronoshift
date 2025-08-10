import { TimestampConverter } from '@/components/TimestampConverter';
import { TimeDifferenceCalculator } from '@/components/TimeDifferenceCalculator';
import { CurrentTimestamp } from '@/components/CurrentTimestamp';
import { Code2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <header className="text-center my-8 md:my-12">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <Code2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-primary">
            ChronoShift
          </h1>
          <p className="text-muted-foreground mt-3 text-md md:text-xl max-w-2xl mx-auto">
            The developer's essential toolkit for converting, comparing, and
            generating timestamps with precision.
          </p>
        </header>

        <div className="max-w-3xl mx-auto space-y-8">
          <TimestampConverter />
          <TimeDifferenceCalculator />
          <CurrentTimestamp />
        </div>
      </main>
      <footer className="text-center p-6 text-muted-foreground text-sm">
        <p>Built for developers with precision and speed in mind.</p>
      </footer>
    </div>
  );
}
