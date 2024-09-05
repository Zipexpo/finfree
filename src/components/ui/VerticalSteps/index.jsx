'use client'
import useStepStore from '@/store/useStepStore';
import React, { Children } from 'react';
import "./index.scss";
import CheckMark from '@/components/icons/Checkmark';

const VerticalSteps = ({children}) => {
  const { currentStep, setStep, nextStep, prevStep } = useStepStore();

  return (
    <div className="flex flex-col">
      <div className="steps w-full">
        <ul className="steps-list">
          {Children.map(children,(child, index) => (
            <li key={index} className={`steps-list-item ${(index<currentStep)?'success':''} ${(currentStep===index)?'active':''}`}
            onClick={() => setStep(index)}>
                <span></span>
              {/* <button
                className={`text-left p-2 w-full ${
                  currentStep === step ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setStep(step)}
              > */}
                <CheckMark className="checked"/>
                {(currentStep===index)?(`Step ${index+1}`):""}
              {/* </button> */}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full p-4">
        {Children.map(children,(child, index) => (
          <div key={index} className={`${currentStep === index ? 'block' : 'hidden'}`}>
            {child}
            <div className="flex justify-between">
              <button
                className="bg-gray-200 p-2"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button
                className="bg-blue-500 text-white p-2"
                onClick={nextStep}
                disabled={currentStep === (children??[]).length}
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