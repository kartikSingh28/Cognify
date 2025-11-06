import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function GameStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "game_stats"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStats(data);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading game stats...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Cognitive Game Data (from Firebase)
      </h2>

      {stats.length === 0 ? (
        <p>No data found in Firestore.</p>
      ) : (
        <table className="border border-gray-400 w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Game Name</th>
              <th className="border px-4 py-2">Score</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.id}>
                <td className="border px-4 py-2">{s.gameName || "—"}</td>
                <td className="border px-4 py-2">{s.score || "—"}</td>
                <td className="border px-4 py-2">
                  {s.timestamp?.seconds
                    ? new Date(s.timestamp.seconds * 1000).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
