import { useState } from 'react';
import CalculationModule from './components/CalculationModule.jsx';

function App() {
  const [rate, setRate] = useState(10);
  const [monthlyRent, setMonthlyRent] = useState(1400);
  const [monthlyMortgage, setMonthlyMortgage] = useState(2500);
  const monthlyExtra = monthlyMortgage - monthlyRent;

  return (
    <>
      <label className="text-white">Monthly mortgage</label>
      <input 
        className="text-white w-full p-3 mb-4"
        value={monthlyMortgage}
        onChange={(e) => setMonthlyMortgage(e.target.value)}
      />

      <label className="text-white">Monthly rent</label>
      <input 
        className="text-white w-full p-3 mb-4" 
        value={monthlyRent}
        onChange={(e) => setMonthlyRent(e.target.value)}
      />

      <label className="text-white">Monthly extra</label>
      <input 
        className="read-only w-full p-3 mb-4 bg-gray-700 text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        value= {`${monthlyMortgage} - ${monthlyRent} = ${monthlyMortgage - monthlyRent}`}
      />

      <br/>


      <CalculationModule rate={rate} setRate={setRate} monthlyExtra={monthlyExtra} />


    </>
  );
}

export default App;
