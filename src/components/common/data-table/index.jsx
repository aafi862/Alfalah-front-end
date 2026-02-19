"use client";

import { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";

import DataTablePagination from "./DataTablePagination";
import Input from "@/src/components/common/Input";
import { LoaderIcon, Edit2, Trash2, Plus } from "lucide-react";
import Button from "@/src/components/common/Button";

export default function DataTable({
    columns = [],
    data = [],
    loading = false,
    pageSizeOptions = [5, 10, 20, 50],
    enableEdit = false,
    onEdit,
    enableDelete = false,
    onDelete,
    enableAdd = false,
    onAdd,
}) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState({});

    // Filter data
    const filteredData = useMemo(() => {
        let filtered = [...data];

        // Global search
        if (globalFilter) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((val) =>
                    String(val).toLowerCase().includes(globalFilter.toLowerCase())
                )
            );
        }

        // Column filters
        Object.entries(columnFilters).forEach(([key, value]) => {
            if (value) {
                filtered = filtered.filter((row) =>
                    String(row[key]).toLowerCase().includes(value.toLowerCase())
                );
            }
        });

        return filtered;
    }, [data, globalFilter, columnFilters]);

    // Setup table
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    // Render action buttons for a row
    const renderRowActions = (row) => (
        <div className="flex items-center space-x-1">
            {enableEdit && onEdit && (
                <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent p-2"
                    onClick={() => onEdit(row)}
                    title="Edit"
                >
                    <Edit2 className="h-4 w-4" />
                </Button>
            )}
            {enableDelete && onDelete && (
                <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent p-2"
                    onClick={() => onDelete(row)}
                    title="Delete"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
            {enableAdd && onAdd && (
                <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent p-2"
                    onClick={() => onAdd(row)}
                    title="Add"

                >
                    <Plus className="h-4 w-4" />
                </Button>
            )}
        </div>
    );

    return (
        <div className="py-4">
            {/* Global search */}
            <div className="flex justify-end mb-2 rounded">
                <Input
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-64 bg-white rounded-lg"
                />
            </div>

            {/* Table */}
            <div className="px-4 py-2 mb-2 rounded-md border bg-white shadow-sm overflow-x-auto">
                <Table >
                    {/* Header */}
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="px-2 py-2 text-left font-medium"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}

                        {/* Column filters */}
                        <TableRow>
                            {table.getHeaderGroups()[0].headers.map((header) => (
                                <TableCell key={header.id}>
                                    {header.column.id !== "actions" && (
                                        <Input
                                            size="sm"
                                            placeholder={`Filter ${header.column.id}`}
                                            value={columnFilters[header.column.id] || ""}

                                            onChange={(e) =>
                                                setColumnFilters((prev) => ({
                                                    ...prev,
                                                    [header.column.id]: e.target.value,
                                                }))
                                            }
                                        />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>

                    {/* Body */}
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <div className="flex items-center justify-center h-32">
                                        <LoaderIcon
                                            role="status"
                                            aria-label="Loading"
                                            className="h-10 w-10 animate-spin text-primary"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        if (cell.column.id === "actions") {
                                            return (
                                                <TableCell key={cell.id}>
                                                    {renderRowActions(row.original)}
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell key={cell.id} className="pl-2 h-14">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-4">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
        </div>
    );
}
