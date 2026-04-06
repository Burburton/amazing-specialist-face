import { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  SkillsPage,
  RolesPage,
  ContractsPage,
  CommandsPage,
  ExecutionPage,
  NotFoundPage,
  SkillDetailPage,
  RoleDetailPage,
  ContractDetailPage,
  CommandDetailPage
} from './pages';
import Layout from './components/common/Layout';
import './App.css';

function LoadingFallback() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-content">
        <div className="skeleton-grid">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      </div>
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
            <Route path="/skills/:id" element={<SkillDetailPage />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/roles/:name" element={<RoleDetailPage />} />
            <Route path="/contracts" element={<ContractsPage />} />
            <Route path="/contracts/:id" element={<ContractDetailPage />} />
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/commands/:name" element={<CommandDetailPage />} />
            <Route path="/execution" element={<ExecutionPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
