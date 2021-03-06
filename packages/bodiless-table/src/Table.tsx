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

import React, { ComponentType, FunctionComponent, HTMLProps } from 'react';
import {
  designable,
  StylableProps,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Div,
} from '@bodiless/fclasses';
import {
  Section,
  TableProps,
  TableSectionProps,
  TableComponents,
} from './types';
import TableContext, {
  TableColumnContext,
  TableRowContext,
  TableSectionContext,
  useTableSectionContext,
} from './TableContext';

const DefaultCell = (props:HTMLProps<StylableProps>) => {
  const section = useTableSectionContext();
  const Cell = section === Section.head
    ? Th as ComponentType<StylableProps>
    : Td as ComponentType<StylableProps>;
  return <Cell {...props} />;
};
const tableComponentsStart:TableComponents = {
  Wrapper: Div,
  Table,
  TBody: Tbody,
  THead: Thead,
  TFoot: Tfoot,
  Row: Tr,
  Cell: DefaultCell,
  CellContent: Div,
};
const TableSection = (props:TableSectionProps) => {
  const {
    Table,
    Row,
    Cell,
    CellContent,
    rows,
    section,
    columns,
  } = props;
  return (
    <TableSectionContext.Provider value={section}>
      <Table>
        {(rows || []).map((row, rowIndex) => (
          <TableRowContext.Provider key={String(`row-${row}`)} value={{ name: row, index: rowIndex }}>
            <Row
              key={row}
            >
              {(columns || []).map((column, columnIndex) => (
                <TableColumnContext.Provider key={String(`column-${column}`)} value={{ name: column, index: columnIndex }}>
                  <Cell
                    // We want to refresh this component when any of this change
                    key={String(`${rowIndex}${columnIndex}${row}${column}`)}
                  >
                    <CellContent />
                  </Cell>
                </TableColumnContext.Provider>
              ))}
            </Row>
          </TableRowContext.Provider>
        ))}
      </Table>
    </TableSectionContext.Provider>
  );
};

const TableBase:FunctionComponent<TableProps> = (props) => {
  const {
    columns,
    footRows,
    headRows,
    rows,
    components,
    ...rest
  } = props;
  const {
    Wrapper,
    Table,
    TBody,
    THead,
    TFoot,
    Row,
    Cell,
    CellContent,
  } = components;
  return (
    <TableContext.Provider value={{
      columns,
      rows,
      headRows,
      footRows,
    }}
    >
      <Wrapper>
        <Table {...rest}>
          <TableSection
            {...{
              Table: THead,
              Row,
              Cell,
              CellContent,
              section: Section.head,
              rows: headRows,
              columns,
            }}
          />
          <TableSection
            {...{
              Table: TBody,
              Row,
              Cell,
              CellContent,
              section: Section.body,
              rows,
              columns,
            }}
          />
          <TableSection
            {...{
              Table: TFoot,
              Row,
              Cell,
              CellContent,
              section: Section.foot,
              rows: footRows,
              columns,
            }}
          />
        </Table>
      </Wrapper>
    </TableContext.Provider>
  );
};
const CleanTable = designable(tableComponentsStart, 'Table')(TableBase);

export default CleanTable;
