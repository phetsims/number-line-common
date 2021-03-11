// Copyright 2020, University of Colorado Boulder

/**
 * A node that controls a number line's orientation
 *
 * @author Saurabh Totey
 */

import numberLineCommon from '../../numberLineCommon.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import merge from '../../../../phet-core/js/merge.js';

const ARROW_ICON_LENGTH = 40;
const ORIENTATION_BUTTON_DILATION = 2;

class NumberLineOrientationSelector extends RectangularRadioButtonGroup {

  /**
   * @param {Property.<Orientation>} orientationProperty
   * @param {Object} [options]
   */
  constructor( orientationProperty, options ) {
    const arrowIconOptions = {
      doubleHead: true,
      tailWidth: 1
    };

    // Create the orientation selection icons.
    const horizontalIcon = new ArrowNode( -ARROW_ICON_LENGTH / 2, 0, ARROW_ICON_LENGTH / 2, 0, arrowIconOptions );
    const verticalIcon = new ArrowNode( 0, -ARROW_ICON_LENGTH / 2, 0, ARROW_ICON_LENGTH / 2, arrowIconOptions );

    // Map the orientation icons to their enum values.
    const orientationButtonsContent = [
      {
        value: Orientation.HORIZONTAL,
        node: horizontalIcon
      },
      {
        value: Orientation.VERTICAL,
        node: verticalIcon
      }
    ];

    // orientation radio buttons
    super(
      orientationProperty,
      orientationButtonsContent,
      merge( {
        buttonContentXMargin: 5,
        buttonContentYMargin: 5,
        baseColor: 'white',
        selectedLineWidth: 2,
        deselectedLineWidth: 0.5,
        deselectedButtonOpacity: 0.25,
        orientation: 'horizontal',
        spacing: 12,
        touchAreaXDilation: ORIENTATION_BUTTON_DILATION,
        touchAreaYDilation: ORIENTATION_BUTTON_DILATION
      }, options ) );
  }

}

numberLineCommon.register( 'NumberLineOrientationSelector', NumberLineOrientationSelector );
export default NumberLineOrientationSelector;
