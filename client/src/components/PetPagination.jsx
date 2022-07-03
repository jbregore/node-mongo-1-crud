import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPets } from "../redux/action/petsAction";


const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.pets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getAllPets(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{
        ul: {
          justifyContent: "space-around",
        },
      }}
      count={numberOfPages ? numberOfPages : 0}
      page={Number(page) || 1}
      // variant="outlined"
      size="small"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/pets?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
