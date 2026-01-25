import { useState } from "react";

export default function Example({
  page,
  pagesize,
  total,
  pagecount,
}: {
  page: number;
  pagesize: number;
  pagecount: number;
  total: number;
}) {
  function getPages(page: number, pagecount: number, delta = 2) {
    const pages: (number | "...")[] = [];

    const rangeStart = Math.max(2, page - delta);
    const rangeEnd = Math.min(pagecount - 1, page + delta);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < pagecount - 1) {
      pages.push("...");
    }

    if (pagecount > 1) {
      pages.push(pagecount);
    }

    return pages;
  }

  //const pages = Array.from({ length: pagecount }, (_, i) => i + 1);
  const pages = getPages(page, pagecount);
  //console.log(page);
  /* 
  const [currentPage, setCurrentPage] = useState(page); */

  return (
    <div className="flex items-center justify-between border-t border-white/10 py-3 w-full max-w-[1200px] mx-auto px-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href={`/galeries?p=${page <= 1 ? 1 : encodeURIComponent(page - 1)}`}
          className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-black hover:bg-white/10"
        >
          Anterior
        </a>
        <div className="flex flex-wrap justify-center">
          {pages.map((pg) => (
            <a
              key={pg}
              href={`/galeries?p=${pg}`}
              className={` ${pg === page ? "bg-red-500 text-white" : ""} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-black inset-ring inset-ring-gray-700  focus:z-20 focus:outline-offset-0`}
            >
              {pg}
            </a>
          ))}
        </div>

        <a
          href={`/galeries?p=${page >= pagecount ? pagecount : encodeURIComponent(page + 1)}`}
          className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-black hover:bg-white/10"
        >
          Siguiente
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-400">
            Mostrando <span className="font-medium">1</span> a{" "}
            <span className="font-medium">{pagesize}</span> de{" "}
            <span className="font-medium">{total}</span> resultados
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md"
          >
            {page <= 1 ? (
              ""
            ) : (
              <a
                href={`/galeries?p=${page <= 1 ? 1 : encodeURIComponent(page - 1)}`}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
                //onClick={() => (page = page - 1)}
              >
                <span className="sr-only">Previous</span>
                Anterior
                {/*  <ChevronLeftIcon aria-hidden="true" className="size-5" /> */}
              </a>
            )}

            {pages.map((pg) => (
              <a
                key={pg}
                href={`/galeries?p=${pg}`}
                className={` ${pg === page ? "bg-red-500 text-white" : ""} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-black inset-ring inset-ring-gray-700  focus:z-20 focus:outline-offset-0`}
              >
                {pg}
              </a>
            ))}
            {page >= pagecount ? (
              ""
            ) : (
              <a
                href={`/galeries?p=${page >= pagecount ? pagecount : encodeURIComponent(page + 1)}`}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
                /* onClick={() => (page = page + 1)} */
              >
                <span className="sr-only">Next</span>
                siguiente
                {/*  <ChevronRightIcon aria-hidden="true" className="size-5" /> */}
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
