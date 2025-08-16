import { useUsersSlots } from "./hooks/useUsersSlots";
import { UserCard } from "./components/UserCard";

export default function App() {
  const { slots, updatedIndices, isFetching, error, count } = useUsersSlots();

  return (
    <div className="app-wrap">
      <header className="header">
        <h1>List of users. Pick your friend(s)😊</h1>
        <div className="meta">
          <span>Request: {count} user(s)</span>
          {isFetching && <span className="dot"> · loading…</span>}
          {error && <span className="error"> · Error: {error}</span>}
        </div>
      </header>

      <main className="grid">
        {slots.map((user, i) => (
          <UserCard
            key={i}
            user={user}
            index={i}
            updated={updatedIndices.includes(i)}
          />
        ))}
      </main>
    </div>
  );
}
