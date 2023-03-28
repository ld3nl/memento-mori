import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { afterEach, describe, it } from '@jest/globals';

import HelpfulErrorPage from './HelpfulErrorPage';

afterEach(cleanup);

describe('HelpfulErrorPage', () => {
  it('renders HelpfulErrorPage component', () => {
    render(<HelpfulErrorPage />);
  });
});
