import { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function ComparisonChart({ 
  monthlyMortgage, 
  housePrice, 
  loanTerm, 
  annualInvestingGrowth, 
  monthlyExtra,
  monthlyMortgageInterest,
  annualHouseAppreciationRate,
}) {
  const data = useMemo(() => {
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

        // let equity = downPayment;
        // let balance = loanAmount;
        // for (let i = 0; i < months; i++) {
        //     const interestPayment = balance * monthlyMortgageInterest;
        //     const monthlyPrincipal = monthlyMortgage - interestPayment;
        //     equity = 
        //     balance -= monthlyPrincipal;
        // }


      // S&P investment
      const annualContribution = monthlyExtra * 12;
      let spTotal = 0;
      for (let y = 1; y <= year; y++) {
        spTotal += annualContribution * ((1 + r) ** (year - y));
      }




      equityTable.push({
        year,
        "Home Equity": Math.round(equity),
        "S&P Investment": Math.round(spTotal),
        "House Value": Math.round(houseValue)

      });
      
    }

    return equityTable;
  }, [monthlyMortgage, monthlyExtra, housePrice, loanTerm, annualInvestingGrowth, annualHouseAppreciationRate, monthlyMortgageInterest]);



  return (
    <div className="w-full h-[400px] mt-8">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Line type="monotone" dataKey="Home Equity" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="S&P Investment" stroke="#82ca9d" strokeWidth={4} />
          <Line type="monotone" dataKey="House Value" stroke="#000000" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


export default ComparisonChart;





