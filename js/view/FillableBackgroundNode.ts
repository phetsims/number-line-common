// Copyright 2023, University of Colorado Boulder

/**
 * Base class for the MoneyJarNode and FillableBagNode. This class provides access to the outlines
 * Path fill so that it can be set in the TotalValueIndicatorNode.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions, Path, TPaint } from '../../../scenery/js/imports.js';
import numberLineOperations from '../../../number-line-operations/js/numberLineOperations.js';

export default class FillableBackgroundNode extends Node {

  protected outline: Path;
  public constructor( outline: Path, providedOptions: NodeOptions ) {
   super( providedOptions );

   this.outline = outline;
  }

  public getFill(): TPaint {
    return this.outline.fill;
  }

  public get fill(): TPaint { return this.getFill(); }

  public set fill( fill: TPaint ) { this.setFill( fill ); }

  public setFill( fill: TPaint ): void {
    this.outline.fill = fill;
  }

}

numberLineOperations.register( 'FillableBackgroundNode', FillableBackgroundNode );