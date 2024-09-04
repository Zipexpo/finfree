'use client'
import useStepStore from '@/store/useStepStore';
import React from 'react';
import "./index.scss";

const steps = [
  { step: 1, title: 'Step 1', content: 'Content for Step 1' },
  { step: 2, title: 'Step 2', content: 'Content for Step 2' },
  { step: 3, title: 'Step 3', content: 'Content for Step 3' },
];

const VerticalSteps = () => {
  const { currentStep, setStep, nextStep, prevStep } = useStepStore();

  return (
    <div className="flex flex-col">
      <div className="steps w-full">
        <ul className="steps-list">
          {steps.map(({ step, title }) => (
            <li key={step} className="steps-list-item">
                <span></span>
              {/* <button
                className={`text-left p-2 w-full ${
                  currentStep === step ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setStep(step)}
              > */}
                {title}
              {/* </button> */}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4 border-l">
        {steps.map(({ step, content }) => (
          <div key={step} className={`${currentStep === step ? 'block' : 'hidden'}`}>
            <h2 className="text-2xl mb-4">{content}</h2>
            <div className="flex justify-between">
              <button
                className="bg-gray-200 p-2"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                className="bg-blue-500 text-white p-2"
                onClick={nextStep}
                disabled={currentStep === steps.length}
              >
                Next
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalSteps;