import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProgressTracker from './ProgressTracker.jsx';


export default function Mortgage() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
      homePrice: "",
      downPaymentPercent: "20",
      loanTerm: "30",
      mortgageRate: "6.5",
      mortgageInsurance: "100",
      propertyTaxPercent: "0.53",
      homeInsurance: "120",
      hoaFees: "200",
      utilities: "300",
      repairCost: "",
    });
    const [monthlyPayment, setMonthlyPayment] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
    
      // If the homePrice changes, auto-calculate repairCost
      if (name === "homePrice") {
        const homePrice = parseFloat(value) || 0;
        const repairCost = (homePrice * 0.01) / 12;
    
        setForm((prev) => ({
          ...prev,
          homePrice: value,
          repairCost: repairCost.toFixed(2),
        }));
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    };
    
  
    const calculatePayment = () => {
      const homePrice = parseFloat(form.homePrice);
      const downPayment = (parseFloat(form.downPaymentPercent) / 100) * homePrice;
      const loanAmount = homePrice - downPayment;
      const monthlyMortgageInterest = parseFloat(form.mortgageRate) / 100 / 12;
      const numberOfPayments = parseInt(form.loanTerm) * 12;
      const repairCost = homePrice * 0.01 / 12;
  
      const monthlyPrincipalAndInterest =
        (loanAmount * monthlyMortgageInterest) /
        (1 - Math.pow(1 + monthlyMortgageInterest, -numberOfPayments));
  
      const propertyTaxes = ((parseFloat(form.propertyTaxPercent) / 100) * homePrice) / 12;
  
      const total =
        monthlyPrincipalAndInterest +
        parseFloat(form.mortgageInsurance || 0) +
        propertyTaxes +
        parseFloat(form.homeInsurance || 0) +
        parseFloat(form.hoaFees || 0) +
        parseFloat(form.utilities || 0) +
        parseFloat(form.repairCost || 0);
  
      setMonthlyPayment(total.toFixed(2));
    };
  
    const handleNext = () => {
      navigate('/rent', {
        state: {
          monthlyMortgage: parseFloat(monthlyPayment),
          loanTerm: parseInt(form.loanTerm),
          housePrice: parseFloat(form.homePrice),
          monthlyMortgageInterest: parseFloat(form.mortgageRate/1200),
          downPaymentPercent: parseFloat(form.downPaymentPercent),
        },
      });
    };

  return (
    <div>
      <ProgressTracker currentStep={1} />

      <div className="w-[400px] mx-auto mt-8 p-6 bg-black rounded-xl shadow-md text-white">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Mortgage Calculator</h2>

          {[
            { label: "Home Price", name: "homePrice", placeholder: "Enter house price" },
            { label: "Down Payment (%)", name: "downPaymentPercent", placeholder: "20" },
            { label: "Loan Term (years)", name: "loanTerm", placeholder: "30000" },
            { label: "Interest Rate (%)", name: "mortgageRate", placeholder: "6.5" },
            { label: "Mortgage Insurance (monthly)", name: "mortgageInsurance", placeholder: "100" },
            { label: "Property Tax (%)", name: "propertyTaxPercent", placeholder: "0.53" },
            { label: "Home Insurance (monthly)", name: "homeInsurance", placeholder: "120" },
            { label: "HOA Fees (monthly)", name: "hoaFees", placeholder: "200" },
            { label: "Utilities (monthly)", name: "utilities", placeholder: "300" },
            { label: "Anticipated repair cost (monthly)", name: "repairCost", placeholder: "0.08% house price" },
          ].map(({ label, name, placeholder }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-1 font-medium">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type="number"
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="rounded-md text-white"
              />
            </div>
          ))}

      </div>

      <button
        onClick={calculatePayment}
        className={`mt-8 w-full py-2 px-4 rounded-md
                  ${monthlyPayment
                  ? `text-white border-1 border-neutral-300`
                  : 'text-black bg-neutral-300'
                  }`}
      >
        {monthlyPayment ? "Re-calculate" : "Calculate"}
      </button>

      {monthlyPayment && (
        <>
          <div className="mt-8 text-xs text-left">
            Estimated Monthly Payment
          </div>
          <div className="pt-2 text-xl font-bold text-gray-200 text-left">
            💰 {monthlyPayment}
          </div>
          <br/>
          <button onClick={handleNext} className="text-black bg-neutral-300 mt-6 w-full px-4 rounded-md">
            Continue
          </button>
        </>
      )}

      
    </div>

    </div>
  );
}

