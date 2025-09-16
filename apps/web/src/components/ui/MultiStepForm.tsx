import React from "react";

interface FormStep {
  id: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface MultiStepFormProps {
  steps: FormStep[];
  currentStep: number;
  children: React.ReactNode;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  currentStep,
  children,
}) => {
  return (
    <div className="multistep-form">
      {/* Progress Header */}
      <div className="multistep-header">
        <div className="multistep-progress">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`multistep-step ${
                step.isCompleted ? "multistep-step--completed" : ""
              } ${step.isActive ? "multistep-step--active" : ""}`}
            >
              <div className="multistep-step__number">
                {step.isCompleted ? "✓" : step.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="multistep-content">{children}</div>
    </div>
  );
};

export default MultiStepForm;
