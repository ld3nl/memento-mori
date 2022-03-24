import * as React from 'react';
import { render, cleanup} from 'react-testing-library';

import LifeTable from './LifeTable';

afterEach(cleanup);

describe('LifeTable', () => {
  it('renders LifeTable component', () => {
    render(<LifeTable/>);
  });
});
