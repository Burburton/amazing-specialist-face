import { Suspense } from 'react';

function LoadingFallback() {
  return (
    <div className="loading">
      <p>Loading Execution Monitor...</p>
    </div>
  );
}

function ExecutionPage() {
  return (
    <div className="execution-page">
      <h1>Execution Monitor</h1>
      <p>Real-time task execution monitoring coming soon...</p>
    </div>
  );
}

export default function ExecutionPageWrapper() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ExecutionPage />
    </Suspense>
  );
}