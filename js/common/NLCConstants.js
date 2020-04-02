// Copyright 2020, University of Colorado Boulder

/**
 * NLCConstants (Number Line Common Constants) contains constants that are used by the common code and/or more than one
 * of the sims in the Number Line suite.
 */

import numberLineCommon from '../numberLineCommon.js';

const NLCConstants = {

  // options used for most if not all label backgrounds
  LABEL_BACKGROUND_OPTIONS: {
    backgroundOptions: {
      opacity: 0.85,
      cornerRadius: 3
    },
    xMargin: 3,
    yMargin: 3
  }

};


numberLineCommon.register( 'NLCConstants', NLCConstants );
export default NLCConstants;