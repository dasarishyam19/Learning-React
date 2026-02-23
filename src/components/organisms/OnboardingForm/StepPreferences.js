import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Typography } from '../../atoms/Typography';
import './StepPreferences.css';

export const StepPreferences = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="onboarding-step">
            <Typography variant="h3" className="mb-4">
                Preferences
            </Typography>

            <div className="checkbox-field">
                <label>
                    <input type="checkbox" {...register('newsletter')} />
                    <span>Subscribe to newsletter</span>
                </label>
                {errors.newsletter && (
                    <Typography as="span" variant="small" color="danger">
                        {errors.newsletter.message}
                    </Typography>
                )}
            </div>

            <div className="radio-group mt-4">
                <Typography as="legend" variant="body">Choose Theme:</Typography>

                <label>
                    <input type="radio" value="light" {...register('theme')} />
                    <span>Light</span>
                </label>

                <label>
                    <input type="radio" value="dark" {...register('theme')} />
                    <span>Dark</span>
                </label>

                <label>
                    <input type="radio" value="system" {...register('theme')} />
                    <span>System</span>
                </label>

                {errors.theme && (
                    <Typography as="span" variant="small" color="danger" className="mt-2 block">
                        {errors.theme.message}
                    </Typography>
                )}
            </div>
        </div>
    );
};
