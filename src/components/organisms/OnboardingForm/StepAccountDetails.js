import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../../molecules/FormField';
import { Typography } from '../../atoms/Typography';

export const StepAccountDetails = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="onboarding-step">
            <Typography variant="h3" className="mb-4">
                Account Details
            </Typography>
            <FormField
                label="Email Address"
                id="email"
                type="email"
                placeholder="jane@example.com"
                {...register('email')}
                error={errors.email?.message}
            />
            <FormField
                label="Password"
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                {...register('password')}
                error={errors.password?.message}
            />
            <FormField
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />
        </div>
    );
};
