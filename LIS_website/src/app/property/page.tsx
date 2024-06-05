"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { SelectChangeEvent, SelectProps } from "@mui/material";

import "../globals.css";
import Style from "./property.module.scss";
import api from "../api/client";

import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  Select,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ButtonGroup,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ProductCard from "@/components/productCard/productCard";
import ScrollToTopButton from "@/components/scrollToTopButton";
import NewsLetter from "@/components/newsLetter/newsLetter";
import LoadingPage from "@/components/loadingPage/loading";

const types: string[] = ["Sell", "Buy", "Rent"];

const category: string[] = [
  "Apartments",
  "Commercial",
  "Office",
  "Restaurant",
  "Studio Home",
  "Villa",
];

const location: string[] = [
  "California",
  "Claremont",
  "Kansas",
  "Abliene",
  "Louisiana",
  "New Jersey",
];

const amenities: string[] = [
  "TV Cable",
  "Air Conditioning",
  "Barbeque",
  "Gym",
  "Swimming Pool",
  "Laundry",
  "Microwave",
  "Outdoor Shower",
  "Lawn",
  "Refrigerator",
  "Sauna",
  "Washer",
];

const bedroom: number[] = [1, 2, 3, 4, 5, 6];

const bathroom: number[] = [1, 2, 3, 4];

const sortby: { id: string; title: string }[] = [
  { id: "date-desc", title: "Default" },
  { id: "title-asc", title: "A to Z ( title )" },
  { id: "title-desc", title: "Z to A ( title )" },
  { id: "views-desc", title: "Most viewed" },
  { id: "views-asc", title: "Less view" },
  { id: "price-asc", title: "Price ( low to high )" },
  { id: "price-desc", title: "Price ( High to low )" },
];

const temp: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a47e", // Replace with your preferred color
    },
  },
});

const Property = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [initialProductListing, setInitialProductListing] = useState(9);
  const [loadMoreBtnDisplay, setLoadMoreBtnDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("grid");
  const [listingsData, setListingsData] = useState([
    {
      listing_id: 17353,
      author_id: 4,
      title: "Modern apartment with a pole for buy",
      price: "350,000",
      category: {
        term_id: 204,
        name: "Restaurant",
        slug: "restaurant",
        count: 2,
      },
      listingtype: {
        id: "buy",
        name: "Buy",
      },
      view_count: 587,
      contact: {
        id: 1,
        location: {
          term_id: 172,
          name: "New Jersey",
          slug: "new-jersey",
          count: 6,
        },
        address: "South stump tavern road, 42",
        phone: "+052015698546",
        whatsapp_number: "+052015698546",
        email: "tom_steven@gmail.com",
      },
      images: [
        {
          ID: 17354,
          title: "rosy_janner1",
          url: "https://homlisti.tpblog.net/wp-content/uploads/classified-listing/2022/03/rosy_janner1.jpg",
          alt: "",
        },
        {
          ID: 17355,
          title: "rosy_janner2",
          url: "https://homlisti.tpblog.net/wp-content/uploads/classified-listing/2022/03/rosy_janner2.jpg",
          alt: "",
        },
        {
          ID: 17356,
          title: "rosy_janner3",
          url: "https://homlisti.tpblog.net/wp-content/uploads/classified-listing/2022/03/rosy_janner3.jpg",
          alt: "",
        },
      ],
      custom_fields: [
        {
          id: 4216,
          label: "Amenities",
          value: [
            {
              id: 1,
              data: "tv-cable",
            },
            {
              id: 2,
              data: "air-conditioning",
            },
            {
              id: 3,
              data: "barbeque",
            },
            {
              id: 4,
              data: "gym",
            },
            {
              id: 5,
              data: "swimming-pool",
            },
            {
              id: 6,
              data: "laundry",
            },
            {
              id: 7,
              data: "microwave",
            },
            {
              id: 8,
              data: "outdoor-shower",
            },
            {
              id: 9,
              data: "lawn",
            },
            {
              id: 10,
              data: "refrigerator",
            },
            {
              id: 11,
              data: "sauna",
            },
            {
              id: 12,
              data: "washer",
            },
          ],
          choices: [
            {
              id: "tv-cable",
              name: "TV Cable",
            },
            {
              id: "air-conditioning",
              name: "Air Conditioning",
            },
            {
              id: "barbeque",
              name: "Barbeque",
            },
            {
              id: "gym",
              name: "Gym",
            },
            {
              id: "swimming-pool",
              name: "Swimming Pool",
            },
            {
              id: "laundry",
              name: "Laundry",
            },
            {
              id: "microwave",
              name: "Microwave",
            },
            {
              id: "outdoor-shower",
              name: "Outdoor Shower",
            },
            {
              id: "lawn",
              name: "Lawn",
            },
            {
              id: "refrigerator",
              name: "Refrigerator",
            },
            {
              id: "sauna",
              name: "Sauna",
            },
            {
              id: "washer",
              name: "Washer",
            },
          ],
        },
        {
          id: 4323,
          label: "Type",
          value: [
            {
              id: 13,
              data: "apartment",
            },
          ],
          choices: [
            {
              id: "apartment",
              name: "Apartment",
            },
            {
              id: "office",
              name: "Office",
            },
            {
              id: "restaurant",
              name: "Restaurant",
            },
          ],
        },
        {
          id: 4322,
          label: "Parking",
          value: [
            {
              id: 16,
              data: "yes",
            },
          ],
          choices: [
            {
              id: "yes",
              name: "Yes",
            },
            {
              id: "no",
              name: "No",
            },
          ],
        },
        {
          id: 4316,
          label: "Bedroom",
          value: [
            {
              id: 20,
              data: "3",
            },
          ],
          choices: [
            {
              id: "1",
              name: "1",
            },
            {
              id: "2",
              name: "2",
            },
            {
              id: "3",
              name: "3",
            },
            {
              id: "4",
              name: "4",
            },
            {
              id: "5",
              name: "5",
            },
            {
              id: "6",
              name: "6",
            },
          ],
        },
        {
          id: 4321,
          label: "Bath",
          value: [
            {
              id: 26,
              data: "3",
            },
          ],
          choices: [
            {
              id: "1",
              name: "1",
            },
            {
              id: "2",
              name: "2",
            },
            {
              id: "3",
              name: "3",
            },
            {
              id: "4",
              name: "4",
            },
          ],
        },
        {
          id: 4692,
          label: "Purpose",
          value: [
            {
              id: 28,
              data: "sell",
            },
          ],
          choices: [
            {
              id: "sell",
              name: "Sell",
            },
            {
              id: "buy",
              name: "Buy",
            },
            {
              id: "rent",
              name: "For Rent",
            },
          ],
        },
      ],
      description: "",
    },
  ]);
  const [selectedTitle, setSelectedTitle] = useState({
    selectedValue: "null",
  });
  const [listingTypes, setListingTypes] = useState(types);
  const [selectedListingTypes, setSelectedListingTypes] = useState(
    listingTypes[0]
  );
  const [categories, setCategories] = useState(category);
  const [selectedCategories, setSelectedCategories] = useState(categories[0]);
  const [locations, setLocations] = useState(location);
  const [selectedLocations, setSelectedLocations] = useState(locations[0]);
  const [selectedSortBy, setSelectedSortBy] = useState({
    selectedValue: "date-desc",
  });

  const handleChangePriceRange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setPriceRange(newValue as number[]);
  };

  const handleLoadMoreProduct = () => {
    if (initialProductListing + 9 >= listingsData.length) {
      setLoadMoreBtnDisplay(false);
      setIsLoading(false);
      return setInitialProductListing(listingsData.length);
    }
    setIsLoading(false);
    setInitialProductListing(initialProductListing + 9);
  };

  const handleGridView = () => {
    setView("grid");
  };

  const handleListView = () => {
    setView("list");
  };

  useEffect(() => {
    setIsLoading(true);
    handleLoadListing();
    handleLoadCategories();
    handleLoadListingTypes();
    handleLoadLocations();
  }, []);

  useEffect(() => {
    handleFilterListingData();
  }, [selectedSortBy]);

  const handleLoadListing = () => {
    api
      .get("Listings")
      .then((res) => {
        if (res.status === 200) {
          setListingsData(res.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleLoadCategories = () => {
    api
      .get("Categories")
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleLoadListingTypes = () => {
    api
      .get("ListingTypes")
      .then((res) => {
        if (res.status === 200) {
          setListingTypes(res.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleLoadLocations = () => {
    api
      .get("Locations")
      .then((res) => {
        if (res.status === 200) {
          setLocations(res.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleFilterListingData = () => {
    // setIsLoading(true);
    // api
    //   .get(
    //     `Listings/filter?title=${selectedTitle.selectedValue}&type=${
    //       selectedListingTypes.selectedValue
    //     }&category_id=${selectedCategories.selectedValue}&location_id=${
    //       selectedLocations.selectedValue
    //     }&min_price=${priceRange[0] * 10000}&max_price=${
    //       priceRange[1] * 10000
    //     }&&sort_by=${selectedSortBy.selectedValue}`
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setListingsData(res.data);
    //       setIsLoading(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsLoading(false);
    //   });
  };

  const handleTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTitle(() => ({
      selectedValue: event.target.value as string,
    }));
  };

  const handleListingTypesChange = (event: SelectChangeEvent) => {
    setSelectedListingTypes(event.target.value as string);
  };

  const handleCategoriesChange = (event: SelectChangeEvent) => {
    setSelectedCategories(event.target.value as string);
  };

  const handleLocationsChange = (event: SelectChangeEvent) => {
    setSelectedLocations(event.target.value as string);
  };

  const handleSortByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setSelectedSortBy(event.target.value as string);
  };

  // const handleResetSearch = () => {
  //   setSelectedTitle({ selectedValue: "null" });
  //   setSelectedListingTypes({ selectedValue: "null" });
  //   setSelectedCategories({ selectedValue: 0 });
  //   setSelectedLocations({ selectedValue: 0 });
  // };

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className={Style.propertyContainer}>
          <ScrollToTopButton />

          {/* Breadcrumbs */}
          <Container maxWidth="xl">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={Style.breadCrumbsContainer}
            >
              <Link
                underline="none"
                color="inherit"
                href="/"
                className={Style.breadCrumbsLink}
              >
                Home
              </Link>
              <Typography color="var(--primary-color)">
                All Properties
              </Typography>
            </Breadcrumbs>
          </Container>

          <Divider />

          <Container maxWidth="xl" className={Style.mainContainer}>
            <Grid container spacing={2}>
              {/* Sidebar */}
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <Card className={Style.advancedSearchContainer}>
                  <CardContent>
                    <Typography
                      variant="h3"
                      component="h3"
                      gutterBottom
                      className={Style.advancedSearchHeader}
                    >
                      Advanced Search
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="What are you looking for?"
                      className={Style.advancedSearchItem}
                      onChange={handleTitleChange}
                    />
                    <Select
                      fullWidth
                      displayEmpty
                      variant="outlined"
                      defaultValue="null"
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      className={Style.advancedSearchItem}
                      value={selectedListingTypes}
                      onChange={handleListingTypesChange}
                    >
                      <MenuItem value="null">Property Type</MenuItem>
                      {listingTypes?.map((type, id) => (
                        <MenuItem key={id} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select
                      fullWidth
                      displayEmpty
                      variant="outlined"
                      placeholder="All Categories"
                      defaultValue="null"
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      className={Style.advancedSearchItem}
                      value={selectedCategories}
                      onChange={handleCategoriesChange}
                    >
                      <MenuItem value={0}>All Categories</MenuItem>
                      {categories?.map((index, category) => (
                        <MenuItem key={index} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select
                      fullWidth
                      displayEmpty
                      variant="outlined"
                      placeholder="All Cities"
                      defaultValue="null"
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      className={Style.advancedSearchItem}
                      value={selectedLocations}
                      onChange={handleLocationsChange}
                    >
                      <MenuItem value={0}>All Cities</MenuItem>
                      {locations?.map((index, location) => (
                        <MenuItem key={index} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </Select>

                    <Box>
                      <Accordion className={Style.advancedSearchAmenities}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          className={Style.advancedSearchSummary}
                        >
                          <Typography>Amenities</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup>
                            {amenities.map((amenity) => (
                              <FormControlLabel
                                key={amenity}
                                control={<Checkbox />}
                                label={amenity}
                              />
                            ))}
                          </FormGroup>
                        </AccordionDetails>
                        <Accordion className={Style.advancedSearchAmenities}>
                          <AccordionSummary
                            expandIcon={<AddIcon />}
                            className={Style.advancedSearchSummary}
                          >
                            <Typography>Overview</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Select
                              fullWidth
                              displayEmpty
                              variant="outlined"
                              defaultValue=""
                              MenuProps={{
                                disableScrollLock: true,
                              }}
                              className={Style.advancedSearchItem}
                            >
                              <MenuItem value="">Bedroom</MenuItem>
                              {bedroom.map((item) => (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                            <Select
                              fullWidth
                              displayEmpty
                              variant="outlined"
                              defaultValue=""
                              MenuProps={{
                                disableScrollLock: true,
                              }}
                              className={Style.advancedSearchItem}
                            >
                              <MenuItem value="">Bath</MenuItem>
                              {bathroom.map((item) => (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </AccordionDetails>
                        </Accordion>
                      </Accordion>
                    </Box>

                    <Box>
                      <Box className={Style.advancedSearchRangeSliderLabel}>
                        <Typography>Price</Typography>
                        <Typography>
                          ${priceRange[0] * 10000} - ${priceRange[1] * 10000}
                        </Typography>
                      </Box>
                      <Slider
                        value={priceRange}
                        onChange={handleChangePriceRange}
                        disableSwap
                      />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ display: "flex" }}>
                    <Button
                      sx={{ flexGrow: "1" }}
                      variant="contained"
                      onClick={() => {
                        handleFilterListingData();
                      }}
                    >
                      Find Property
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<RestartAltIcon />}
                      // onClick={handleResetSearch}
                    >
                      Reset
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* Product */}
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <div className={Style.listingsActions}>
                  <Typography className={Style.resultCount}>
                    Showing 1–
                    {initialProductListing <= listingsData.length
                      ? initialProductListing
                      : listingsData.length}{" "}
                    of {listingsData.length} results
                  </Typography>
                  <div className={Style.listingsActionsWrap}>
                    <Typography className={Style.orderByTitle}>
                      Sort by:{" "}
                    </Typography>
                    <Select
                      fullWidth
                      displayEmpty
                      variant="outlined"
                      placeholder="Default"
                      value={selectedSortBy.selectedValue}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      className={Style.orderBy}
                      // onChange={handleSortByChange}
                    >
                      {sortby.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                    <ButtonGroup
                      className={Style.viewSwitcher}
                      variant="outlined"
                    >
                      <Button
                        sx={{
                          color: view === "list" ? "#00a47e" : "#b4b4b4",
                        }}
                        className={Style.viewSwitcherBtn}
                        onClick={() => handleListView()}
                      >
                        <ListIcon />
                      </Button>
                      <Button
                        sx={{
                          color: view === "grid" ? "#00a47e" : "#b4b4b4",
                        }}
                        className={Style.viewSwitcherBtn}
                        onClick={() => handleGridView()}
                      >
                        <ViewModuleIcon />
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
                <Grid container spacing={4}>
                  {listingsData.slice(0, initialProductListing).map((item, i) =>
                    view === "grid" ? (
                      <Grid item xs={12} sm={12} md={4} lg={4} key={i}>
                        <ProductCard view={view} product={item} />
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={12} md={12} lg={12} key={i}>
                        <ProductCard view={view} product={item} />
                      </Grid>
                    )
                  )}
                </Grid>
                <div className={Style.loadMoreWrap}>
                  <Typography>
                    You have viewed{" "}
                    {initialProductListing <= listingsData.length
                      ? initialProductListing
                      : listingsData.length}{" "}
                    of {listingsData.length} products
                  </Typography>
                  <LoadingButton
                    className={Style.loadMoreBtn}
                    variant="contained"
                    loading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => handleLoadMoreProduct(), 3000);
                    }}
                    sx={{
                      display: (
                        initialProductListing < listingsData.length
                          ? true
                          : false
                      )
                        ? "flex"
                        : "none",
                    }}
                  >
                    Load more
                  </LoadingButton>
                </div>
              </Grid>
            </Grid>
          </Container>
          <NewsLetter />
        </div>
      )}
    </ThemeProvider>
  );
};

export default Property;
