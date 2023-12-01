// Copyright 2023, University of Colorado Boulder

/**
 * NumberLinePortrayal defines the common properties for each character set in the Number Line Suite.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RegionAndCulturePortrayal from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import numberLineCommon from '../../numberLineCommon.js';


export default class NumberLinePortrayal extends RegionAndCulturePortrayal {

  /**
   *
   * @param { LocalizedStringProperty } label
   * @param { HTMLImageElement } screenHomeIcon
   * @param { HTMLImageElement } screenNavIcon
   * @param { string } queryParameterValue
   */
  constructor( label, screenHomeIcon, screenNavIcon, queryParameterValue ) {
   super( label, queryParameterValue, {} );

    this.screenHomeIcon = screenHomeIcon;
    this.screenNavIcon = screenNavIcon;
  }
}

numberLineCommon.register( 'NumberLinePortrayal', NumberLinePortrayal );