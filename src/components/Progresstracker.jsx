import React from 'react';

const steps = [
  { id: 1, name: 'Monthly Mortgage' },
  { id: 2, name: 'S&P Investing' },
];

export default function ProgressTracker({ currentStep }) {
    

  return (
    <div className="flex justify-center items-center mb-8">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
                ${isCompleted ? 'bg-gray-500 text-white' :
                isActive ? 'bg-white text-black' :
                'bg-gray-300 text-gray-600'}`}
            >
              {isCompleted ? '✓' : step.id}
            </div>
            <span className={`ml-2 mr-4 text-sm ${isActive ? 'text-white font-medium' : 'text-gray-500'}`}>
              {step.name}
            </span>
            {index !== steps.length - 1 && (
              <div className="w-8 h-1 bg-gray-400 mx-2 rounded"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
