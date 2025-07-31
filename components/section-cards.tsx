"use client";

import { SampleCard } from "@/components/SampleCard";
import axiosClient from "@/lib/axiosClient";
import { useEffect, useState } from "react";

export function SectionCards() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosClient.get("/admin/stats");
        setData(res.data);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // console.log(data);

  return (
    <div className="p-4 flex gap-5">
  <SampleCard
    title="Users"
    count={data.userCount}
    description="Total registered users"
    href="/users"
  />
  <SampleCard
    title="Quests Completed"
    count={data.questCount}
    description="Total quests completed"
    href="/quests"
  />
  <SampleCard
    title="Dungeons Explored"
    count={data.dungeonCount}
    description="Number of dungeons explored"
    href="/dungeons"
  />
  <SampleCard
    title="Workouts Logged"
    count={data.workoutCount}
    description="Total workouts completed"
    href="/workouts"
  />
  <SampleCard
    title="Items in Inventory"
    count={data.inventoryCount}
    description="Items currently tracked"
    href="/inventory"
  />
</div>

  );
}
