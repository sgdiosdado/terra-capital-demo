import {
  type RowData,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Dialog } from '../shared/dialog'
import * as Table from '../shared/table'
import { currencyFormatter } from '../shared/formatters'
import { Pill } from '../shared/pill'
import {
  usePendingSpendings,
  type PendingSpendings,
} from './usePendingSpendings'
import { Field, Label, Input } from '../shared/forms'
import { FormEvent, SyntheticEvent } from 'react'
import { Button } from '../shared/button'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right'
  }
}

const columnHelper = createColumnHelper<PendingSpendings>()

const columns = [
  columnHelper.accessor('development', {
    header: () => 'Desarrollo',
  }),
  columnHelper.accessor('price', {
    header: () => 'Precio sin descuento',
    cell: info => currencyFormatter.format(info.getValue()),
    meta: {
      align: 'right',
    },
  }),
  columnHelper.accessor('discount', {
    header: () => 'Descuento',
    cell: info => currencyFormatter.format(info.getValue()),
    meta: {
      align: 'right',
    },
  }),
  columnHelper.accessor('saleType', {
    header: () => 'Tipo de venta',
    cell: info => (
      <Pill variant={info.getValue() === 'financiado' ? 'danger' : undefined}>
        {info.getValue()}
      </Pill>
    ),
  }),
]

export function Pending() {
  const { data } = usePendingSpendings()

  const table = useReactTable<PendingSpendings>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    console.log(data)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>Por aprobar 🗄️</h1>
      <Table.Root>
        <Table.Table>
          <Table.Caption>💰 Ventas</Table.Caption>
          <Table.Head>
            {table.getHeaderGroups().map(group => (
              <Table.Row key={group.id}>
                {group.headers.map(header => (
                  <Table.Heading key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Table.Heading>
                ))}
              </Table.Row>
            ))}
          </Table.Head>
          <Table.Body>
            {table.getRowModel().rows.map(row => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <Table.Cell
                    key={cell.id}
                    align={cell.column.columnDef.meta?.align}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Table>
      </Table.Root>

      <Dialog trigger={<button type="button">Detalle de gasto</button>}>
        <form onSubmit={onSubmit}>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" />
          </Field>

          <Field>
            <Label htmlFor="contract">Contract No.</Label>
            <Input type="number" id="contract" name="contract" />
          </Field>

          <Button type='submit'>Save</Button>
        </form>
      </Dialog>
    </div>
  )
}
