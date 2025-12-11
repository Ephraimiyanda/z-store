"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationBlockProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export function PaginationBlock({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBlockProps) {
  // If there is only 1 page (or 0), don't show pagination
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="mt-auto py-8 w-full flex justify-center">
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* Page Numbers Logic */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;

            // Logic: Show First, Last, Current, and Neighbors (Current +/- 1)
            const isFirst = pageNumber === 1;
            const isLast = pageNumber === totalPages;
            const isCurrent = pageNumber === currentPage;
            const isNeighbor =
              pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1;

            // Render Number
            if (isFirst || isLast || isNeighbor) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={isCurrent}
                    onClick={() => handlePageChange(pageNumber)}
                    className="cursor-pointer"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            // Render Ellipsis (...)
            // Show ellipsis if there is a gap between the current logic block and the ends
            if (
              (pageNumber === currentPage - 2 && pageNumber > 1) ||
              (pageNumber === currentPage + 2 && pageNumber < totalPages)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return null;
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
