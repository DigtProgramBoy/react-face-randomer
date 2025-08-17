import axios from "axios";

export type User = {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { large: string; medium: string; thumbnail: string };
};

const SLOTS = 10;

export async function fetchUsers({
  count,
}: {
  count: number;
}): Promise<User[]> {
  const res = await axios.get(
    `https://randomuser.me/api/?results=${count}&nat=us`
  );

  return res.data.results as User[];
}

export { SLOTS };
