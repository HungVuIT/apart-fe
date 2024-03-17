import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbComponent from "../../../components/BreadCrumb";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getShopById, getWatchById } from "../../../redux/product/productThunk";
import classes from "./news-item.module.scss";
import { getNewsById } from "../../../api/service/home-service";

import Loading from "../loading";
import { Container } from "@mui/system";

function Apart(): JSX.Element {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { watch, loading } = useAppSelector((state) => state.productNow);
  useEffect(() => {
    dispatch(getWatchById(Number(productId)));
  }, [productId]);
  useEffect(() => {
    watch.SID && dispatch(getShopById(watch.SID));
  }, [watch.id]);

  const myHtmlElement = document.createElement("div");
  myHtmlElement.innerHTML = watch ? watch?.description || "" : "";
  return (
    <div className={classes.wrapper}>
      {loading ? (
        <Loading _type={"ball"} />
      ) : (
        <Container>
          <div className={classes.box}>
            <h1 className={classes.title}>{watch?.name}</h1>
            <div
              className={classes.news}
              dangerouslySetInnerHTML={{ __html: myHtmlElement.outerHTML }}
            ></div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default Apart;
