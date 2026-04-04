import { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  SkillsPage,
  RolesPage,
  ContractsPage,
  CommandsPage,
  NotFoundPage
} from './pages';
import Layout from './components/common/Layout';
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
    <HashRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/contracts" element={<ContractsPage />} />
            <Route path="/commands" element={<CommandsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
