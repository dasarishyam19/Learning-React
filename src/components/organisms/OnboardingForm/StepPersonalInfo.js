import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../../molecules/FormField';
import { Typography } from '../../atoms/Typography';

export const StepPersonalInfo = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="onboarding-step">
            <Typography variant="h3" className="mb-4">
                Personal Information
            </Typography>
            <FormField
                label="First Name"
                id="firstName"
                placeholder="e.g., Jane"
                {...register('firstName')}
                error={errors.firstName?.message}
            />
            <FormField
                label="Last Name"
                id="lastName"
                placeholder="e.g., Doe"
                {...register('lastName')}
                error={errors.lastName?.message}
            />
        </div>
    );
};
