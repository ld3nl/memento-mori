import * as React from 'react';

import HelpfulErrorPage from '../components/HelpfulErrorPage';

type Props = {};

const FiveHundred: React.FunctionComponent<Props> = () => {
  return (
    <HelpfulErrorPage routerPath="/500" errorCode={500} errorContent="" />
  );
};

export default FiveHundred;
