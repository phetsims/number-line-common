// Copyright 2023-2024, University of Colorado Boulder

/**
 * NumberLinePortrayal defines the common properties for each portrayal in the Number Line Suite.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RegionAndCulturePortrayal from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import numberLineCommon from '../../numberLineCommon.js';

export default class NumberLinePortrayal extends RegionAndCulturePortrayal {

  /**
   * @param {RegionAndCulture} regionAndCulture
   * @param { HTMLImageElement } screenHomeIcon
   * @param { HTMLImageElement } screenNavIcon
   */
  constructor( regionAndCulture, screenHomeIcon, screenNavIcon ) {
   super( regionAndCulture );

    this.screenHomeIcon = screenHomeIcon;
    this.screenNavIcon = screenNavIcon;
  }
}

numberLineCommon.register( 'NumberLinePortrayal', NumberLinePortrayal );