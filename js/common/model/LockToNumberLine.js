// Copyright 2020, University of Colorado Boulder

/**
 * Represents when a point controller should lock to a number line
 * Is passed in to point controllers as an option during construction
 *
 * @author Saurabh Totey
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import numberLineCommon from '../../numberLineCommon.js';

// @public
const LockToNumberLine = Enumeration.byKeys( [ 'ALWAYS', 'NEVER', 'WHEN_CLOSE' ] );

numberLineCommon.register( 'LockToNumberLine', LockToNumberLine );
export default LockToNumberLine;