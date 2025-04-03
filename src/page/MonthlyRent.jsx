import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ProgressTracker from './ProgressTracker.jsx';
import { useNavigate } from 'react-router-dom';

export default function MonthlyRent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { monthlyMortgage, loanTerm, housePrice, monthlyMortgageInterest, downPaymentPercent } = location.state || {};

    const [mortgage, setMortgage] = useState(monthlyMortgage || "");
    const [price, setPrice] = useState(housePrice || "");
    const [rent, setRent] = useState("");

    const annualHouseAppreciationRate = 0.03; // 3%
    const initialRent = parseFloat(rent);

    const termNumber = parseInt(loanTerm);

    const average30YearRent = !isNaN(initialRent) && !isNaN(termNumber)
    ? (initialRent / termNumber) *
        ((1 + annualHouseAppreciationRate) ** termNumber - 1) / annualHouseAppreciationRate
    : 0;

    const monthlyExtra =
    monthlyMortgage && average30YearRent
        ? Number(monthlyMortgage) - Number(average30YearRent)
        : 0;


console.log(loanTerm);

    return (
        <div>
            <ProgressTracker currentStep={2} />
            <div className="w-[400px] mx-auto mt-8 p-6 bg-black rounded-xl shadow-md">

                <label className="block font-medium mb-2">Current monthly rent</label>
                <input
                    type="number"
                    className="w-full p-3 mb-2 rounded bg-gray-800 text-white"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    placeholder="Enter monthly rent"
                />

                {rent && !isNaN(average30YearRent) && (
                    <>
                        <div className="mt-8 text-xs text-gray-200 text-left">
                        Avg rent over {termNumber} years
                        </div>
                        <div className="pt-2 text-xl font-bold text-gray-200 text-left">
                            💰 <strong>$ {average30YearRent.toFixed(0)}</strong>
                        </div>
                    </>  
                    
                )}

                <button
                    onClick={() => {
                        navigate('/compare', {
                            state: {
                                monthlyMortgage: parseFloat(mortgage),
                                loanTerm: parseInt(termNumber),
                                housePrice: parseFloat(price),
                                rent: parseFloat(average30YearRent.toFixed(0)),
                                monthlyExtra: parseFloat(monthlyExtra),
                                monthlyMortgageInterest: parseFloat(monthlyMortgageInterest),
                                downPaymentPercent: parseFloat(downPaymentPercent),
                                annualHouseAppreciationRate: parseFloat(annualHouseAppreciationRate),
                            },
                        });
                    }}
                    className={`mt-10 w-full bg-neutral-300 text-black py-2 px-4 rounded-md
                        ${rent
                        ? 'animate-bounce'
                        : ``
                        }`}
                >
                    Compare with S&P Investment
                </button>
                
            </div>

        </div>
    );
}
