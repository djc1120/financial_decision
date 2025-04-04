import { useLocation } from 'react-router-dom';
// import ComparisonChart from '../components/ComparisonChart';
import HomeEquityChart from '../components/HomeEquityChart';
import ProgressTracker from './ProgressTracker.jsx';

const Compare = () => {
  const location = useLocation();
  const {
    monthlyMortgage,
    loanTerm,
    rent,
    housePrice,
    monthlyExtra,
    monthlyMortgageInterest,
    downPaymentPercent,
    annualHouseAppreciationRate,
  } = location.state || {};

//   function Compare({
//     const location = useLocation();
//     monthlyMortgage,
//     loanTerm,
//     rent,
//     housePrice,
//     monthlyExtra,
//     monthlyMortgageInterest,
//     downPaymentPercent,
//     annualHouseAppreciationRate,
//   } = location.state || {}){

  if (
    !monthlyMortgage ||
    !rent ||
    !housePrice ||
    !loanTerm ||
    !monthlyExtra ||
    !monthlyMortgageInterest ||
    !downPaymentPercent ||
    !annualHouseAppreciationRate
  ) {
    return <div className="text-white">Missing or invalid data. Please go back and recalculate.</div>;
  }


  return (
    <div className="p-4">
        <ProgressTracker currentStep={3} />

      {/* <ComparisonChart 
        monthlyMortgage={monthlyMortgage}
        housePrice={housePrice}
        loanTerm={loanTerm}
        annualInvestingGrowth={7}
        annualHouseAppreciationRate={annualHouseAppreciationRate}
        monthlyExtra={monthlyExtra}
        monthlyMortgageInterest={monthlyMortgageInterest}
      /> */}

      <HomeEquityChart 
        monthlyMortgageInterest={monthlyMortgageInterest}
        downPaymentPercent={downPaymentPercent}
        housePrice={housePrice}
        loanTerm={loanTerm}
        annualHouseAppreciationRate={annualHouseAppreciationRate}
        monthlyExtra={monthlyExtra}
        annualInvestingGrowth={7}
        monthlyMortgage={monthlyMortgage}
    />

    </div>
  );
};

export default Compare;

