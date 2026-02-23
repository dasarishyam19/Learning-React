import React, { Profiler } from 'react';
import { useTheme } from './context/ThemeContext';
import ComponentShowcase from './templates/ComponentShowcase';
import { OnboardingForm } from './components/organisms/OnboardingForm/OnboardingForm';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  const onRenderCallback = (id, phase, actualDuration) => {
    // Console log render metrics for performance tracking
    console.log(`[Profiler] Component ${id} (${phase}) rendered in ${actualDuration.toFixed(2)}ms`);
  };

  return (
    <Profiler id="AppRoot" onRender={onRenderCallback}>
      <div className={`App ${theme}`}>
        <header className="app-header">
          <h1>React Architecture Showcase</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </header>

        <main className="app-content">
          <section style={{ marginBottom: '4rem' }}>
            <h2>Onboarding Wizard (React Hook Form + Zod)</h2>
            <OnboardingForm />
          </section>

          <section>
            <h2>Component Library Showcase</h2>
            <ComponentShowcase />
          </section>
        </main>
      </div>
    </Profiler>
  );
}

export default App;
