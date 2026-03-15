import { Dashboard } from './components/tasks/Dashboard';
import { usePersistence } from './hooks/usePersistence';

function App() {
  // Activate localStorage persistence
  usePersistence();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300">
      <Dashboard />
    </div>
  );
}

export default App;
