import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import './css/App.css'
import './css/Style.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { FormProvider } from './context/FormContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FormProvider>
        <App />
      </FormProvider>
    </BrowserRouter>
  </StrictMode>,
)
