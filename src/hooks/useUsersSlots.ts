import { useEffect, useRef, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchUsers, type User, SLOTS } from "../api/users";

export function useUsersSlots() {
  const [slots, setSlots] = useState<Array<User | null>>(Array(SLOTS).fill(null));
  const [updatedIndices, setUpdatedIndices] = useState<number[]>([]);
  const countRef = useRef(SLOTS);
  const [count, setCount] = useState(SLOTS);
  const [trigger, setTrigger] = useState(0);

  const { data, isFetching, error } = useQuery({
    queryKey: ["users", count, trigger],
    queryFn: () => fetchUsers(count),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData, 
  });

  useEffect(() => {
    if (!data) return;
    if (trigger === 0) {
      const newSlots = Array(SLOTS).fill(null);
      data.slice(0, SLOTS).forEach((user, i) => (newSlots[i] = user));
      setSlots(newSlots);
      setUpdatedIndices(data.slice(0, SLOTS).map((_, i) => i));
      setTimeout(() => setUpdatedIndices([]), 700);
    }
  }, [data, trigger]);

  useEffect(() => {
    if (!data || trigger === 0) return;

    const k = Math.min(data.length, SLOTS);
    const positions = new Set<number>();
    while (positions.size < k) positions.add(Math.floor(Math.random() * SLOTS));
    const posArray = Array.from(positions);

    setSlots(prev => {
      const newSlots = [...prev];
      for (let i = 0; i < k; i++) newSlots[posArray[i]] = data[i];
      return newSlots;
    });

    setUpdatedIndices(posArray);
    const timer = setTimeout(() => setUpdatedIndices([]), 700);
    return () => clearTimeout(timer);
  }, [data, trigger]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let nextCount = Math.floor(Math.random() * SLOTS) + 1;
      if (nextCount === countRef.current) nextCount = (nextCount % SLOTS) + 1;
      countRef.current = nextCount;
      setCount(nextCount);
      setTrigger(t => t + 1);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return {
    slots,
    updatedIndices,
    isFetching,
    error: error instanceof Error ? error.message : null,
    count,
  };
}
