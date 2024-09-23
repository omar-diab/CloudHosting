import Link from "next/link";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  let pagesArray: number[] = [];

  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className="flex items-center justify-center mt-7 mb-7">
      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="me-2 border border-gray-700 text-gray-700 py-2 px-4 rounded-lg font-bold text-xl cursor-pointer hover:bg-gray-200 transition max-sm:hidden"
        >
          Prev
        </Link>
      )}
      {pagesArray.map((page) => (
        <div className="p-1"> 
          <Link
            href={`${route}?pageNumber=${page}`}
            key={page}
            className={`${
              pageNumber === page ? "bg-gray-400 text-white" : ""
            } border border-gray-700 text-gray-700 py-2 px-4 rounded-lg font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
          >
            {page}
          </Link>
        </div>
      ))}
      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="ms-2 border border-gray-700 text-gray-700 py-2 px-4 rounded-lg font-bold text-xl cursor-pointer hover:bg-gray-200 transition max-sm:hidden"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
