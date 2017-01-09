/*
 * Copyright 2016 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

module.exports = function($q, AnalyticsService, OSDialogService, SelectionStateModel, SupportedFormatsModel) {

  this.formats = SupportedFormatsModel;

  this.take = (image) => {
    this.isHoverState = false;
    this.hoverLayer = 0;

    if (!SupportedFormatsModel.isSupportedImage(image.path)) {
      OSDialogService.showError('Invalid image', `${image.path} is not a supported image type.`);
      AnalyticsService.logEvent('Invalid image', image);

      return;
    }

    SelectionStateModel.setImage(image);

    // An easy way so we can quickly identify if we're making use of
    // certain features without printing pages of text to DevTools.
    image.logo = Boolean(image.logo);
    image.bmap = Boolean(image.bmap);

    AnalyticsService.logEvent('Select image', image);
  };

  this.isHoverState = false;

  this.hoverLayer = 0;

  this.hasOverlay = true;
};
