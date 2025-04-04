import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

function HomeEquityChart({
    monthlyMortgageInterest,
    downPaymentPercent,
    housePrice,
    loanTerm,
    annualHouseAppreciationRate,
    monthlyExtra,
    annualInvestingGrowth,
    monthlyMortgage,
}) {
  // Initial calculations
  const loanAmount = housePrice * (1 - downPaymentPercent/100);      // initial principal
  const totalMonths = loanTerm * 12;
  // Monthly principal & interest payment (fixed)
  const monthlyPI = loanAmount * (monthlyMortgageInterest * Math.pow(1 + monthlyMortgageInterest, totalMonths)) 
                   / (Math.pow(1 + monthlyMortgageInterest, totalMonths) - 1);

  // Prepare data points for home equity for every 5-year interval
  const data = [];
  for (let year = 0; year <= loanTerm; year += 5) {
    const m = year * 12;  // number of payments made by this year
    // Current home value after appreciation for 'year' years
    const currentHouseValue = housePrice * Math.pow(1 + annualHouseAppreciationRate, year);
    // Remaining loan principal after m payments (amortization formula)
    let remainingPrincipal;
    if (m === 0) {
      remainingPrincipal = loanAmount;
    } else {
      remainingPrincipal = loanAmount * Math.pow(1 + monthlyMortgageInterest, m) 
                         - (monthlyPI / monthlyMortgageInterest) * (Math.pow(1 + monthlyMortgageInterest, m) - 1);
    }
    const equity = currentHouseValue - remainingPrincipal;
    data.push({
      year: year,
      equity: Math.round(equity)  // round to nearest dollar
    });
  }

  // Prepare S&P investment data using useMemo for performance (memoizes to avoid recalculating on every render)
  const data2 = useMemo(() => {
    const r = annualInvestingGrowth / 100;
    const downPayment = 0.20 * housePrice;
    const loanAmount = housePrice - downPayment;
    const totalMonths = loanTerm * 12;

    const equityTable = [];
    let remainingLoan = loanAmount;
    let spBalance = 0;

    for (let year = 0; year <= loanTerm; year += 5) {
      let houseValue = housePrice * (1 + annualHouseAppreciationRate) ** year;

      // Simulate payments for this year range
      const months = Math.min((year * 12), totalMonths);

      let equity = downPayment;
      let balance = loanAmount;
      for (let i = 0; i < months; i++) {
        const interestPayment = balance * monthlyMortgageInterest;
        const monthlyPrincipal = monthlyMortgage - interestPayment;
        equity += monthlyPrincipal;
        balance -= monthlyPrincipal;
      }

      // S&P investment calculation
      const annualContribution = monthlyExtra * 12;
        let spTotal = 0;

        for (let y = 1; y <= year; y++) {
        const isFirstYear = y === 1;
        const contribution = annualContribution + (isFirstYear ? 80000 : 0);
        spTotal += contribution * ((1 + r) ** (year - y));
        }

      equityTable.push({
        year,
        "S&P Investment": Math.round(spTotal),
      });
      
    }
    return equityTable;
  }, [monthlyMortgage, monthlyExtra, housePrice, loanTerm, annualInvestingGrowth, annualHouseAppreciationRate, monthlyMortgageInterest]);

  // Merge the two datasets (Home Equity and S&P Investment) by year
  const mergedData = data.map(homeEntry => {
    const year = homeEntry.year;
    const spEntry = data2.find(item => item.year === year);
    return {
      year: year,
      equity: homeEntry.equity,
      "S&P Investment": spEntry ? spEntry["S&P Investment"] : 0  // Default to 0 if no data
    };
  });

  return (
    <div className="max-w-xl mx-auto rounded-xl">
    {/* <div className="max-w-xl mx-auto rounded-xl bg-white p-6 shadow-lg"> */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Home Equity Vs. S&P Investment
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mergedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            ticks={[0, 5, 10, 15, 20, 25, 30]} 
            tickFormatter={(year) => `${year} yrs`} 
          />
          <YAxis 
            tickFormatter={(value) => `$${Math.round(value / 1000)}k`} 
            width={80} 
          />
          <Tooltip 
            formatter={(value) => 
              `$${Number(value).toLocaleString()}`} 
            labelFormatter={(label) => `Year ${label}`} 
          />
          <Legend />
          {/* Line for Home Equity */}
          <Line 
            type="monotone" 
            dataKey="equity" 
            name="Home Equity" 
            stroke="#4f46e5"       /* Tailwind indigo-600 color */
            strokeWidth={3} 
            dot={{ r: 4, fill: '#4f46e5' }} 
          />
          {/* Line for S&P Investment */}
          <Line 
            type="monotone" 
            dataKey="S&P Investment" 
            name="S&P Investment" 
            stroke="#82ca9d" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#82ca9d' }} 
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-2 text-sm text-gray-500">
        S&P Investment: assuming contributing monthly extra (monthly mortgage - rent)
      </p>
    </div>
  );
}

export default HomeEquityChart;
