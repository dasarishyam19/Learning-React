import React, { useId } from 'react';
import styles from './FormField.module.css';
import Input from '../../atoms/Input/Input';
import Text from '../../atoms/Text/Text';

export default function FormField({
    label,
    error,
    id: providedId,
    className = '',
    ...inputProps
}) {
    const generatedId = useId();
    const id = providedId || generatedId;

    return (
        <div className={`${styles.formField} ${className}`.trim()}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    <Text variant="small" weight="medium">{label}</Text>
                </label>
            )}
            <Input id={id} hasError={!!error} {...inputProps} />
            {error && (
                <Text variant="caption" color="danger" className={styles.error}>
                    {error}
                </Text>
            )}
        </div>
    );
}
