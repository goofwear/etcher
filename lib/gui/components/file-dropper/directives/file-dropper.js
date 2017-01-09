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

/**
 * @summary File-dropper directive
 * @function
 * @public
 *
 * @description
 * This directive provides an easy way to drop files into Etcher.
 *
 * @param {Object} $timeout - Angular timeout object.
 * @returns {Object}
 *
 * @example
 * <file-dropper></file-dropper>
 */
module.exports = ($timeout) => {
  return {
    templateUrl: './components/file-dropper/templates/file-dropper.tpl.html',
    replace: false,
    restrict: 'EA',
    controller: 'FileDropperController as dropper',
    transclude: true,
    scope: {
      hasOverlay: '='
    },
    link: (scope, element) => {
      scope.dropper.hasOverlay = scope.hasOverlay;

      element[0].ondragover = (event) => {
        event.preventDefault();
        $timeout(() => {
          scope.dropper.isHoverState = true;
        });
      };

      element[0].ondragend = (event) => {
        event.preventDefault();
        $timeout(() => {
          scope.dropper.isHoverState = false;
        });
      };

      element[0].ondragleave = (event) => {
        event.preventDefault();
        scope.dropper.hoverLayer -= 1;

        if (scope.dropper.hoverLayer === 0) {
          $timeout(() => {
            scope.dropper.isHoverState = false;
          });
        }
      };

      element[0].ondragenter = (event) => {
        event.preventDefault();
        scope.dropper.hoverLayer += 1;
      };
    }
  };
};
