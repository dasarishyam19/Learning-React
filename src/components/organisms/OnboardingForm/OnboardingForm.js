import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepForm } from '../../../hooks/useMultiStepForm';
import { Button } from '../../atoms/Button';
import { personalInfoSchema, accountDetailsSchema, preferencesSchema } from './validations';
import { StepPersonalInfo } from './StepPersonalInfo';
import { StepAccountDetails } from './StepAccountDetails';
import { StepPreferences } from './StepPreferences';
import './OnboardingForm.css';

// Map steps to their specific validation schemas
const stepSchemas = [personalInfoSchema, accountDetailsSchema, preferencesSchema];

export const OnboardingForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Initialize the sequential multi-step hook
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
        <StepPersonalInfo key="personal" />,
        <StepAccountDetails key="account" />,
        <StepPreferences key="preferences" />,
    ]);

    // Determine current active schema for validation based on step index
    const currentValidationSchema = stepSchemas[currentStepIndex];

    // Initialize react-hook-form using the current step's schema
    const methods = useForm({
        resolver: zodResolver(currentValidationSchema),
        mode: 'onTouched', // Validates fields when they lose focus
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            newsletter: false,
            theme: 'system',
        },
    });

    const { handleSubmit, trigger } = methods;

    const onSubmit = async (data) => {
        // If not on the last step, trigger validation. If valid, move next.
        if (!isLastStep) {
            const isValid = await trigger();
            if (isValid) next();
            return;
        }

        // Process Final Submission
        setIsSubmitting(true);
        try {
            // Simulate API Call
            await new Promise((res) => setTimeout(res, 1500));
            console.log('Final Form Data Submitted:', data);
            setSuccess(true);
        } catch (err) {
            console.error('Submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="onboarding-success">
                <h2>Welcome aboard!</h2>
                <p>Your account has been successfully created.</p>
            </div>
        );
    }

    return (
        <div className="onboarding-container">
            <div className="step-indicator">
                Step {currentStepIndex + 1} of {steps.length}
            </div>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="onboarding-form">

                    {/* Render the current step component */}
                    {step}

                    <div className="form-actions">
                        {!isFirstStep && (
                            <Button type="button" variant="outline" onClick={back} disabled={isSubmitting}>
                                Back
                            </Button>
                        )}
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : isLastStep ? 'Complete Registration' : 'Continue'}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
