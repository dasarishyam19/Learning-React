import { useTheme } from './context/ThemeContext';
import ComponentShowcase from './templates/ComponentShowcase';
import './App.css';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <ComponentShowcase />
    </div>
  );
}

export default App;
