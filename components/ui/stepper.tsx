import React, { createContext, useContext } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { cn } from "@/lib/utils";

// Context for stepper state
interface StepperContextType {
  activeStep: number;
  totalSteps: number;
  setActiveStep: (step: number) => void;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper");
  }
  return context;
};

// Main Stepper Container
interface StepperProps {
  activeStep: number;
  onStepChange: (step: number) => void;
  children: React.ReactNode;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  activeStep,
  onStepChange,
  children,
  className = "",
}) => {
  // Count total steps by looking at StepperStep children
  const childrenArray = React.Children.toArray(children);
  const stepChildren = childrenArray.filter(
    (child) => React.isValidElement(child) && child.type === StepperSteps
  );
  const totalSteps =
    stepChildren.length > 0 && React.isValidElement(stepChildren[0])
      ? React.Children.count(
          (stepChildren[0] as React.ReactElement<StepperStepsProps>).props
            .children
        )
      : 0;

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        totalSteps,
        setActiveStep: onStepChange,
      }}
    >
      <View className={`${className}`}>{children}</View>
    </StepperContext.Provider>
  );
};

// Steps Container
interface StepperStepsProps {
  children: React.ReactNode;
  className?: string;
}

export const StepperSteps: React.FC<StepperStepsProps> = ({
  children,
  className = "",
}) => {
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      {children}
    </View>
  );
};

// Individual Step
interface StepperStepProps {
  step: number;
  children?: React.ReactNode;
  className?: string;
  showConnector?: boolean;
  name?: string;
}

export const StepperStep: React.FC<StepperStepProps> = ({
  step,
  children,
  className = "",
  showConnector = true,
  name,
}) => {
  const { activeStep, totalSteps, setActiveStep } = useStepperContext();
  const isActive = activeStep >= step;
  const isCompleted = activeStep > step;

  const getConnectorWidth = () => {
    if (totalSteps <= 2) return "w-28";
    if (totalSteps === 3) return "w-28";
    if (totalSteps === 4) return "w-24";
    return "w-28";
  };

  const connectorWidth = getConnectorWidth();

  return (
    <>
      <View className={`flex-column justify-center items-center ${className}`}>
        {/* Step Circle */}
        <TouchableOpacity
        //   onPress={() => setActiveStep(step)}
          className='z-10 overflow-hidden rounded-full'
        >
          <View
            className={cn(
              `w-7 h-7 rounded-full items-center justify-center border border-primary`,
              isCompleted
                ? "bg-primary"
                : isActive
                  ? "bg-primary-foreground outline-2 outline-primary/20"
                  : "bg-primary-foreground border-grey-300"
            )}
          >
            {children ? (
              children
            ) : (
              <View
                className={cn(
                  `w-2 h-2 rounded-full items-center justify-center`,
                  isCompleted
                    ? "bg-primary-foreground"
                    : isActive
                      ? "bg-primary"
                      : "bg-grey-300"
                )}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {step < totalSteps && showConnector && (
        <View
          className={`h-[2px] w-40 ${connectorWidth} bg-grey-300`}
        />
      )}
    </>
  );
};

// Content Container
interface StepperContentProps {
  children: React.ReactNode;
  className?: string;
}

export const StepperContent: React.FC<StepperContentProps> = ({
  children,
  className = "",
}) => {
  return <View className={`${className}`}>{children}</View>;
};

// Individual Step Content
interface StepperStepContentProps {
  step: number;
  children: React.ReactNode;
  className?: string;
}

export const StepperStepContent: React.FC<StepperStepContentProps> = ({
  step,
  children,
  className = "",
}) => {
  const { activeStep } = useStepperContext();

  if (activeStep !== step) return null;

  return <View className={`${className}`}>{children}</View>;
};

// Export all components
export default {
  Stepper,
  StepperSteps,
  StepperStep,
  StepperContent,
  StepperStepContent,
};
