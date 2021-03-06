// Copyright 2020, University of Colorado Boulder

/**
 * enum of possible decoration values for the piggy banks
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import numberLineCommon from '../../numberLineCommon.js';

const PiggyBankDecoration = Enumeration.byKeys( [ 'NONE', 'LIGHTNING', 'FLOWERS' ] );
numberLineCommon.register( 'PiggyBankDecoration', PiggyBankDecoration );
export default PiggyBankDecoration;