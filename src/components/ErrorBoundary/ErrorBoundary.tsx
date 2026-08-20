import { Component, type ErrorInfo, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    errorMessage: ''
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('KingBox Uncaught UI Error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, errorMessage: '' });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.card}>
            <span className={styles.icon}>⚠️</span>
            <h2>Something went wrong</h2>
            <p>An unexpected error occurred in the application interface.</p>
            <button type="button" className={styles.reloadBtn} onClick={this.handleReload}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
