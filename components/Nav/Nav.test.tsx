import * as React from 'react';
import { render, cleanup} from 'react-testing-library';

import Nav from './Nav';

afterEach(cleanup);

describe('Nav', () => {
  it('renders Nav component', () => {
    render(<Nav/>);
  });
});
