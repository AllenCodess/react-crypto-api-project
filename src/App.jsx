import { useState, useEffect } from "react";

const API_URL =
  "/api/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setCoins(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {coins.map((coin) => (
        <p key={coin.id}>
          <img src={coin.image} alt="" width={15} /> {coin.name} - ${coin.current_price}
        </p>
      ))}
    </div>
  );
};

export default App;
