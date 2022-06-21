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

import { ComponentType } from 'react';
import { configure } from 'mobx';
import PageContextProvider, { withMenuOptions, useRegisterMenuOptions } from './PageContextProvider';
import PageEditContext from './PageEditContext';
import asStatic from './asStatic';
import asReadOnly from './asReadOnly';
import {
  useEditContext, useUUID, useContextActivator, useExtendHandler,
  useGetter, useLocalStorage, useClickOutside,
} from './hooks';
import withNode, { withNodeKey } from './withNode';
import withSidecarNodes, { startSidecarNodes, endSidecarNodes } from './withSidecarNodes';
import withEditButton, { createMenuOptionGroup } from './withEditButton';
import useContextMenuForm, { contextMenuForm, ContextMenuForm } from './contextMenuForm';
import type { FormBodyProps, FormBodyRenderer } from './contextMenuForm';
import withCompoundForm, { useRegisterSnippet } from './withCompoundForm';
import withEditFormSnippet, { useEditFormProps } from './withEditFormSnippet';
import type { Options as EditFormSnippetOptions } from './withEditFormSnippet';
import withData from './withData';
import NodeProvider, { useNode, useNodeDataHandlers } from './NodeProvider';
import type { NodeDataHandlers } from './NodeProvider';
import { DefaultContentNode } from './ContentNode';
import type { ContentNode, Path as ContentNodePath } from './ContentNode';
import {
  withNodeAndHandlers,
  withNodeDataHandlers,
  withLocalContextMenu,
  withContextActivator,
  withExtendHandler,
  withOnlyProps,
  withResizeDetector,
  withClickOutside,
} from './hoc';
import { ifToggledOff, ifToggledOn, withFlowToggle } from './withFlowToggle';
import { ifEditable, ifReadOnly, useEditToggle } from './withEditToggle';
import type {
  ContextMenuFormProps, IContextMenuItemProps, TMenuOption, TooltipProps,
} from './Types/ContextMenuTypes';
import type { PageEditContextInterface } from './PageEditContext/types';
import type {
  OptionGroupDefinition, EditButtonOptions, EditButtonProps, UseBodilessOverrides,
} from './Types/EditButtonTypes';
import type { TMenuOptionGetter, MenuOptionsDefinition } from './Types/PageContextProviderTypes';
import type { WithNodeProps, WithNodeKeyProps } from './Types/NodeTypes';
import type { TOverlaySettings } from './Types/PageOverlayTypes';
import type { Snippet as FormSnippet } from './withCompoundForm';
import {
  ActivateOnEffectProvider,
  withActivateOnEffect,
  useActivateOnEffect,
  useActivateOnEffectActivator,
  withReactivateOnRemount,
} from './ActivateContext';
import withChild, { withAppendChild, withPrependChild } from './withChild';
import withParent from './withParent';
import asBodilessComponent, { withActivatorWrapper } from './asBodilessComponent/asBodilessComponent.bl-edit';
import asBodilessReadOnlyComponent from './asBodilessComponent/asBodilessReadOnlyComponent';
import { withBodilessData } from './asBodilessComponent/withBodilessData';
import type { BodilessOptions, AsBodiless } from './Types/AsBodilessTypes';
import { useMenuOptionUI } from './components/ContextMenuContext';
import ContextSubMenu from './ContextMenu/ContextSubMenu';
import withSwitcherButton from './withSwitcherButton';
import {
  getFromSessionStorage,
  saveToSessionStorage,
} from './SessionStorage';

configure({
  enforceActions: 'never',
});

export * from './components';
export * from './Contentful';
export * from './Store';
export * from './BackendClient';
export * from './Git';

export {
  asBodilessComponent,
  asBodilessReadOnlyComponent,
  withBodilessData,
  asStatic,
  asReadOnly,
  withContextActivator,
  withActivatorWrapper,
  withNodeAndHandlers,
  withNodeDataHandlers,
  withLocalContextMenu,
  PageContextProvider,
  withMenuOptions,
  useRegisterMenuOptions,
  useGetter,
  PageEditContext,
  useEditContext,
  useContextActivator,
  useUUID,
  withEditButton,
  createMenuOptionGroup,
  useEditFormProps,
  withNode,
  withNodeKey,
  withSidecarNodes,
  withCompoundForm,
  withEditFormSnippet,
  useRegisterSnippet,
  startSidecarNodes,
  endSidecarNodes,
  contextMenuForm,
  useContextMenuForm,
  ContextMenuForm,
  ContextSubMenu,
  useMenuOptionUI,
  withData,
  NodeProvider,
  useNode,
  useNodeDataHandlers,
  DefaultContentNode,
  ifEditable,
  ifReadOnly,
  withOnlyProps,
  withResizeDetector,
  withClickOutside,
  ActivateOnEffectProvider,
  withActivateOnEffect,
  useActivateOnEffect,
  useActivateOnEffectActivator,
  withReactivateOnRemount,
  withChild,
  withParent,
  withAppendChild,
  withPrependChild,
  ifToggledOff,
  ifToggledOn,
  withFlowToggle,
  useEditToggle,
  useLocalStorage,
  useClickOutside,
  withExtendHandler,
  useExtendHandler,
  withSwitcherButton,
  getFromSessionStorage,
  saveToSessionStorage,
};

export type {
  ContentNode,
  ContentNodePath,
  BodilessOptions,
  PageEditContextInterface,
  TMenuOption,
  TMenuOptionGetter,
  WithNodeProps,
  WithNodeKeyProps,
  EditButtonOptions,
  FormBodyProps,
  FormBodyRenderer,
  OptionGroupDefinition,
  UseBodilessOverrides,
  EditButtonProps,
  TOverlaySettings,
  ContextMenuFormProps,
  IContextMenuItemProps,
  AsBodiless,
  FormSnippet,
  MenuOptionsDefinition,
  EditFormSnippetOptions,
  NodeDataHandlers,
  TooltipProps,
};

export type Bodiless<P, Q> = (C: ComponentType<P> | string) => ComponentType<Q>;
