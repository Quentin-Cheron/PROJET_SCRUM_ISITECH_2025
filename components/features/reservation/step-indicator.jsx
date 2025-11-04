import { Check } from "lucide-react";

export default function StepIndicator({ currentStep, totalSteps, steps }) {
  return (
    <div className="w-full py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div key={stepNumber} className="flex items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      font-semibold text-sm transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-primary text-white"
                          : isActive
                            ? "bg-primary text-white"
                            : "bg-gray-200"
                      }
                    `}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                  </div>

                  {/* Step Label */}
                  <div className="mt-2 text-center hidden sm:block">
                    <p
                      className={`
                        text-xs font-medium whitespace-nowrap
                        ${isActive || isCompleted ? "text-gray-900" : "text-gray-500"}
                      `}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 px-2">
                    <div
                      className={`
                        h-1 rounded-full transition-all duration-300
                        ${isCompleted ? "bg-black" : "bg-gray-200"}
                      `}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Step Label */}
        <div className="sm:hidden text-center mt-4">
          <p className="text-sm font-medium text-gray-900">
            {steps[currentStep - 1]?.label}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Étape {currentStep} sur {totalSteps}
          </p>
        </div>
      </div>
    </div>
  );
}
