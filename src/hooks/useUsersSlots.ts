import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchUsers, type User } from "../api/users";
import { getRandomNumber, pushaffle } from "../helpers/helpers";

export function useUsersSlots() {
  const [updatedIndices] = useState<number[]>([]);
  const [count, setCount] = useState(10);
  const [users, setUsers] = useState<User[]>([]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers({ count }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (!users.length && data?.length) {
      setUsers(data);
    }

    if (users.length && data?.length) {
      const indexesForReplacing = pushaffle(count);

      const updatedUsers = users.map((user, index, array) => {
        if (indexesForReplacing.includes(index) && index < array.length) {
          return data[indexesForReplacing.indexOf(index)];
        }

        return user;
      });

      setUsers(updatedUsers);
    }

    setCount(getRandomNumber(10));
  }, [data]);

  return {
    slots: users,
    updatedIndices,
    isFetching,
    error: error instanceof Error ? error.message : null,
    count,
  };
}
