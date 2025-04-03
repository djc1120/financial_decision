import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import compare from "../assets/compare.svg";
import CalculationModule from '../components/CalculationModule.jsx';
import ProgressTracker from './ProgressTracker.jsx';


function Investing() {

  const location = useLocation();
  const [monthlyMortgage, setMonthlyMortgage] = useState(location.state?.monthlyMortgage || "");

  const [monthlyRent, setMonthlyRent] = useState(location.state?.rent || "");
  const [rate, setRate] = useState(10);

  const monthlyExtra =
  monthlyMortgage && monthlyRent
    ? Number(monthlyMortgage) - Number(monthlyRent)
    : 0;

  const housePrice = location.state?.housePrice;
  const formattedHousePrice = housePrice
  ? "$" + housePrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  : "";

  const term = location.state.term;
  

  return (
    <div>
      <ProgressTracker currentStep={3} />

      <div className="w-[400px] mx-auto mt-8 p-6 bg-black rounded-xl shadow-md text-white">

        <Link
          to='/'
          className={`ml-2 mr-4 text-sm 'text-gray-500' hover:underline flex pb-6 !text-white`}
          >
          &lt; Back
        </Link>

        <div className={`w-full max-w-md ${
            monthlyMortgage ? 'p-6 bg-white/10 rounded-2xl shadow-lg' : ''
            }`}>
          { monthlyMortgage && (
            <div>
              <p className="flex pb-8 text-white/40">Inherited from the previous step...</p>
              <div className="flex justify-center">
                <img src={compare} alt="comparison" className="h-[150px] w-auto pb-6" />
              </div>
              {/* <p className="text-center text-lg font-semibold text-gray-400 pb-8">house price: {formattedHousePrice}</p> */}
            </div>
          )}

          <label className="block font-medium mb-2">Monthly Mortgage (house price: {formattedHousePrice})</label>
          <input
              type="text"
              className="w-full p-3 mb-4 rounded read-only"
              value={`$${monthlyMortgage}`}
              onChange={(e) => setMonthlyMortgage(e.target.value)}
              placeholder="Enter monthly mortgage"
              disabled
          />

          

          <label className="block font-medium mb-2">Monthly Rent (average over {term} years)</label>    
          <input
              type="text"
              className="w-full p-3 mb-4 rounded bg-gray-700 text-white read-only"
              value={`$${monthlyRent}`}
              onChange={(e) => setMonthlyRent(e.target.value)}
              placeholder=""
              disabled
          />

          <label className="block font-medium mb-2">Monthly Extra</label>
          <input
              className={`read-only w-full p-3 mb-4 bg-gray-700 rounded-lg
              ${
                  monthlyExtra > 0 
                  ? 'text-gray-400'
                  : 'text-red-400'
              }`}
              value={
                  monthlyMortgage && monthlyRent
                  ? `${monthlyMortgage} - ${monthlyRent} = $${monthlyExtra.toFixed(0)}`
                  : ''
              }
              disabled
              placeholder="Enter above fields"
          />
        </div>

        <CalculationModule rate={rate} setRate={setRate} monthlyExtra={monthlyExtra} />



      </div>
      
    </div>
  );
}

export default Investing;
