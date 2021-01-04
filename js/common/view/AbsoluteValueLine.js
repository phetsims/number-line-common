// Copyright 2020, University of Colorado Boulder

/**
 * A line that is used to denote absolute values
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Saurabh Totey
 */

import Line from '../../../../scenery/js/nodes/Line.js';
import merge from '../../../../phet-core/js/merge.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import numberLineDistance from '../../../../number-line-distance/js/numberLineDistance.js';

class AbsoluteValueLine extends Line {

  /**
   * @param {Node} referenceNode - the node to reference when sizing this line: line matches top and bottom of reference node
   * @param {Object} [options] - options that will be passed to the constructor of the line node
   * @public
   */
  constructor( referenceNode, options ) {
    options = merge( { stroke: 'black' }, options );
    super( new Vector2( 0, referenceNode.top ), new Vector2( 0, referenceNode.bottom ), options );
  }

}

numberLineDistance.register( 'AbsoluteValueLine', AbsoluteValueLine );
export default AbsoluteValueLine;
