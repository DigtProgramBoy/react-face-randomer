import axios from "axios";

export type User = {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { large: string; medium: string; thumbnail: string };
};

const SLOTS = 10;

export async function fetchUsers(count: number): Promise<User[]> {
  const safeCount = Math.max(1, Math.min(SLOTS, Math.floor(count)));
  const res = await axios.get(`https://randomuser.me/api/?results=${safeCount}&nat=us`);
  return res.data.results as User[];
}

export { SLOTS };
