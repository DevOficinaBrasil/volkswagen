"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const VideosCategoriaPagination = (CategoriaSlug) => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(10);
  const router = useRouter();

  useEffect(() => {
    getTotal();
    if (parseInt(searchParams.get("page"))) {
      setPage(parseInt(searchParams.get("page")));
    } else {
      setPage(1);
    }
  }, []);

  const handlePageChange = (event, value) => {
    setPage(parseInt(value));
    router.push("?page=" + value);
  };

  const getTotal = async () => {
    var req = await fetch(process.env.NEXT_PUBLIC_API_URL + "video/getAll");
    var result = await req.json();
    setTotal(Math.round(result.total / 6));
  };

  return (
    <div className='flex justify-center w-fit mt-5 mb-5'>
      <Pagination
        page={page}
        count={total}
        color='primary'
        onChange={handlePageChange}
      />
    </div>
  );
};

export default VideosCategoriaPagination;
