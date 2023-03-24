import * as React from 'react';
import { render, cleanup} from 'react-testing-library';

import BetterForm from './BetterForm';

afterEach(cleanup);

describe('BetterForm', () => {
  it('renders BetterForm component', () => {
    render(<BetterForm/>);
  });
});
