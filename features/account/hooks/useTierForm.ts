import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";

export type StepFields<T extends FieldValues> = Array<Path<T>>;

export type UseTierFormOptions<T extends FieldValues> = {
  schema: any;
  defaultValues: DefaultValues<T>;
  totalSteps: number;
  stepFields: Record<number, StepFields<T>>;
};

export type UseTierFormResult<T extends FieldValues> = {
  form: UseFormReturn<T>;
  activeStep: number;
  setActiveStep: (s: number) => void;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  scrollViewRef: React.RefObject<ScrollView | null>;
};

export function useTierForm<T extends FieldValues>(
  opts: UseTierFormOptions<T>
): UseTierFormResult<T> {
  const { schema, defaultValues, totalSteps, stepFields } = opts;

  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const [activeStep, setActiveStep] = useState(1);
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [activeStep]);

  const getFieldsForStep = (step: number): Path<T>[] => {
    return stepFields[step] || [];
  };

  const handleNext = async () => {
    const fields = getFieldsForStep(activeStep);
    const isValid = await form.trigger(fields);
    if (!isValid) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }
    if (activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  return {
    form,
    activeStep,
    setActiveStep,
    handleNext,
    handleBack,
    scrollViewRef,
  };
}
