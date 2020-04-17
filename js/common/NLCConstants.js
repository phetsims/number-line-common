// Copyright 2020, University of Colorado Boulder

/**
 * NLCConstants (Number Line Common Constants) contains constants that are used by the common code and/or more than one
 * of the sims in the Number Line suite.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import numberLineCommon from '../numberLineCommon.js';

// constants
const CHECKBOX_BOX_WIDTH = 17;
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

  // checkbox options
  CHECKBOX_OPTIONS: { boxWidth: CHECKBOX_BOX_WIDTH },
  CHECKBOX_TEXT_OPTIONS: {
    font: new PhetFont( 16 ),
    maxWidth: 200
  },
  CHECKBOX_BOX_WIDTH: CHECKBOX_BOX_WIDTH,
  CHECKBOX_DILATION: 6,

  RESET_BUTTON_INSET_FROM_EDGE: 20,
  ACCORDION_BOX_CORNER_RADIUS: 4
};

numberLineCommon.register( 'NLCConstants', NLCConstants );
export default NLCConstants;