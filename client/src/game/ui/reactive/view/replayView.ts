/* eslint-disable import/prefer-default-export */

import globals from '../../globals';

export function onActiveChanged(active: boolean, previousActive: boolean | undefined) {
  if (!active && previousActive) {
    // We are exiting from a replay
    if (globals.store!.getState().premove.action !== null) {
      globals.elements.premoveCancelButton!.show();
    }

    globals.layers.UI.batchDraw();
  }
}