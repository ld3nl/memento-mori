import * as React from 'react';
import { render, cleanup} from 'react-testing-library';

import LifeTableCell from './LifeTableCell';

afterEach(cleanup);

describe('LifeTableCell', () => {
  it('renders LifeTableCell component', () => {
    render(<LifeTableCell/>);
  });
});
