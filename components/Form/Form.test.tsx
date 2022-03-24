import * as React from 'react';
import { render, cleanup} from 'react-testing-library';

import Form from './Form';

afterEach(cleanup);

describe('Form', () => {
  it('renders Form component', () => {
    render(<Form/>);
  });
});
