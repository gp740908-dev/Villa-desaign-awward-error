import React, { ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("FATAL: Could not find root element 'root' in index.html");
}

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#F8F4EB', color: '#056408', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Sanctuary Unavailable</h1>
          <p style={{ maxWidth: '600px', opacity: 0.8, marginBottom: '20px' }}>
            We encountered a spiritual turbulence. Please refresh or check the console.
          </p>
          <div style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '8px', textAlign: 'left', maxWidth: '80%', overflow: 'auto' }}>
            <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>{this.state.error?.toString()}</p>
            <pre style={{ fontSize: '11px', marginTop: '10px' }}>{this.state.errorInfo?.componentStack}</pre>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
          <HashRouter>
            <App />
          </HashRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log("Application Mounted Successfully");
} catch (e) {
  console.error("Failed to mount React root:", e);
  rootElement.innerHTML = `<div style="padding: 20px; color: red;">Failed to mount application: ${e}</div>`;
}