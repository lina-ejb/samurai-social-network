import React, { ChangeEvent, useCallback } from "react";
import { Pagination } from "@mui/material";
import { getUsersTC } from "../../../redux/users-reducer";
import { AppThunkDispatch, useAppDispatch } from "../../../redux/store";
import "./PlainCssPagination.css";

type PaginationPageType = {
  totalUsersCount: number
  pageSize: number
}

export const PaginationPage: React.FC<PaginationPageType> = ({
                                                               totalUsersCount,
                                                               pageSize
                                                             }) => {
  const dispatch = useAppDispatch();
  const pageCount = Math.ceil(totalUsersCount / pageSize);

  const handleChange = useCallback(function(pageNumber: number) {
    dispatch(getUsersTC(pageNumber, pageSize) as AppThunkDispatch);
  }, [pageSize, dispatch]);

  return (
    <div>
      <Pagination
        className="pagination"
        count={pageCount}
        color="primary"
        onChange={(event: ChangeEvent<unknown>, value) => {
          handleChange(value);
        }}
      />
    </div>
  );
};
