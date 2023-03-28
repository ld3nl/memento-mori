import * as React from 'react';

import HelpfulErrorPage from '../components/HelpfulErrorPage';

type Props = {};

const FourOhFour: React.FunctionComponent<Props> = () => {
  return (
    <HelpfulErrorPage routerPath="/404" errorCode={404} errorContent="" />
  );
};


export default FourOhFour;
