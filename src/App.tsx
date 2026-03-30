import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  SkillsPage,
  RolesPage,
  ContractsPage,
  CommandsPage,
  NotFoundPage
} from './pages';
import './App.css';

function LoadingFallback() {
  return (
    <div className="loading">
      <p>Loading...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/contracts" element={<ContractsPage />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;