// Copyright 2020, University of Colorado Boulder

/**
 * NLCConstants (Number Line Common Constants) contains constants that are used by the common code and/or more than one
 * of the sims in the Number Line suite.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import numberLineCommon from '../numberLineCommon.js';

// constants
const LABEL_BACKGROUND_CORNER_RADIUS = 3;

const NLCConstants = {

  // corner radius of the background for most if not all labels
  LABEL_BACKGROUND_CORNER_RADIUS: LABEL_BACKGROUND_CORNER_RADIUS,

  // options used for most if not all label backgrounds
  LABEL_BACKGROUND_OPTIONS: {
    backgroundOptions: {
      opacity: 0.85,
      cornerRadius: LABEL_BACKGROUND_CORNER_RADIUS
    },
    xMargin: 3,
    yMargin: 3
  },

  RESET_BUTTON_INSET_FROM_EDGE: 20,
  ACCORDION_BOX_CORNER_RADIUS: 5
};

numberLineCommon.register( 'NLCConstants', NLCConstants );
export default NLCConstants;