import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error details to an external service if necessary
    this.setState({
      error: error,
      info: info,
    });
  }

  render() {
    if (this.state.hasError) {
      // Customize the fallback UI shown when an error occurs
      return <h2>Something went wrong with the Sidebar component.</h2>;
    }
    // Render the children components when no error occurs
    return this.props.children;
  }
}

export default ErrorBoundary;
