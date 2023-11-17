// Copyright 2023, University of Colorado Boulder

/**
 * NumberLineCharacterSet defines the common properties for each character set in the Number Line Suite.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RegionAndCulturePortrayal from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import numberLineCommon from '../../numberLineCommon.js';


export default class NumberLineCharacterSet extends RegionAndCulturePortrayal {

  /**
   *
   * @param { Image } headshotIcon
   * @param { LocalizedStringProperty } label
   * @param { HTMLImageElement } screenHomeIcon
   * @param { HTMLImageElement } screenNavIcon
   * @param { string } queryParameterValue
   */
  constructor( headshotIcon, label, screenHomeIcon, screenNavIcon, queryParameterValue ) {
   super( headshotIcon, label, queryParameterValue, {} );

    this.screenHomeIcon = screenHomeIcon;
    this.screenNavIcon = screenNavIcon;
  }
}

numberLineCommon.register( 'NumberLineCharacterSet', NumberLineCharacterSet );