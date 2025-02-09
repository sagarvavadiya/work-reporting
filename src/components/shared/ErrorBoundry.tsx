import React from 'react'
import { ErrorBoundary } from "react-error-boundary";

const ErrorBoundryBox = (children,fallback) => {
  return (

    <ErrorBoundary fallback={fallback}>
     {children}
    </ErrorBoundary>

  )
}

export default ErrorBoundryBox
