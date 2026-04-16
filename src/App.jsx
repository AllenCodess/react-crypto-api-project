import { useState, useEffect } from "react";
import CoinCard from "./component/CoinCard";
import LimitSelector from "./component/LimitSelector";
import FilterInput from "./component/FilterInput";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [limit, setLimit] = useState(10);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
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
  }, [limit]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onChangeLimit={setLimit} />
      </div>
      {loading && <p>Loading...</p>}
      {error && (
        <div className="error">
          <p>❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No matches found</p>
          )}
        </main>
      )}
    </div>
  );
};

export default App;
