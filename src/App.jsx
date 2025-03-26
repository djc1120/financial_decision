import { Routes, Route } from 'react-router-dom';
import MortgageCalculatorForm from './page/Mortgage.jsx';
import Investing from './page/Investing.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MortgageCalculatorForm />} />
      <Route path="/invest" element={<Investing />} />
    </Routes>
  );
}

export default App;
