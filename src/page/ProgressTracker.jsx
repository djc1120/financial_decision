import React from 'react';
import { Link } from "react-router-dom";

const steps = [
    { id: 1, name: 'Mortgage', path: '/' },
    { id: 2, name: 'Rent', path: '/rent' },
    { id: 3, name: 'Investing', path: '/compare' },
  ];

function ProgressTracker({ currentStep }) {

  return (
    <div className="flex justify-center mb-8">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center">

                <div
                className={`w-8 h-8 min-w-8 min-h-8 flex items-center justify-center rounded-full font-bold text-sm border-2 flex justify-center
                    ${
                    isCompleted
                        ? 'bg-transparent text-white border-gray-300'
                        : isActive
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-gray-300 border-gray-300'
                    }`}
                >
                {/* {isCompleted ? '✓' : step.id} */}
                    {step.id}
                </div>

                <div>
                  <Link
                    to={step.path}
                    className={`ml-2 mr-4 text-sm !text-white ${isActive ? 'font-medium' : 'text-gray-500 !underline'}`}
                  >
                    {step.name}
                  </Link>
                </div>
                
            
            {index !== steps.length - 1 && (
              <div className="ml-0 w-10 max-w-sm h-0.5 bg-gray-400 mr-4 rounded"></div>
            )}

          </div>
        );
      })}

    </div>

  );
}

export default ProgressTracker;