import React, { forwardRef } from 'react';
import { Typography } from '../atoms/Typography';
import { Input } from '../atoms/Input';
import './FormField.css';

/**
 * FormField Molecule
 * Composes Typography (label and error) and Input atoms
 */
export const FormField = forwardRef(({
    label,
    error,
    id,
    className = '',
    ...inputProps
}, ref) => {
    return (
        <div className={`form-field ${className}`.trim()}>
            {label && (
                <Typography as="label" htmlFor={id} variant="small" className="form-field-label">
                    {label}
                </Typography>
            )}

            <Input
                ref={ref}
                id={id}
                hasError={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                {...inputProps}
            />

            {error && (
                <Typography
                    as="span"
                    id={`${id}-error`}
                    variant="small"
                    color="danger"
                    className="form-field-error"
                >
                    {error}
                </Typography>
            )}
        </div>
    );
});

FormField.displayName = 'FormField';
