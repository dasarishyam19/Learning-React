import { useState } from 'react';

/**
 * A custom hook to manage multi-step form transitions
 * @param {Array<React.ReactNode>} steps - An array of React elements representing each step
 */
export const useMultiStepForm = (steps) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function next() {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function back() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    function goTo(index) {
        if (index >= 0 && index < steps.length) {
            setCurrentStepIndex(index);
        }
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back,
    };
};
