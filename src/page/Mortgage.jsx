import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';

export default function MortgageCalculatorForm() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
      homePrice: "",
      downPaymentPercent: "20",
      loanTerm: "30",
      interestRate: "6.5",
      mortgageInsurance: "100",
      propertyTaxPercent: "0.53",
      homeInsurance: "120",
      hoaFees: "200",
      utilities: "300",
    });
    const [monthlyPayment, setMonthlyPayment] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const calculatePayment = () => {
      const homePrice = parseFloat(form.homePrice);
      const downPayment = (parseFloat(form.downPaymentPercent) / 100) * homePrice;
      const loanAmount = homePrice - downPayment;
      const monthlyInterest = parseFloat(form.interestRate) / 100 / 12;
      const numberOfPayments = parseInt(form.loanTerm) * 12;
  
      const monthlyPrincipalAndInterest =
        (loanAmount * monthlyInterest) /
        (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));
  
      const propertyTaxes = ((parseFloat(form.propertyTaxPercent) / 100) * homePrice) / 12;
  
      const total =
        monthlyPrincipalAndInterest +
        parseFloat(form.mortgageInsurance || 0) +
        propertyTaxes +
        parseFloat(form.homeInsurance || 0) +
        parseFloat(form.hoaFees || 0) +
        parseFloat(form.utilities || 0);
  
      setMonthlyPayment(total.toFixed(2));
    };
  
    const handleNext = () => {
      navigate('/invest', {
        state: {
          monthlyMortgage: parseFloat(monthlyPayment),
          loanTerm: parseInt(form.loanTerm),
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
          { label: "Interest Rate (%)", name: "interestRate", placeholder: "6.5" },
          { label: "Mortgage Insurance (monthly)", name: "mortgageInsurance", placeholder: "100" },
          { label: "Property Tax (%)", name: "propertyTaxPercent", placeholder: "0.53" },
          { label: "Home Insurance (monthly)", name: "homeInsurance", placeholder: "120" },
          { label: "HOA Fees (monthly)", name: "hoaFees", placeholder: "200" },
          { label: "Utilities (monthly)", name: "utilities", placeholder: "300" },
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


        <button
          onClick={calculatePayment}
          className="mt-4 w-full bg-neutral-300 text-black py-2 px-4 rounded-md"
        >
          {monthlyPayment ? "Re-calculate" : "Calculate"}
        </button>

        {monthlyPayment && (
          <>
            <div className="mt-4 text-xs">
              Estimated Monthly Payment:
            </div>
            <div className="text-xl font-bold text-white">
            💰 {monthlyPayment}
            </div>
            <br/>
            <button
              onClick={handleNext}
              className="bg-neutral-300 mt-2 w-full text-black py-2 px-4 rounded-md size-12 animate-bounce ..."
            >
              Next: Compare with S&P Investment
            </button>
          </>
        )}

        {!monthlyPayment && (
          <>
            <div className="mt-4 text-xs font-semibold">
              Estimated Monthly Payment:
            </div>
            <div className="mt-4 text-lg font-semibold text-white">
                ??
            </div>
            <button
              onClick={handleNext}
              className="mt-2 w-full text-white py-2 px-4 rounded-md border-1 border-neutral-300"
            >
              I know my monthly mortgage
            </button>
          </>
        )}

      </div>
    </div>

    </div>
  );
}

