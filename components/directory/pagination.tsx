"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 12,
  onPageChange,
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-6">
      {/* Items Info */}
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{startItem}</span> to{" "}
        <span className="font-medium text-foreground">{endItem}</span> of{" "}
        <span className="font-medium text-foreground">{totalItems}</span> results
      </p>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Previous Button */}
        <Button
          size="sm"
          variant="ghost"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="gap-1 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {generatePageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-2 py-1.5 text-xs text-muted-foreground">...</span>
              ) : (
                <Button
                  size="sm"
                  variant={currentPage === page ? "default" : "ghost"}
                  onClick={() => {
                    if (typeof page === "number") {
                      onPageChange?.(page);
                    }
                  }}
                  className="min-w-9 h-9 px-0 cursor-pointer font-semibold"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Page Info */}
        <div className="flex sm:hidden items-center gap-2 text-sm text-muted-foreground">
          Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
          <span className="font-medium text-foreground">{totalPages}</span>
        </div>

        {/* Next Button */}
        <Button
          size="sm"
          variant="ghost"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="gap-1 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
