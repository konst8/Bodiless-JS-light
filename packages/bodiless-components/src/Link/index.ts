/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import asBodilessLink, { withoutLinkWhenLinkDataEmpty, useIsLinkDisabled } from './asBodilessLink';
import type { NormalHref } from './NormalHref';
import type { AsBodilessLink, LinkData, Props } from './types';
import DefaultNormalHref from './NormalHref';
import useEmptyLinkToggle from './useEmptyLinkToggle';
import useGetLinkHref from './useGetLinkHref';

export {
  asBodilessLink,
  DefaultNormalHref,
  withoutLinkWhenLinkDataEmpty,
  useIsLinkDisabled,
  useEmptyLinkToggle,
  useGetLinkHref,
};
export type {
  NormalHref,
  AsBodilessLink,
  LinkData,
  Props as BodilessLinkProps,
};
