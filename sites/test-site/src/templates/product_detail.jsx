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

import React from 'react';
import { flow } from 'lodash';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withNode } from '@bodiless/core';
import {
  addProps,
  withDesign,
  replaceWith,
  removeClasses,
} from '@bodiless/fclasses';
import {
  AccordionClean,
  asTestableAccordion,
} from '@bodiless/accordion';
import Layout from '../components/Layout';
import {
  ProductTitle,
  ProductImage,
  SectionMargin,
  SectionNegXMargin,
  ProductDetailImageWrapper,
  ProductDetailAccWrapper,
} from '../components/Product';
import { FlowContainerDefault } from '../components/FlowContainer';
import { withEditorBasic } from '../components/Editors';
import { asSingleAccordionDefaultStyle } from '../components/SingleAccordion/token';
import SocialShare from '../components/SocialShare';

// Do not allow editors to set accordion titles.
const NonEditableTitle = ({ producttitle, ...rest }) => (
  <h2 {...rest}>
    {producttitle}
  </h2>
);

const asTestableProductAccordion = label => flow(
  asTestableAccordion,
  withDesign({
    Wrapper: addProps({ 'aria-label': label }),
  }),
);

const asProductAccordion = title => flow(
  withNode,
  asSingleAccordionDefaultStyle,
  withDesign({
    Wrapper: removeClasses('p-1'),
    Title: withDesign({
      Wrapper: removeClasses('text-2xl'),
      Label: replaceWith(props => <NonEditableTitle {...props} producttitle={title} />),
    }),
    Body: withDesign({
      Content: withEditorBasic(
        'body',
        'Enter Product Information',
      ),
    }),
  }),
  asTestableProductAccordion(title),
);

const ProductOverAcc = asProductAccordion('Overview')(AccordionClean);
const ProductDirsAcc = asProductAccordion('Directions')(AccordionClean);
const ProductHowAcc = asProductAccordion('How To Use')(AccordionClean);
const ProductNutAcc = asProductAccordion('Nutrition')(AccordionClean);
const ProductActIngAcc = asProductAccordion('Active Ingredients')(AccordionClean);
const ProductInactIngAcc = asProductAccordion('Inactive Ingredients')(AccordionClean);
const ProductStorAcc = asProductAccordion('Storage')(AccordionClean);
const ProductWarnAcc = asProductAccordion('Warnings')(AccordionClean);

const asTestableRatingsSummary = addProps({ 'data-product-element': 'ratings-summary' });

const asTestableProductReviews = addProps({ 'data-product-element': 'reviews' });

const asTestableFlowContainer = withDesign({
  Wrapper: addProps({ 'data-product-element': 'flow-container' }),
});
const ProductFlowContainer = asTestableFlowContainer(FlowContainerDefault);

const main = props => (
  <Page {...props}>
    <Layout>
      <SectionMargin>
        <div className="flex flex-wrap md:items-end md:flex-row-reverse">
          <SocialShare />
          <div className="w-full md:flex-1">
            <ProductTitle />
          </div>
        </div>
      </SectionMargin>
      <SectionMargin>
        <div className="flex flex-wrap">
          <ProductDetailImageWrapper>
            <ProductImage />
          </ProductDetailImageWrapper>
          <ProductDetailAccWrapper>
            <ProductOverAcc expanded nodeKey="accordion-1" />
            <ProductDirsAcc nodeKey="accordion-2" />
            <ProductHowAcc nodeKey="accordion-3" />
            <ProductNutAcc nodeKey="accordion-4" />
            <ProductActIngAcc nodeKey="accordion-5" />
            <ProductInactIngAcc nodeKey="accordion-6" />
            <ProductStorAcc nodeKey="accordion-7" />
            <ProductWarnAcc nodeKey="accordion-8" />
          </ProductDetailAccWrapper>
        </div>
      </SectionMargin>
      <SectionNegXMargin>
        <ProductFlowContainer
          nodeKey="product_cards"
          maxComponents={3}
        />
      </SectionNegXMargin>
    </Layout>
  </Page>
);
export default main;

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
    allSite(filter: {pathPrefix: {eq: $slug}}) {
      edges {
        node {
          buildTime
        }
      }
    }
  }
`;
