// Copyright 2020, University of Colorado Boulder

import numberLineCommonStrings from '../../../../number-line-common/js/numberLineCommonStrings.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import ComboBoxItem from '../../../../sun/js/ComboBoxItem.js';
import numberLineCommon from '../../numberLineCommon.js';

// constants
const FONT = new PhetFont( 16 );

/**
 * SingleDualNumberLineSelector defines a Scenery node with two radio buttons that are used to choose between "single
 * number line" and "dual number line" modes.
 */
class NumberLineRangeSelector extends ComboBox {

  /**
   * @param {Property<Range>} selectedRangeProperty
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
      buttonTouchAreaYDilation: 7
    }, options );

    // create the selection items for the range selection combo box
    const rangeSelectionComboBoxItems = [];
    ranges.forEach( range => {
      rangeSelectionComboBoxItems.push(
        new ComboBoxItem(
          new Text(
            StringUtils.fillIn( numberLineCommonStrings.range, {
              lowValue: range.min,
              highValue: range.max
            } ),
            { font: FONT, maxWidth: 150 }
          ),
          range
        )
      );
    } );

    super( rangeSelectionComboBoxItems, selectedRangeProperty, listBoxParentNode, options );
  }
}

numberLineCommon.register( 'NumberLineRangeSelector', NumberLineRangeSelector );
export default NumberLineRangeSelector;