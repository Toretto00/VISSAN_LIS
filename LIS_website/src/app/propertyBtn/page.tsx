"use client";

import { useState } from "react";

import Style from "./propertyBtn.module.scss";
import "../globals.css";

import {
  Container,
  Box,
  TextField,
  Autocomplete,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SellIcon from "@mui/icons-material/Sell";

import FormInfo from "./formInfo/page";
import LoadingPage from "@/components/loadingPage/loading";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a47e", // Replace with your preferred color
    },
  },
});

const topSelect = [
  { id: "sell", label: "Sell" },
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
];

const topPlace = [
  { id: 112, label: "Apartments" },
  { id: 126, label: "Commercial" },
  { id: 162, label: "Office" },
  { id: 204, label: "Restaurant" },
  { id: 203, label: "Studio Home" },
  { id: 75, label: "Villa" },
];
function PropertyBtn() {
  const [loading, setLoading] = useState(false);
  const [selectedListingType, setSelectedListingType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const handletopSelectChange = (
    event: MouseEvent,
    value: { id: string; label: string }
  ) => {
    setSelectedListingType(value.id);
  };

  const handletopPlaceChange = (
    event: MouseEvent,
    value: { id: number; label: string }
  ) => {
    setSelectedCategory(value.id);
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              minHeight: {
                xs: "2430px",
                sm: "2330px",
                md: "1000px",
                lg: "1000px",
                xl: "1000px",
              },
              backgroundColor: "#eaf7f4",
              paddingTop: "86px",
            }}
          >
            <Box className={Style.breadcrumbBanner}>
              <div className={Style.barContainer}>
                <div className={Style.containerTitle}>
                  <>
                    <a
                      href="/"
                      style={{
                        color: "#878c9f",
                        textDecoration: "none",
                      }}
                    >
                      Home
                    </a>
                    <ChevronRightIcon
                      sx={{
                        fontSize: "18px",
                        marginRight: "7px",
                        marginLeft: "7px",
                      }}
                    />
                  </>
                </div>
                <div className={Style.contactAddress}>Post an Ad</div>
              </div>
            </Box>

            <Box className={Style.contentArea}>
              <Container className={Style.container}>
                <Box className={Style.mainForm}>
                  <div className={Style.mainContent}>
                    <div className={Style.pageContentInner}>
                      <div className={Style.pageTitleWrap}>
                        <h2 className={Style.pageTitle}>Post an Ad</h2>
                      </div>

                      <div className={Style.post2363}>
                        <div className={Style.rtCl}>
                          <div className={Style.rtClMessage} role="alert">
                            You have 30 free ads.
                          </div>
                        </div>
                        <div className={Style.homeListingForm}>
                          <Box className={Style.adTypeSelection}>
                            <Box className={Style.posSectionTitle}>
                              <h3>
                                <SellIcon
                                  sx={{
                                    fontSize: "18px",
                                    marginRight: "5px",
                                    fontWeight: "600",
                                  }}
                                />
                                Select a type
                              </h3>
                            </Box>
                            <Box className={Style.formGroup}>
                              <label className={Style.category}>
                                Ad Type
                                <span className={Style.requireStar}>*</span>
                              </label>
                              <Autocomplete
                                className={Style.comboBox}
                                disablePortal
                                id="combo-box-demo"
                                options={topSelect}
                                getOptionLabel={(option) => option.label}
                                onChange={() => handletopSelectChange}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select a type"
                                  />
                                )}
                              />
                            </Box>
                          </Box>

                          <Box className={Style.adTypeSelection}>
                            <Box className={Style.posSectionTitle}>
                              <h3>
                                <SellIcon
                                  sx={{
                                    fontSize: "18px",
                                    marginRight: "5px",
                                    fontWeight: "600",
                                  }}
                                />
                                Select a category
                              </h3>
                            </Box>
                            <Box className={Style.formGroup}>
                              <label className={Style.category}>
                                Category
                                <span className={Style.requireStar}>*</span>
                              </label>
                              <Autocomplete
                                className={Style.comboBox}
                                disablePortal
                                id="combo-box-demo"
                                options={topPlace}
                                onChange={() => handletopPlaceChange}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select a category"
                                  />
                                )}
                              />
                            </Box>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Container>
            </Box>
            <FormInfo
              listingType={selectedListingType}
              category={selectedCategory}
              loading={loading}
            />
          </Box>
        </ThemeProvider>
      )}
    </>
  );
}

export default PropertyBtn;
