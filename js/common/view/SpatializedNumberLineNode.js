// Copyright 2020, University of Colorado Boulder

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberLineCommon from '../../numberLineCommon.js';
import AbsoluteValueSpanNode from './AbsoluteValueSpanNode.js';
import PointNode from './PointNode.js';
import Color from '../../../../scenery/js/util/Color.js';
import NLCConstants from '../NLCConstants.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Panel from '../../../../sun/js/Panel.js';
import numberLineCommonStrings from '../../numberLineCommonStrings.js';

// constants
const TICK_MARK_LABEL_DISTANCE = 5;
const ABSOLUTE_VALUE_MIN_LINE_WIDTH = 2;
const ABSOLUTE_VALUE_LINE_EXPANSION_FACTOR = 3;
const ABSOLUTE_VALUE_SPAN_NL_DISTANCE_Y = 55;
const ABSOLUTE_VALUE_SPAN_SPACING_Y = 40;
const ABSOLUTE_VALUE_SPAN_NL_DISTANCE_X = 105;
const ABSOLUTE_VALUE_SPAN_SPACING_X = 95;
const OFF_SCALE_INDICATOR_FONT = new PhetFont( 14 );
const COMMON_OFF_SCALE_PANEL_OPTIONS = {
  fill: Color.WHITE,
  stroke: Color.BLACK,
  cornerRadius: NLCConstants.LABEL_BACKGROUND_CORNER_RADIUS
};
const OFF_SCALE_HBOX_SPACING = 5;
const OFF_SCALE_ARROW_LENGTH = 25;
const OFF_SCALE_ARROW_OPTIONS = {
  tailWidth: 2
};
const OFF_SCALE_INDICATOR_HEIGHT_ABOVE_LINE = 25;

const pointsOffScaleString = numberLineCommonStrings.pointsOffScale;

// convenience function to calculate distance of an absolute value span node from the number line
const getIndicatorDistanceFromNL = ( numberLine, count ) => {
  return numberLine.isHorizontal ?
         ABSOLUTE_VALUE_SPAN_NL_DISTANCE_Y + count * ABSOLUTE_VALUE_SPAN_SPACING_Y :
         ABSOLUTE_VALUE_SPAN_NL_DISTANCE_X + count * ABSOLUTE_VALUE_SPAN_SPACING_X;
};

/**
 * SpatializedNumberLineNode is a Scenery Node that presents a number line that is mapped into 2D space.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
class SpatializedNumberLineNode extends Node {

  /**
   * {NumberLine} numberLine - model of a number line
   * {Object} [options] - options that control the appearance of the number line
   * @public
   */
  constructor( numberLine, options ) {

    options = merge( {

      numberLineWidth: 1,
      tickMarkLineWidth: 1,
      tickMarkLength: 10,
      zeroTickMarkLineWidth: 2,
      zeroTickMarkLength: 16,
      tickMarkLabelOptions: { font: new PhetFont( 16 ), maxWidth: 75 },
      tickMarkLabelPositionWhenVertical: 'right', // valid values are 'right' and 'left'
      tickMarkLabelPositionWhenHorizontal: 'below', // valid values are 'above' and 'below'
      color: 'black',
      pointRadius: 10,
      numericalLabelTemplate: '{{value}}',

      // {boolean} - controls whether the absolute value span indicators, which are a little ways away from the number
      // line itself, are portrayed
      showAbsoluteValueSpans: false,

      // {number} - the distance between the edge of the display bounds and the ends of the displayed range, in model
      // coordinates
      displayedRangeInset: 25,

      // options for the point nodes
      pointNodeOptions: {
        usePointColorForLabelText: true,
        colorizeLabelBackground: false
      },

      // {boolean} whether to display a message indicating that points are off the number line's displayed range
      allowPointsOutsideRangeIndicator: false

    }, options );

    // since the position is set based on the model, don't pass options through to parent class
    super();

    // @private {Object} - make options available to methods
    this.options = _.cloneDeep( options );

    // @private {NumberLine} - make the number line model available to methods
    this.numberLine = numberLine;

    // assemble the options that control the appearance of the main number into one place
    const numberLineNodeOptions = {
      doubleHead: true,
      lineWidth: options.numberLineWidth,
      tailWidth: options.numberLineWidth,
      headHeight: 10,
      headWidth: 10,
      stroke: options.color,
      fill: options.color
    };

    // Create the layer where everything that moves if the number line's center position changes will reside.  This
    // will be the parent node for most sub-nodes, but will exclude things like points, which are responsible for
    // positioning themselves in space.  Everything on this node will be added as though the number line is centered at
    // the local point (0,0), and then it will be translated into the right position.
    const numberLineRootNode = new Node();
    this.addChild( numberLineRootNode );

    // add the number line, and update it if the orientation changes
    const numberLineNode = new Node();
    numberLineRootNode.addChild( numberLineNode );
    numberLine.orientationProperty.link( orientation => {

      const minValueProjected = numberLine.getScaledOffsetFromZero( numberLine.displayedRangeProperty.value.min );
      const maxValueProjected = numberLine.getScaledOffsetFromZero( numberLine.displayedRangeProperty.value.max );

      // remove the previous representation
      numberLineNode.removeAllChildren();

      if ( orientation === Orientation.HORIZONTAL ) {

        // add the arrow node that represents the number line
        numberLineNode.addChild( new ArrowNode(
          minValueProjected - options.displayedRangeInset,
          0,
          maxValueProjected + options.displayedRangeInset,
          0,
          numberLineNodeOptions
        ) );
      }
      else {

        // add the arrow node that represents the number line
        numberLineNode.addChild( new ArrowNode(
          0,
          maxValueProjected - options.displayedRangeInset,
          0,
          minValueProjected + options.displayedRangeInset,
          numberLineNodeOptions
        ) );
      }

      // add the tick mark for the 0 position, which is always visible
      this.addTickMark( numberLineNode, 0 );
    } );

    // handle the tick marks at the ends of the display range
    const endTickMarksRootNode = new Node();
    numberLineRootNode.addChild( endTickMarksRootNode );

    // add the root node for the tick marks that exist between the middle and the end
    const middleTickMarksRootNode = new Node();
    numberLine.showTickMarksProperty.linkAttribute( middleTickMarksRootNode, 'visible' );
    numberLineRootNode.addChild( middleTickMarksRootNode );

    // add the layer where the lines that are used to indicate the absolute value of a point will be displayed
    const absoluteValueLineLayer = new Node();
    this.addChild( absoluteValueLineLayer );
    numberLine.showAbsoluteValuesProperty.linkAttribute( absoluteValueLineLayer, 'visible' );

    // add the layer where opposite points on the number line will be displayed
    const oppositePointDisplayLayer = new Node();
    this.addChild( oppositePointDisplayLayer );

    // add the layer where the normal (non-opposite) points on the number line will be displayed
    const pointDisplayLayer = new Node();
    this.addChild( pointDisplayLayer );

    // closure that updates the absolute value indicators
    const absoluteValueLines = [];
    const updateAbsoluteValueIndicators = ( doAnimation = false ) => {

      // if there aren't enough absolute value indicator lines available, add new ones until there are enough
      while ( absoluteValueLines.length < numberLine.residentPoints.length ) {
        const absoluteValueLine = new Line( 0, 0, 1, 1 ); // position and size are arbitrary, will be updated below
        absoluteValueLines.push( absoluteValueLine );
        absoluteValueLineLayer.addChild( absoluteValueLine );
      }

      // if there are too many absolute value indicator lines, remove them until we have the right amount
      while ( absoluteValueLines.length > numberLine.residentPoints.length ) {
        const absoluteValueLine = absoluteValueLines.pop();
        absoluteValueLineLayer.removeChild( absoluteValueLine );
      }

      // create a list of the resident points on the number line sorted by absolute value
      const pointsSortedByValue = _.sortBy( numberLine.residentPoints.getArray(), point => {
        return Math.abs( point.valueProperty.value );
      } );

      // update the position, color, thickness, and layering of each of the lines and the spacing of the spans
      let pointsAboveZeroCount = 0;
      let pointsBelowZeroCount = 0;
      const zeroPosition = numberLine.centerPositionProperty.value;
      pointsSortedByValue.forEach( ( point, index ) => {

        // get a line that will display the absolute value on the number line itself
        const lineOnNumberLine = absoluteValueLines[ index ];

        // get the span indicator that is associated with this point
        const pointValue = point.valueProperty.value;
        if ( pointValue === 0 ) {

          // hide the line entirely in this case, and position it so that it doesn't mess with the overall bounds
          lineOnNumberLine.visible = false;
          lineOnNumberLine.setLine( zeroPosition.x, zeroPosition.y, zeroPosition.x, zeroPosition.y );
        }
        else {
          lineOnNumberLine.visible = true;
          lineOnNumberLine.moveToBack(); // the last line processed will end up at the back of the layering
          lineOnNumberLine.stroke = point.colorProperty.value;
          const pointPosition = point.getPositionInModelSpace();
          lineOnNumberLine.setLine( zeroPosition.x, zeroPosition.y, pointPosition.x, pointPosition.y );
          if ( pointValue > 0 ) {
            pointsAboveZeroCount++;
            lineOnNumberLine.lineWidth = ABSOLUTE_VALUE_MIN_LINE_WIDTH + pointsAboveZeroCount *
                                         ABSOLUTE_VALUE_LINE_EXPANSION_FACTOR;
          }
          else {
            pointsBelowZeroCount++;
            lineOnNumberLine.lineWidth = ABSOLUTE_VALUE_MIN_LINE_WIDTH + pointsBelowZeroCount *
                                         ABSOLUTE_VALUE_LINE_EXPANSION_FACTOR;
          }
        }
      } );

      // create a list of the absolute value span indicators sorted by their distance from the number line
      const sortedAbsoluteValueSpanNodes = _.sortBy( absoluteValueSpanNodes, absoluteValueSpanNode => {
        return absoluteValueSpanNode.distanceFromNumberLineProperty.value;
      } );

      // Make sure the absolute value span indicators are at the correct distances - this is mostly done to handle
      // changes in the number line orientation.
      sortedAbsoluteValueSpanNodes.forEach( ( absoluteValueSpanNode, index ) => {
        absoluteValueSpanNode.setDistanceFromNumberLine(
          getIndicatorDistanceFromNL( numberLine, index ),
          doAnimation
        );
      } );
    };

    // update the color of the lines separately to avoid race conditions between point value and color
    const updateAbsoluteValueIndicatorColors = () => {

      // create a list of the resident points on the number line sorted by absolute value
      const pointsSortedByValue = _.sortBy( numberLine.residentPoints.getArray(), point => {
        return Math.abs( point.valueProperty.value );
      } );

      pointsSortedByValue.forEach( ( point, index ) => {

        // get a line that will display the absolute value on the number line itself
        const lineOnNumberLine = absoluteValueLines[ index ];

        // update color of line if it exists
        if ( point.valueProperty.value !== 0 ) {
          lineOnNumberLine.stroke = point.colorProperty.value;
        }
      } );
    };

    // array where absolute value span nodes are tracked if displayed for this number line node
    let absoluteValueSpanNodes = [];

    // handler for number line points that are added to the number line
    const handlePointAdded = point => {

      // add the node that will represent the point on the number line
      const pointNode = new PointNode( point, numberLine, merge( {
        labelTemplate: options.numericalLabelTemplate
      }, options.pointNodeOptions ) );
      pointDisplayLayer.addChild( pointNode );

      // add the point that will represent the opposite point
      const oppositePointNode = new PointNode( point, numberLine, {
        isDoppelganger: true,
        labelTemplate: options.numericalLabelTemplate
      } );
      oppositePointDisplayLayer.addChild( oppositePointNode );

      // if enabled, add an absolute value "span indicator", which depicts the absolute value at some distance from
      // the number line
      let absoluteValueSpanNode = null;
      if ( options.showAbsoluteValueSpans ) {
        const absoluteValueSpanNodeDistance = getIndicatorDistanceFromNL( numberLine, absoluteValueSpanNodes.length );
        absoluteValueSpanNode = new AbsoluteValueSpanNode( numberLine, point, absoluteValueSpanNodeDistance );
        absoluteValueSpanNodes.push( absoluteValueSpanNode );
        this.addChild( absoluteValueSpanNode );
      }

      // add a listeners that will update the absolute value indicators
      point.valueProperty.link( updateAbsoluteValueIndicators );
      point.colorProperty.link( updateAbsoluteValueIndicatorColors );

      // add a listener that will unhook everything if and when this point is removed
      const removeItemListener = removedPoint => {
        if ( removedPoint === point ) {
          pointDisplayLayer.removeChild( pointNode );
          pointNode.dispose();
          oppositePointDisplayLayer.removeChild( oppositePointNode );
          oppositePointNode.dispose();
          if ( absoluteValueSpanNode ) {
            this.removeChild( absoluteValueSpanNode );
            absoluteValueSpanNode.dispose();
            absoluteValueSpanNodes = _.without( absoluteValueSpanNodes, absoluteValueSpanNode );
          }
          updateAbsoluteValueIndicators( true );
          point.valueProperty.unlink( updateAbsoluteValueIndicators );
          point.colorProperty.unlink( updateAbsoluteValueIndicatorColors );
          numberLine.residentPoints.removeItemRemovedListener( removeItemListener );
        }
      };
      numberLine.residentPoints.addItemRemovedListener( removeItemListener );
    };

    // add nodes for any points that are initially on the number line
    numberLine.residentPoints.forEach( handlePointAdded );

    // handle comings and goings of number line points
    numberLine.residentPoints.addItemAddedListener( handlePointAdded );

    // update portions of the representation that change if the displayed range or orientation changes
    Property.multilink(
      [ numberLine.displayedRangeProperty, numberLine.orientationProperty ],
      ( displayedRange, orientation ) => {

        assert && assert(
          orientation === Orientation.HORIZONTAL || orientation === Orientation.VERTICAL,
          `Invalid orientation: ${orientation}`
        );

        // remove previous middle and end tickmarks
        middleTickMarksRootNode.removeAllChildren();
        endTickMarksRootNode.removeAllChildren();

        // Derive the tick mark spacing from the range.  This mapping was taken from the various Number Line Suite
        // design specs, and could be made into a optional mapping function if more flexibility is needed.
        let tickMarkSpacing;
        switch( numberLine.displayedRangeProperty.value.getLength() ) {
          case 20:
            tickMarkSpacing = 1;
            break;
          case 30:
            tickMarkSpacing = 5;
            break;
          case 60:
            tickMarkSpacing = 5;
            break;
          case 200:
            tickMarkSpacing = 25;
            break;
          case 2000:
            tickMarkSpacing = 100;
            break;
          default:
            tickMarkSpacing = 1;
            break;
        }

        // Derive the tick mark label spacing from the range.  As with the tick mark spacing, this mapping was taken
        // from the various Number Line Suite design specs, and could be made into a optional mapping function if more
        // flexibility is needed.
        let tickMarkLabelSpacing;
        switch( numberLine.displayedRangeProperty.value.getLength() ) {
          case 20:
            tickMarkLabelSpacing = 1;
            break;
          case 60:
            tickMarkLabelSpacing = 5;
            break;
          case 200:
            tickMarkLabelSpacing = 25;
            break;
          case 2000:
            tickMarkLabelSpacing = 500;
            break;
          default:
            tickMarkLabelSpacing = 1;
            break;
        }

        // Draw the tick marks.  These could be optimized to be a single Path node for the ticks if a performance
        // improvement is ever needed.
        const minTickMarkValue = numberLine.displayedRangeProperty.value.min + tickMarkSpacing;
        const maxTickMarkValue = numberLine.displayedRangeProperty.value.max - tickMarkSpacing;

        this.addTickMark( endTickMarksRootNode, displayedRange.min, true );
        this.addTickMark( endTickMarksRootNode, displayedRange.max, true );

        for ( let tmValue = minTickMarkValue; tmValue <= maxTickMarkValue; tmValue += tickMarkSpacing ) {
          if ( tmValue !== 0 ) {
            this.addTickMark( middleTickMarksRootNode, tmValue, tmValue % tickMarkLabelSpacing === 0 );
          }
        }

        // update absolute value representations
        updateAbsoluteValueIndicators();
      }
    );

    // Monitor the center position of the spatialized number line model and make the necessary transformations when
    // changes occur.
    numberLine.centerPositionProperty.link( centerPosition => {
      numberLineRootNode.translation = centerPosition;
    } );

    // Adds points off scale panels if necessary
    if ( options.allowPointsOutsideRangeIndicator ) {
      // indicators for when all points are off the scale
      const offScaleToRightText = new RichText( pointsOffScaleString, {
        font: OFF_SCALE_INDICATOR_FONT,
        align: 'left'
      } );
      const offScaleToRightArrow = new ArrowNode( 0, 0, OFF_SCALE_ARROW_LENGTH, 0, OFF_SCALE_ARROW_OPTIONS );
      const pointsOffScaleToRightIndicator = new Panel(
        new HBox( {
          children: [ offScaleToRightText, offScaleToRightArrow ],
          spacing: OFF_SCALE_HBOX_SPACING
        } ),
        merge( {}, COMMON_OFF_SCALE_PANEL_OPTIONS )
      );
      this.addChild( pointsOffScaleToRightIndicator );

      const offScaleToLeftText = new RichText( pointsOffScaleString, {
        font: OFF_SCALE_INDICATOR_FONT,
        align: 'right'
      } );
      const offScaleToLeftArrow = new ArrowNode( 0, 0, -OFF_SCALE_ARROW_LENGTH, 0, OFF_SCALE_ARROW_OPTIONS );
      const pointsOffScaleToLeftIndicator = new Panel(
        new HBox( {
          children: [ offScaleToLeftArrow, offScaleToLeftText ],
          spacing: OFF_SCALE_HBOX_SPACING
        } ),
        merge( {}, COMMON_OFF_SCALE_PANEL_OPTIONS )
      );
      this.addChild( pointsOffScaleToLeftIndicator );

      // function closure to update the position and visibility of each of the points-off-scale indicators
      const updatePointsOffScaleIndicators = () => {

        const displayedRange = numberLine.displayedRangeProperty.value;

        // positions
        pointsOffScaleToLeftIndicator.centerX = numberLine.valueToModelPosition( displayedRange.min ).x;
        pointsOffScaleToLeftIndicator.bottom = numberLine.centerPositionProperty.value.y -
          OFF_SCALE_INDICATOR_HEIGHT_ABOVE_LINE;
        pointsOffScaleToRightIndicator.centerX = numberLine.valueToModelPosition( displayedRange.max ).x;
        pointsOffScaleToRightIndicator.bottom = pointsOffScaleToLeftIndicator.bottom;

        // visibility TODO: determine whether this needs to be all points below or above instead of at least one point
        pointsOffScaleToLeftIndicator.visible = numberLine.residentPoints.length > 0 && !numberLine.residentPoints.some(
          point => point.valueProperty.value >= displayedRange.min
        );
        pointsOffScaleToRightIndicator.visible = numberLine.residentPoints.length > 0 && !numberLine.residentPoints.some(
          point => point.valueProperty.value <= displayedRange.max
        );
      };

      // hook up the listener that will update the points-off-scale indicators
      Property.multilink(
        [ numberLine.displayedRangeProperty, numberLine.centerPositionProperty ],
        updatePointsOffScaleIndicators
      );

      numberLine.residentPoints.addItemAddedListener( addedPoint => {
        addedPoint.valueProperty.link( updatePointsOffScaleIndicators );
      } );
      numberLine.residentPoints.addItemRemovedListener( removedPoint => {
        if ( removedPoint.valueProperty.hasListener( updatePointsOffScaleIndicators ) ) {
          removedPoint.valueProperty.unlink( updatePointsOffScaleIndicators );
        }
      } );
    }
  }

  /**
   * method to add a tick mark, which consists of a short line and a numerical label, to the provided parent node for
   * the provided value
   * @param {Node} parentNode
   * @param {number} value
   * @param {boolean} addLabel
   * @private
   */
  addTickMark( parentNode, value, addLabel ) {

    // the value for zero is a special case, and uses a longer and thicker tick mark
    const length = value === 0 ? this.options.zeroTickMarkLength : this.options.tickMarkLength;
    const lineWidth = value === 0 ? this.options.zeroTickMarkLineWidth : this.options.tickMarkLineWidth;
    const tickMarkOptions = {
      stroke: this.options.color,
      lineWidth: lineWidth
    };

    // calculate the center position of the tick mark, scaled but not translated
    const tmCenter = this.numberLine.valueToModelPosition( value ).minus( this.numberLine.centerPositionProperty.value );

    // create label
    let labelNode;
    if ( addLabel ) {
      labelNode = StringUtils.fillIn( this.options.numericalLabelTemplate, { value: Math.abs( value ) } );
      if ( value < 0 ) {
        labelNode = MathSymbols.UNARY_MINUS + labelNode;
      }
    }

    let tickMark;
    let tickLabelOptions;
    if ( this.numberLine.isHorizontal ) {
      tickMark = new Line( tmCenter.x, tmCenter.y - length, tmCenter.x, tmCenter.y + length, tickMarkOptions );
      if ( this.options.tickMarkLabelPositionWhenHorizontal === 'above' ) {
        tickLabelOptions = {
          centerX: tickMark.centerX,
          bottom: tickMark.top - TICK_MARK_LABEL_DISTANCE
        };
      }
      else {
        tickLabelOptions = {
          centerX: tickMark.centerX,
          top: tickMark.bottom + TICK_MARK_LABEL_DISTANCE
        };
      }
    }
    else {
      tickMark = new Line( tmCenter.x - length, tmCenter.y, tmCenter.x + length, tmCenter.y, tickMarkOptions );
      if ( this.options.tickMarkLabelPositionWhenVertical === 'left' ) {
        tickLabelOptions = {
          right: tickMark.left - 5,
          centerY: tickMark.centerY
        };
      }
      else {
        tickLabelOptions = {
          left: tickMark.right + 5,
          centerY: tickMark.centerY
        };
      }
    }
    parentNode.addChild( tickMark );
    labelNode && parentNode.addChild( new Text(
      labelNode,
      merge( tickLabelOptions, this.options.tickMarkLabelOptions )
    ) );
  }
}

numberLineCommon.register( 'SpatializedNumberLineNode', SpatializedNumberLineNode );
export default SpatializedNumberLineNode;
