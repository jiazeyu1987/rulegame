import React from 'react';
import { render, screen } from '@testing-library/react';

// Simple test without CSS modules
const SimpleComponent = () => {
  return <div>Hello World</div>;
};

describe('Simple UI Test', () => {
  test('should render text', () => {
    render(<SimpleComponent />);
    
    // This should work if Jest DOM matchers are configured
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});