"use client";
import useStepStore from "@/store/useStepStore";
import React, { Children } from "react";
import "./index.scss";
import CheckMark from "@/components/icons/Checkmark";

const VerticalSteps = ({ children }) => {
  const { currentStep, setStep, nextStep, prevStep } = useStepStore();
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (
      child.props.prevStep &&
      child.props.nextStep &&
      child.props.backable !== undefined &&
      child.props.nextable !== undefined
    ) {
      return child; // No need to clone if prop already exists
    }
    return (
      <div
        key={index}
        className={`h-full ${currentStep === index ? "block" : "hidden"}`}
      >
        {React.cloneElement(child, {
          ...child.props, // Preserve existing props
          prevStep: child.props.prevStep || prevStep,
          backable: child.props.backable || currentStep === 0,
          nextStep: child.props.nextStep || nextStep,
          nextable:
            child.props.backable || currentStep === (children ?? []).length,
        })}
      </div>
    );
  });
  return (
    <div className="flex flex-col h-full">
      <div className="steps w-full">
        <ul className="steps-list">
          {Children.map(children, (child, index) => (
            <li
              key={index}
              className={`steps-list-item ${
                index < currentStep ? "success" : ""
              } ${currentStep === index ? "active" : ""}`}
              onClick={() => setStep(index)}
            >
              <span></span>
              {/* <button
                className={`text-left p-2 w-full ${
                  currentStep === step ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setStep(step)}
              > */}
              <CheckMark className="checked" />
              {currentStep === index ? `Step ${index + 1}` : ""}
              {/* </button> */}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full p-4 flex-1">{childrenWithProps}</div>
    </div>
  );
};

export default VerticalSteps;
