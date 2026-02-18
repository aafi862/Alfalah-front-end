"use client";

import Button from "@/src/components/common/Button";

export default function DataTablePagination({ table }) {
    const {
        pageIndex,
        pageSize,
    } = table.getState().pagination;

    const totalRows = table.getFilteredRowModel().rows.length;
    const totalPages = table.getPageCount();

    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min(
        (pageIndex + 1) * pageSize,
        totalRows
    );

    return (
        <div className="flex items-center justify-between px-4 py-3 border-t">

            {/* Left Side Info */}
            <div className="text-sm text-muted-foreground">
                Showing <strong>{startRow}</strong>–<strong>{endRow}</strong> of{" "}
                <strong>{totalRows}</strong>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2">

                <span className="text-sm">
                    Page <strong>{pageIndex + 1}</strong> of{" "}
                    <strong>{totalPages}</strong>
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(totalPages - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </Button>
            </div>
        </div>
    );
}
