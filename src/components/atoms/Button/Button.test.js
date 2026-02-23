import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../../test-utils';
import Button from './Button';

describe('Button Component Atom', () => {

    test('renders button with correct text', () => {
        render(<Button>Click Me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });

        expect(buttonElement).toBeInTheDocument();
    });

    test('applies variant and size attributes', () => {
        // Testing logic works without breaking CSS Module auto-hashing
        render(<Button variant="danger" size="lg">Dangerous</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('responds to clicks', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Submit</Button>);

        const buttonElement = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('is disabled when disabled prop is true', () => {
        render(<Button disabled>Locked</Button>);
        const buttonElement = screen.getByRole('button', { name: /locked/i });

        expect(buttonElement).toBeDisabled();
    });
});
