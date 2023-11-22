// Copyright 2020-2023, University of Colorado Boulder

/**
 * NLCheckbox is a text-only checkbox that is used throughout the number-line suite of sims for consistency.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import numberLineCommon from '../../numberLineCommon.js';

// constants
const BOX_WIDTH = 17;
const TOUCH_AREA_DILATION = 5;

class NLCheckbox extends Checkbox {

  /**
   * @param {BooleanProperty} property - Property that will be controlled by the checkbox
   * @param {LocalizedStringProperty} contentStringProperty - the string that will be used as the label for the checkbox
   * @param {Object} [options]
   */
  constructor( property, contentStringProperty, options ) {

    options = merge( {
      boxWidth: BOX_WIDTH,

      // passed through to the text label
      textOptions: {
        font: new PhetFont( 16 ),
        maxWidth: 200
      },
      isDisposable: false
    }, options );

    const content = new Text( contentStringProperty, options.textOptions );

    super( property, content, options );

    this.touchArea = this.localBounds.dilated( TOUCH_AREA_DILATION );
  }
}

numberLineCommon.register( 'NLCheckbox', NLCheckbox );
export default NLCheckbox;