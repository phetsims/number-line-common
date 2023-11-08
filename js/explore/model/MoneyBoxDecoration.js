// Copyright 2020-2022, University of Colorado Boulder

/**
 * enum of possible decoration values for the piggy banks
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import numberLineCommon from '../../numberLineCommon.js';

const MoneyBoxDecoration = EnumerationDeprecated.byKeys( [ 'NONE', 'LIGHTNING', 'FLOWERS' ] );
numberLineCommon.register( 'MoneyBoxDecoration', MoneyBoxDecoration );
export default MoneyBoxDecoration;