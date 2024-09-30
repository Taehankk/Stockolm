import React from "react";

interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalItems = 10,
  onPageChange,
  itemsPerPage = 10,
}) => {
  if (!totalItems || itemsPerPage <= 0) {
    return null;
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 0) {
    return null;
  }

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center my-4">
      <button
        className="px-4 py-2 mx-2 bg-gray-200 text-black rounded disabled:opacity-50"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`px-4 py-2 mx-1 ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded hover:bg-blue-300 transition-colors`}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-4 py-2 mx-2 bg-gray-200 text-black rounded disabled:opacity-50"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
