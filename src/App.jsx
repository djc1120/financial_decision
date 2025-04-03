import { Routes, Route } from 'react-router-dom';
import Mortgage from './page/Mortgage.jsx';
import Investing from './page/Investing.jsx';
import MonthlyRent from './page/MonthlyRent.jsx';
import Compare from './page/Compare.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mortgage />} />
      <Route path="/rent" element={<MonthlyRent />} />
      <Route path="/invest" element={<Investing />} />
      <Route path="/compare" element={<Compare />} />
    </Routes>
  );
}

export default App;
