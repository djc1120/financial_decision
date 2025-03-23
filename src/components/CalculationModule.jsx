import { useState } from 'react';

function CalculationModule({ rate, setRate, monthlyExtra }) {
  const [principal, setPrincipal] = useState(10000);
  const [years, setYears] = useState(30);
  const [total, setTotal] = useState(0);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseInt(years);

    const S = P * ((1 + r) ** n - 1) / r;
    setTotal(S.toFixed(0));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-black rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-4">S&P investment 💰💰</h2>

        <label className="block text-white font-medium">
          Annual Contribution ($)
        </label>
        <input
          type="text"
          value={`${monthlyExtra} X 12 = ${monthlyExtra * 12}`}
          className="read-only w-full p-3 mb-4 bg-gray-700 text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <label className="block text-white font-medium">
          Annual Interest Rate (%)
        </label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)} // Updating rate via parent
          className="w-full p-3 mb-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <label className="block text-white font-medium">
          Principal ($)
        </label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <label className="block text-white font-medium">
          Number of years
        </label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button 
          onClick={calculateCompoundInterest} 
          className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-3 rounded-lg text-lg font-bold shadow-md hover:opacity-90 transition-all">
          Calculate
        </button>
        
        <h3 className="text-center text-lg font-semibold text-white mt-4">Estimated return: <span className="text-pink-600">${total}</span></h3>
      </div>
    </div>
  );
}

export default CalculationModule;
