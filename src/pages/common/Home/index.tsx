import React, { useContext, useEffect, useState } from "react";
import Container from "../../../components/Container";
import "./home.scss";
import banner from "../../../assets/img/Apart.png";
import Search from "../../../components/Search";
import Category from "../../../components/Category";
import {
  menCategory,
  womenCategory,
  coCategory,
  dientuCategory,
  treemCategory,
  capdoiCategory,
} from "./image";
import FeaturedProducts from "../../../components/FeaturedProducts";
import { MyGlobalContext } from "../../../store/context/MyglobalContext";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Carousel from "react-material-ui-carousel";
import { setSearch } from "../../../redux/common/commonSlice";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { getListProductInHome } from "../../../api/service/home-service";
import { IWatch } from "../../../interface/watch/watchType";
import { useNavigate } from "react-router-dom";
function Home() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setSearch(""));
  }, []);
  const [list, setList] = useState<IWatch[]>([]);
  useEffect(() => {
    getListProductInHome("?orderBy=createdAt.desc", setList);
  }, []);
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`/apart/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <>
        {/* <Container > */}
        <Carousel animation="slide" duration={2000} className="banner">
          {/* <img src={banner} alt="banner" className='img-banner' style={{objectFit: "fill"}}/> */}
          <img
            src={
              "https://luxurydecor.vn/wp-content/uploads/2022/02/x11-09e.jpg"
            }
            alt="banner"
            className="img-banner"
          />
          <img
            src={
              "https://luxurydecor.vn/wp-content/uploads/2020/02/thiet-ke-noi-that-chung-cu-sunshine-center-3.jpg"
            }
            alt="banner"
            className="img-banner"
          />
          <img
            src={
              "https://luxurydecor.vn/wp-content/uploads/2022/08/lux_16-lang-ha-1.jpg"
            }
            alt="banner"
            className="img-banner"
          />
        </Carousel>
        {/* </Container> */}
        <Container>
          <div className="search__wrapper">
            <Search />
          </div>
        </Container>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginTop: "70px",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
              >
                <Tab
                  label="Thiết kế"
                  value="1"
                  style={{
                    fontSize: "35px",
                    textAlign: "center",
                    fontWeight: "600",
                    lineHeight: "1.2em",
                    color: "ActiveCaption",
                  }}
                />
                <Tab
                  label="Bán lẻ"
                  value="2"
                  style={{
                    fontSize: "35px",
                    textAlign: "center",
                    fontWeight: "600",
                    lineHeight: "1.2em",
                    color: "ActiveCaption",
                  }}
                />
              </TabList>
            </Box>

            <TabPanel value="1">
              <div className="search__wrapper">
                <>
                  {list.map(
                    (item) =>
                      item.isHome && (
                        <div>
                          <div
                            className="col-sm-12 item-work"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => handleClick(item.id)}
                          >
                            <div className="work-thumb">
                              <img
                                src={item.image[0]}
                                alt=""
                                style={{
                                  maxWidth: "100%",
                                  width: "100%",
                                  height: "auto",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                fontSize: "35px",
                                textAlign: "center",
                                marginTop: "15px",
                                marginBottom: "50px",
                                fontWeight: "600",
                                lineHeight: "1.2em",
                                color: "#000",
                              }}
                            >
                              {item.name}
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <FeaturedProducts title="Giường ngủ" type={"BED"} />
              <FeaturedProducts title="Bàn ghế" type={"TABLE"} />
              <FeaturedProducts title="Sản phẩm mới" type={"NEW"} />
            </TabPanel>
          </TabContext>
        </Box>
      </>
    </>
  );
}

export default Home;
