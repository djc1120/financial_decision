import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CalculationModule from '../components/CalculationModule.jsx';
import ProgressTracker from '../components/ProgressTracker';

function Investing() {

    const location = useLocation();
    const [monthlyMortgage, setMonthlyMortgage] = useState(location.state?.monthlyMortgage || "");

  const [monthlyRent, setMonthlyRent] = useState(1400);
  const [rate, setRate] = useState(10);

  const monthlyExtra = monthlyMortgage - monthlyRent;

  return (
    <div>
      <ProgressTracker currentStep={2} />
      
      <div className="w-[400px] mx-auto mt-8 p-6 bg-black rounded-xl shadow-md text-white">
      <label className="block font-medium mb-2">Monthly Mortgage</label>
      <input
        type="number"
        className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
        value={monthlyMortgage}
        onChange={(e) => setMonthlyMortgage(e.target.value)}
      />

      <label className="block font-medium mb-2">Monthly Rent</label>    
      <input
        type="number"
        className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        value={monthlyRent}
        onChange={(e) => setMonthlyRent(Number(e.target.value))}
      />

      <label className="block font-medium mb-2">Monthly Extra</label>
      <input
        className="read-only w-full p-3 mb-4 bg-gray-700 text-gray-400 rounded-lg"
        value={`${monthlyMortgage} - ${monthlyRent} = ${monthlyExtra.toFixed(2)}`}
        readOnly
      />

      <CalculationModule rate={rate} setRate={setRate} monthlyExtra={monthlyExtra} />
    </div>
      
    </div>
  );
}

export default Investing;
