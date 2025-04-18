import { useFormData } from '../context/FormContext';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ProgressTracker from './ProgressTracker.jsx';
import { useNavigate } from 'react-router-dom';

export default function MonthlyRent() {
    const navigate = useNavigate();
    const { formData, setFormData } = useFormData();

    const {
        monthlyMortgage,
        loanTerm,
        housePrice,
        monthlyMortgageInterest,
        downPaymentPercent,
    } = formData;


    // const [rent, setRent] = useState("");
    const [rent, setRent] = useState(formData.rentInput || "");


    const annualHouseAppreciationRate = 0.03; // 3%
    const initialRent = parseFloat(rent);

    const average30YearRent = !isNaN(initialRent) && !isNaN(loanTerm)
    ? (initialRent / loanTerm) *
        ((1 + annualHouseAppreciationRate) ** loanTerm - 1) / annualHouseAppreciationRate
    : 0;

    const monthlyExtra =
    monthlyMortgage && average30YearRent
        ? Number(monthlyMortgage) - Number(average30YearRent)
        : 0;



    if (
        !monthlyMortgage ||
        !loanTerm ||
        !housePrice ||
        !monthlyMortgageInterest ||
        !downPaymentPercent
        ) {
            return (
                <>
                    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-16">
                        <ProgressTracker currentStep={2} />
                    </div>
                    <div className="text-white">
                        You need to complete previous step.
                    </div>
                </>
              );
            }

    
        const handleNext = () => {
            setFormData((prev) => ({
              ...prev,
              rent: parseFloat(average30YearRent.toFixed(0)),
              monthlyExtra: parseFloat(monthlyExtra),
            annualHouseAppreciationRate,
            }));
        
            navigate('/compare');
          };

          
    return (
        <div className="flex flex-col gap-y-4 p-8">
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 pt-16 bg-[#272727]">
                <ProgressTracker currentStep={2} />
            </div>
            <div className="sm:w-screen max-w-md mt-32 p-6 bg-black rounded-xl shadow-md text-white">

                <label className="block font-medium mb-2">Current monthly rent</label>
                <input
                    type="number"
                    className="w-full p-3 mb-2 rounded bg-gray-800 text-white"
                    value={rent}
                    onChange={(e) => {
                        const value = e.target.value;
                        setRent(value); // local state (so it stays live in the input)
                        setFormData((prev) => ({
                        ...prev,
                        rentInput: value, // save typed value to context
                        }));
                    }}
                    placeholder="Enter monthly rent"
                />

                {rent && !isNaN(average30YearRent) && (
                    <>
                        <div className="mt-8 text-xs text-gray-200 text-left">
                        Avg rent over {loanTerm} years
                        </div>
                        <div className="pt-2 text-xl font-bold text-gray-200 text-left">
                            💰 <strong>$ {average30YearRent.toFixed(0)}</strong>
                        </div>
                    </>  
                    
                )}

                <button
                    onClick={() => {handleNext()
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
