// Copyright 2020, University of Colorado Boulder

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import numberLineCommon from '../../numberLineCommon.js';

// constants
const TEXT_OPTIONS = {
  font: new PhetFont( 16 ),
  maxWidth: 200
};
const BOX_WIDTH = 17;
const TOUCH_AREA_DILATION = 5;

/**
 * NLCheckbox is a text-only checkbox that is used throughout the number-line suite of sims for consistency.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
class NLCheckbox extends Checkbox {

  /**
   * @param {BooleanProperty} property - Property that will be controlled by the checkbox
   * @param {string} contentString - the string that will be used as the label for the checkbox
   * @param {Object} [options]
   */
  constructor( contentString, property, options ) {

    options = merge( {
      boxWidth: BOX_WIDTH
    }, options );

    const content = new Text( contentString, TEXT_OPTIONS );

    super( content, property, options );

    this.touchArea = this.localBounds.dilated( TOUCH_AREA_DILATION );
  }

  /**
   * @public
   * @override
   */
  static dispose() {
    assert && assert( false, 'NLCheckbox does not support dispose' );
  }
}

numberLineCommon.register( 'NLCheckbox', NLCheckbox );
export default NLCheckbox;