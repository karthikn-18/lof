import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0,
          background: '#000', color: '#e88',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '2rem', fontFamily: 'monospace',
          zIndex: 99999, textAlign: 'center',
        }}>
          <h2 style={{ color: '#f55', marginBottom: '1rem' }}>
            Something went wrong
          </h2>
          <pre style={{
            background: '#111', padding: '1rem', borderRadius: '8px',
            maxWidth: '90vw', overflowX: 'auto', fontSize: '0.8rem',
            color: '#faa', textAlign: 'left',
          }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
