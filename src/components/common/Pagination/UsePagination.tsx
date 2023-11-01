import * as React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import "./PlainCssPagination.css";
import { AppThunkDispatch, useAppDispatch } from "../../../redux/store";
import { getUsersTC } from "../../../redux/users-reducer";
import { Button } from "@mui/material";

type PaginationPageType = {
  totalUsersCount: number
  pageSize: number
}


const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex"
});

export default function UsePagination(props: PaginationPageType) {

  const dispatch = useAppDispatch();
  const { items } = usePagination({
    count: Math.ceil(props.totalUsersCount / props.pageSize),
    onChange: (event, page) => {
      dispatch(getUsersTC(page, props.pageSize) as AppThunkDispatch);
    }
  });

  return (
    <nav className="pagination">
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <Button
                type="button"
                style={{
                  fontWeight: selected ? "bold" : undefined
                }}
                {...item}
              >
                {page}
              </Button>
            );
          } else {
            children = (
              <Button type="button" {...item}
              >
                {type}
              </Button>
            );
          }
          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}