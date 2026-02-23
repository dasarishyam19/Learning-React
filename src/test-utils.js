import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { ThemeProvider } from './context/ThemeContext';

// Configure a fresh QueryClient for tests so cache doesn't bleed between tests
const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // Turn off retries for faster test failures
            },
        },
    });

/**
 * A custom render function that wraps components with all necessary global context providers
 * required for them to function correctly in testing environments.
 */
export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Pass in a fresh query client or optionally allow overriding
        queryClient = createTestQueryClient(),
        route = '/',
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>{children}</ThemeProvider>
                </QueryClientProvider>
            </Provider>
        );
    }

    // Return an object with the store/client and all of RTL's query functions
    return {
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
        queryClient,
    };
}

// Re-export everything from RTL
export * from '@testing-library/react';

// Override render method
export { renderWithProviders as render };
