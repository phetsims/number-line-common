// Copyright 2020-2022, University of Colorado Boulder

/**
 * NumberLineRangeSelector is a ComboBox specialization that can be used to select from a set of ranges that are then
 * used to control the range of values displayed on a number line.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import numberLineCommonStrings from '../../../../number-line-common/js/numberLineCommonStrings.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import ComboBoxItem from '../../../../sun/js/ComboBoxItem.js';
import numberLineCommon from '../../numberLineCommon.js';

// constants
const FONT = new PhetFont( 16 );

class NumberLineRangeSelector extends ComboBox {

  /**
   * @param {Property.<Range>} selectedRangeProperty
   * @param {Range[]} ranges
   * @param {Node} listBoxParentNode
   * @param {Object} [options]
   * @public
   */
  constructor( selectedRangeProperty, ranges, listBoxParentNode, options ) {

    options = merge( {
      listPosition: 'above',
      xMargin: 13,
      yMargin: 6,
      cornerRadius: 4,
      buttonTouchAreaXDilation: 7,
      buttonTouchAreaYDilation: 7,
      align: 'right'
    }, options );

    // Create the selection items for the range selection combo box.
    const rangeSelectionComboBoxItems = []; // {ComboBoxItem[]}
    ranges.forEach( range => {
      rangeSelectionComboBoxItems.push(
        new ComboBoxItem(
          new Text(
            StringUtils.fillIn( numberLineCommonStrings.rangePattern, {
              lowValue: range.min,
              highValue: range.max
            } ),
            { font: FONT, maxWidth: 150 }
          ),
          range
        )
      );
    } );

    super( selectedRangeProperty, rangeSelectionComboBoxItems, listBoxParentNode, options );
  }
}

numberLineCommon.register( 'NumberLineRangeSelector', NumberLineRangeSelector );
export default NumberLineRangeSelector;