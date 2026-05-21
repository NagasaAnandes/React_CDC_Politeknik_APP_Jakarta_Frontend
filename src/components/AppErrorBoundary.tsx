import React from "react";

type AppErrorBoundaryProps = {
  children: React.ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("[AppErrorBoundary] caught error", error, info);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="w-full max-w-lg rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">CDC Platform</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              The application hit an unexpected runtime error. You can retry to
              recover the current route.
            </p>
            {this.state.error ? (
              <pre className="mt-4 max-h-48 overflow-auto rounded-lg bg-slate-100 p-3 text-xs text-slate-700">
                {this.state.error.message}
              </pre>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="btn btn-primary btn-sm"
                onClick={this.handleRetry}
              >
                Try again
              </button>
              <a className="btn btn-sm" href="/">
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
