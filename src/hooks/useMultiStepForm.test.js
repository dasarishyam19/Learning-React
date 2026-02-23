import { renderHook, act } from '@testing-library/react';
import { useMultiStepForm } from './useMultiStepForm';

describe('useMultiStepForm Hook', () => {
    const mockSteps = [<div>Step 1</div>, <div>Step 2</div>, <div>Step 3</div>];

    test('initializes correctly at step 0', () => {
        const { result } = renderHook(() => useMultiStepForm(mockSteps));

        expect(result.current.currentStepIndex).toBe(0);
        expect(result.current.isFirstStep).toBe(true);
        expect(result.current.isLastStep).toBe(false);
    });

    test('navigates to next step correctly', () => {
        const { result } = renderHook(() => useMultiStepForm(mockSteps));

        act(() => {
            result.current.next();
        });

        expect(result.current.currentStepIndex).toBe(1);
        expect(result.current.isFirstStep).toBe(false);
        expect(result.current.isLastStep).toBe(false);
    });

    test('does not exceed bounds on next()', () => {
        const { result } = renderHook(() => useMultiStepForm(mockSteps));

        act(() => {
            result.current.next(); // Index 1
            result.current.next(); // Index 2 (last)
            result.current.next(); // Should remain Index 2
        });

        expect(result.current.currentStepIndex).toBe(2);
        expect(result.current.isLastStep).toBe(true);
    });

    test('navigates backwards correctly', () => {
        const { result } = renderHook(() => useMultiStepForm(mockSteps));

        act(() => {
            result.current.next(); // 1
            result.current.next(); // 2
            result.current.back(); // 1
        });

        expect(result.current.currentStepIndex).toBe(1);
    });

    test('does not drop below bounds on back()', () => {
        const { result } = renderHook(() => useMultiStepForm(mockSteps));

        act(() => {
            result.current.back();
        });

        expect(result.current.currentStepIndex).toBe(0);
        expect(result.current.isFirstStep).toBe(true);
    });

    test('goTo navigates to specific valid indices', () => {
        const { result } = renderHook(() => useMultiStepForm(mockSteps));

        act(() => {
            result.current.goTo(2);
        });

        expect(result.current.currentStepIndex).toBe(2);
    });
});
