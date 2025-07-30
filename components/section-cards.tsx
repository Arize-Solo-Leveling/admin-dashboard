// components/SectionCards.tsx
import { SampleCard } from "@/components/SampleCard";

export function SectionCards() {
  return (
    <div className="p-4 flex gap-5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <SampleCard key={idx} />
      ))}
    </div>
  );
}
