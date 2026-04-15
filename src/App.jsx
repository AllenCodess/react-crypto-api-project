import { useState, useEffect } from "react";

const API_URL =
  "/api/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data received:", data);
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {coins.map((coin) => (
        <p key={coin.id}>
          {coin.name} - ${coin.current_price}
        </p>
      ))}
    </div>
  );
};

export default App;
