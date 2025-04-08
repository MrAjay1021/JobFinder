import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f8f9fa'
        }}>
          <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>Something went wrong</h1>
          <p style={{ marginBottom: '20px' }}>We apologize for the inconvenience. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
          <details style={{ marginTop: '20px', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error Details</summary>
            <p style={{ whiteSpace: 'pre-wrap', margin: '10px 0' }}>
              {this.state.error && this.state.error.toString()}
            </p>
            <div style={{ marginTop: '10px' }}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </div>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 