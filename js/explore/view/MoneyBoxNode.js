// Copyright 2020-2023, University of Colorado Boulder

/**
 * a node that represents a piggy bank
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Saurabh Totey
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import { Color, Image, Node, Path } from '../../../../scenery/js/imports.js';
import moneyBoxNoDecoration_png from '../../../images/moneyBoxNoDecoration_png.js';
import moneyBoxWithFlowers_png from '../../../images/moneyBoxWithFlowers_png.js';
import moneyBoxWithLightning_png from '../../../images/moneyBoxWithLightning_png.js';
import numberLineCommon from '../../numberLineCommon.js';
import MoneyBoxDecoration from '../model/MoneyBoxDecoration.js';
import MoneyBoxShapes from './MoneyBoxShapes.js';

// constants
const MAP_DECORATION_TYPE_TO_IMAGE_INFO = new Map();
MAP_DECORATION_TYPE_TO_IMAGE_INFO.set( MoneyBoxDecoration.NONE, moneyBoxNoDecoration_png );
MAP_DECORATION_TYPE_TO_IMAGE_INFO.set( MoneyBoxDecoration.FLOWERS, moneyBoxWithFlowers_png );
MAP_DECORATION_TYPE_TO_IMAGE_INFO.set( MoneyBoxDecoration.LIGHTNING, moneyBoxWithLightning_png );

class MoneyBoxNode extends Node {

  /**
   * @param {Object} [options]
   * @public
   */
  constructor( options ) {

    options = merge( {
      fill: 'rgba( 0, 0, 0, 0 )', // initially transparent so that it is invisible but has size
      lineWidth: 0,
      decorationType: MoneyBoxDecoration.FLOWERS
    }, options );

    const piggyBankOutlineNode = new Path( MoneyBoxShapes.MEDIUM_MONEY_BOX_SHAPE, {
      fill: options.fill,
      lineWidth: 0.5,
      stroke: Color.BLACK,
      center: Vector2.ZERO
    } );
    const overlayImage = new Image(
      MAP_DECORATION_TYPE_TO_IMAGE_INFO.get( options.decorationType ),
      { opacity: 0.9 }
    );
    overlayImage.setScaleMagnitude( piggyBankOutlineNode.width / overlayImage.width );
    overlayImage.center = Vector2.ZERO;
    options.children = [ piggyBankOutlineNode, overlayImage ];
    super( options );

    // @private
    this.outline = piggyBankOutlineNode;
  }

  /**
   * @returns {ColorDef} the color of this piggy bank's fill
   * @public
   */
  getFill() {
    return this.outline.fill;
  }

  get fill() { return this.getFill(); }

  /**
   * @param {ColorDef} fill
   * @public
   */
  setFill( fill ) {
    this.outline.fill = fill;
  }

  set fill( fill ) { this.setFill( fill ); }
}

numberLineCommon.register( 'MoneyBoxNode', MoneyBoxNode );
export default MoneyBoxNode;