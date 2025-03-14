import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import React from "react"
import Flatpickr from "react-flatpickr"
import Select from "react-select"
import { Input, Spinner, Table } from "reactstrap"

const TableCommon = ({
  columns,
  data,
  showSearch,
  searchValues,
  setSearchValues,
  showCheckbox,
  selectedRows = [],
  setSelectedRows,
  loading
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const handleCheckboxChange = (id) => {
    const newSelectedRows = [...selectedRows]
    const index = newSelectedRows.indexOf(id)
    if (index >= 0) {
      newSelectedRows.splice(index, 1)
    } else {
      newSelectedRows.push(id)
    }
    if (setSelectedRows) {
      setSelectedRows(newSelectedRows)
    }
  }

  const handleSearchChange = (key, value) => {
    setSearchValues((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const renderSearchInput = (header) => {
    if (header.column.columnDef.meta?.allowSearch) {
      const searchType = header.column.columnDef.meta?.searchType
      if (searchType === "select") {
        return <Select value={""} onChange={() => {}} options={[]} />
      } else if (searchType === "date") {
        return <Flatpickr className="form-control" options={{ dateFormat: "d/m/Y" }} placeholder="" />
      }
      return (
        <Input
          value={searchValues[header.id] || ""}
          onChange={(e) => handleSearchChange(header.id, e.target.value)}
        />
      )
    }
  }

  return (
    <div className="table-container table-responsive">
      {loading && (
        <div className="table-spinner-mask">
          <Spinner color="primary" className="table-spinner" />
        </div>
      )}
      <Table hover className="table-nowrap">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              <tr className="table-active">
                {showCheckbox && (
                  <th className="th-checkbox">
                    <Input
                      type="checkbox"
                      checked={selectedRows.length === data.length}
                      onChange={() => {
                        const allRowIds = data.map((item) => item.id)
                        setSelectedRows(selectedRows.length === data.length ? [] : allRowIds)
                      }}
                    />
                  </th>
                )}
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: `${header.getSize()}%` }}
                    className="table-th"
                  >
                    <span className="pe-2">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </span>
                  </th>
                ))}
              </tr>
              {showSearch && (
                <tr className="table-active">
                  {showCheckbox && <th></th>}
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan} style={{ width: `${header.getSize()}%` }}>
                      {renderSearchInput(header)}
                    </th>
                  ))}
                </tr>
              )}
            </React.Fragment>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {showCheckbox && (
                  <td>
                    <Input
                      type="checkbox"
                      checked={selectedRows.indexOf(row.original.id) >= 0}
                      onChange={() => handleCheckboxChange(row.original.id)}
                    />
                  </td>
                )}
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ width: `${cell.column.getSize()}%` }} className="table-td">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default TableCommon
