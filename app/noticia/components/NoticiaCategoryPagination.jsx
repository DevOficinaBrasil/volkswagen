"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

const ForumDiscussionsPagination = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (parseInt(searchParams.get("page"))) {
      setPage(parseInt(searchParams.get("page")));
    } else {
      setPage(1);
    }
  }, []);

  useEffect(() => {
    setTotal(totalPages);
  }, [totalPages]);

  const handlePageChange = (event, value) => {
    setPage(parseInt(value));
    router.push("/noticia/" + params["slug-categoria"] + "?page=" + value);
    router.refresh();
  };

  return (
    <div className="flex justify-center mt-5 mb-5">
      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ForumDiscussionsPagination;
