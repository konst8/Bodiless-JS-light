/**
 * Copyright © 2021 Johnson & Johnson
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

import React from 'react';
import flow from 'lodash/flow';

import { render } from 'enzyme';
import { withMockNode } from './helpers/MockContentNode';
import { asEditable } from '../src';

describe('asEditable', () => {
  describe('When not editable', () => {
    it('Invokes a sanitizer', () => {
      const data = {
        text: 'Now is the time',
      };
      const sanitizer = (text: string) => text.replace(/i/g, '*');
      const useOverrides = () => ({ sanitizer });
      const Test = flow(
        asEditable('foo', 'Foo', useOverrides),
        withMockNode(data),
      )('apan');
      const wrapper = render(<Test />);
      expect(wrapper.text()).toBe('Now *s the t*me');
    });
  });
});
