import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import {
  AssetListSchema,
  EmailSchema,
  LifeListSchema,
  PersonalSchema,
} from "@/lib/schema";

const formSchema = {
  "-1": EmailSchema,
  0: PersonalSchema,
  1: AssetListSchema,
  2: LifeListSchema,
};
const useStepStore = create(
  persist(
    (set, get) => ({
      currentStep: 0,
      formData: {},
      // Function to set form data for a specific step
      setFormData: (step, field, value) =>
        set((state) => ({
          formData: {
            [step]: {
              ...state.formData[step],
              [field]: value,
            },
          },
        })),
      setFormDatas: (step, formData) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [step]: { ...formData },
          },
        })),
      setStep: (step) => set({ currentStep: step }),
      // Navigate to the next step if validation is successful
      nextStep: () => {
        const isValid = get().validateStep();
        if (isValid) {
          set((state) => ({ currentStep: state.currentStep + 1 }));
          return true;
        }
        return false;
      },
      // Navigate to the previous step
      prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      // Validation function to ensure all fields are filled
      // Validate form data for the current step
      validateStep: () => {
        const { currentStep, formData } = get();
        try {
          if (formSchema[currentStep]) {
            formSchema[currentStep].parse(formData[currentStep]);
          }

          return true; // Validation successful
        } catch (error) {
          if (error instanceof z.ZodError) {
            alert(error.errors[0].message); // Show the first validation error
          }
          return false;
        }
      },
    }),
    {
      name: "finfree-storage", // Name of the item in local storage
      getStorage: () => localStorage, // Use localStorage or sessionStorage
    }
  )
);

export default useStepStore;
