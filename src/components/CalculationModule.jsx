import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function CalculationModule({ rate, setRate, monthlyExtra }) {
  
  const location = useLocation();

  const [years, setYears] = useState(location.state?.loanTerm);
  const [total, setTotal] = useState('?');

  const calculateCompoundInterest = () => {
    const P = parseFloat(monthlyExtra) * 12;
    const r = parseFloat(rate) / 100;
    const n = parseInt(years);

    const S = P * ((1 + r) ** n - 1) / r;
    const formattedS = "$" + S.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setTotal(formattedS);
  };

  return (
    <div className="pt-10 flex items-center justify-center">
      <div className="bg-black rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-4">S&P investment 📈</h2>

        <label className="block text-white font-medium">
          Annual Contribution ($)
        </label>
        <input
          type="text"
          value={`${monthlyExtra.toFixed(2)} X 12 = ${monthlyExtra.toFixed(2) * 12}`}
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

        {/* <label className="block text-white font-medium">
          Principal ($)
        </label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        /> */}

        <label className="block text-white font-medium">
          Number of years
        </label>
        <input
          type="number"
          value={years}
          className="w-full p-3 mb-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 read-only"
        />

        <button 
          onClick={calculateCompoundInterest} 
          className="mt-4 mb-6 w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg text-lg font-bold shadow-md hover:opacity-90 transition-all">
          Calculate
        </button>
        
        <h3 className="text-center text-lg font-semibold text-white mt-4">Estimated return: <span className="text-pink-600">{total}</span></h3>
      </div>
    </div>
  );
}

export default CalculationModule;
