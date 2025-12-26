// src/components/ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // eslint-disable-next-line no-console
    console.error('Unhandled error caught by ErrorBoundary:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, info: null });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-rose-500/40 bg-rose-950/80 px-5 py-6 space-y-3 shadow-[0_22px_60px_rgba(0,0,0,0.8)]">
          <h1 className="text-lg font-semibold text-rose-50">
            Something went wrong in the demo.
          </h1>
          <p className="text-[11px] text-rose-100/90">
            This error boundary catches unexpected runtime issues. You can
            reload the app and continue exploring the fake data environment.
          </p>
          <pre className="text-[10px] text-rose-200/90 bg-rose-900/60 rounded-md px-3 py-2 overflow-x-auto max-h-40">
            {String(this.state.error)}
            {this.state.info && this.state.info.componentStack
              ? '\n\n' + this.state.info.componentStack
              : ''}
          </pre>
          <button
            type="button"
            onClick={this.handleReload}
            className="text-[11px] font-medium rounded-full bg-rose-500 hover:bg-rose-400 text-rose-50 px-4 py-1.5"
          >
            Reload demo
          </button>
        </div>
      </div>
    );
  }
}
