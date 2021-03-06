// Copyright 2020, University of Colorado Boulder

/**
 * Represents when a SpatializedNumberLineNode shows its points off scale indicator
 * SOME and ALL refer to how many points need to be off the scale on that side for the indicator to show up
 * NEVER means the indicator is never shown
 * SOME means the indicator is shown when at least one point is off on a side
 * ALL means that the indicator is only shown when all points are off on the same side
 *
 * @author Saurabh Totey
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import numberLineCommon from '../../numberLineCommon.js';

// @public
const PointsOffScaleCondition = Enumeration.byKeys( [ 'NEVER', 'SOME', 'ALL' ] );

numberLineCommon.register( 'PointsOffScaleCondition', PointsOffScaleCondition );
export default PointsOffScaleCondition;
