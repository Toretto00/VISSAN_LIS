"use client";

import React, { ElementType, useEffect, useState } from "react";

import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import "../../globals.css";
import Style from "./productDetail.module.scss";
import api from "../../api/client";

import {
  Container,
  Breadcrumbs,
  Link,
  Typography,
  Divider,
  Grid,
  IconButton,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Avatar,
  Box,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BugReportIcon from "@mui/icons-material/BugReport";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PrintIcon from "@mui/icons-material/Print";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HomeIcon from "@mui/icons-material/Home";
import GarageIcon from "@mui/icons-material/Garage";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import GradeIcon from "@mui/icons-material/Grade";

import Carousel from "react-material-ui-carousel";
import NewsLetter from "@/components/newsLetter/newsLetter";
import ScrollToTopButton from "@/components/scrollToTopButton";
import LoadingPage from "@/components/loadingPage/loading";

const iconPriceBtn: { title: string; icon: ElementType }[] = [
  { title: "BugReportIcon", icon: BugReportIcon },
  { title: "ShareIcon", icon: ShareIcon },
  { title: "FavoriteBorderIcon", icon: FavoriteBorderIcon },
  { title: "CompareArrowsIcon", icon: CompareArrowsIcon },
  { title: "PrintIcon", icon: PrintIcon },
];

const overviewIcon: { icon: ElementType }[] = [
  { icon: HomeIcon },
  { icon: GarageIcon },
  { icon: BedIcon },
  { icon: ShowerIcon },
  { icon: AspectRatioIcon },
  { icon: GradeIcon },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a47e", // Replace with your preferred color
    },
  },
});

const ProductDetail = ({ params }: { params: { productID: string } }) => {
  const [listingData, setListingData] = useState({
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
    description:
      "Countryside Modern Lake View Restaurant only for $500000 onetime is one of the cheapest around and includes water, sewer, and garbage.\r\n\r\nThis restaurant welcomes animals. The Restaurant is on the second story of the building. For all amenities in the house, a live-in super is available.\r\n\r\nPlease get in touch if you have any more inquiries. Additionally, videos are available upon request.\r\n\r\n*** NO BROKER FEE ***\r\n\r\n \tAwesome lake beside of apartment\r\n \t3 Bedroom and 2 Baths\r\n \t24 Hours security\r\n \tAll-time CC camera coverage\r\n \tAbundant sunshine\r\n \tStylish appliances\r\n \tNear a transit hub\r\n \t2-year lease for newly refurbished\r\n \tNecessary credit and background checks\r\n \tNear a Big Hospital and Large Shopingmal\r\n",
  });
  const [userData, setUserData] = useState({
    id: 4,
    first_name: "Bao",
    last_name: "Phan",
    username: "Toretto",
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
    account: {
      id: 1,
      username: "phanchibao007@gmail.com",
      password: "Pcb0941819910",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("listings_id");

  useEffect(() => {
    handleGetListingData();
  }, []);

  const handleGetListingData = () => {
    setIsLoading(true);
    api
      .get(`Listings/${search}`)
      .then((res) => {
        if (res.status === 200) {
          setListingData(res.data[0]);
          handleGetUserData();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   handleGetUserData();
  // }, [listingData]);

  const handleGetUserData = () => {
    setIsLoading(true);
    api
      .get(`user/userId?id=${listingData.author_id}`)
      .then((res) => {
        if (res.status === 200) {
          setUserData(res.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const splitDescription = () => {
    let description =
      "Countryside Modern Lake View Restaurant only for $500000 onetime is one of the cheapest around and includes water, sewer, and garbage.\r\n\r\nThis restaurant welcomes animals. The Restaurant is on the second story of the building. For all amenities in the house, a live-in super is available.\r\n\r\nPlease get in touch if you have any more inquiries. Additionally, videos are available upon request.\r\n\r\n*** NO BROKER FEE ***\r\n\r\n \tAwesome lake beside of apartment\r\n \t3 Bedroom and 2 Baths\r\n \t24 Hours security\r\n \tAll-time CC camera coverage\r\n \tAbundant sunshine\r\n \tStylish appliances\r\n \tNear a transit hub\r\n \t2-year lease for newly refurbished\r\n \tNecessary credit and background checks\r\n \tNear a Big Hospital and Large Shopingmal\r\n";

    let arr1 = description.split("\r\n\r\n");
    let arr2 = arr1[arr1.length - 1].split("\r\n");

    arr1.splice(-1);

    return arr1.concat(arr2);
  };

  const Item = (props: any) => {
    return (
      <Image
        src={props.item.url}
        height={450}
        width={780}
        alt={props.item.alt}
        className={Style.productImage}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <ScrollToTopButton />
          <div className={Style.wrapper}>
            {/* Breadcrumbs */}
            <Container maxWidth="xl">
              <Breadcrumbs
                separator="›"
                aria-label="breadcrumb"
                className={Style.breadcrumbsBanner}
              >
                <Link
                  underline="none"
                  color="inherit"
                  href="/"
                  className={Style.breadCrumbsLink}
                >
                  Home
                </Link>
                <Link
                  underline="none"
                  color="inherit"
                  href="/"
                  className={Style.breadCrumbsLink}
                >
                  {listingData.category.name}
                </Link>
                <Typography color="var(--primary-color)">
                  {listingData.title}
                </Typography>
              </Breadcrumbs>
            </Container>

            <Divider />
            <Container maxWidth="xl">
              {/* Heading */}
              <Grid container spacing={2} className={Style.productHeading}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <div className={Style.productCondition}>For Sell</div>
                  <Typography
                    variant="h2"
                    component="h2"
                    className={Style.productTitle}
                  >
                    {listingData.title}
                  </Typography>
                  <Breadcrumbs className={Style.productHeaderInfo}>
                    <div>
                      <LocationOnIcon />
                      <Typography>{listingData.contact.address}</Typography>
                    </div>
                    <div>
                      <VisibilityIcon />
                      <Typography>Views: {listingData.view_count}</Typography>
                    </div>
                  </Breadcrumbs>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <div className={Style.productPriceWrap}>
                    <Typography className={Style.productPrice}>
                      ${listingData.price}
                    </Typography>
                    <Typography className={Style.productPriceType}>
                      {"("}
                      {"fixed"}
                      {")"}
                    </Typography>
                  </div>
                  <div className={Style.btnArea}>
                    {iconPriceBtn.map((item) => (
                      <IconButton key={item.title} className={Style.iconBtn}>
                        <item.icon className={Style.icon} />
                      </IconButton>
                    ))}
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={2} className={Style.listingContentArea}>
                <Grid
                  item
                  className={Style.listingContent}
                  xs={12}
                  sm={12}
                  md={8}
                  lg={8}
                >
                  {/* Image slider */}
                  <div className={Style.sliderWrapper}>
                    <Carousel
                      interval={6000}
                      indicatorIconButtonProps={{
                        style: {
                          marginRight: "6px",
                          marginTop: "6px",
                          color: "gray",
                          opacity: "0.6",
                        },
                      }}
                      activeIndicatorIconButtonProps={{
                        style: {
                          opacity: "1",
                        },
                      }}
                      indicatorContainerProps={{
                        style: {
                          marginTop: "12px",
                          textAlign: "left",
                        },
                      }}
                      IndicatorIcon={listingData.images.map((item, i) => (
                        <Image
                          key={i}
                          src={item.url}
                          height={100}
                          width={125}
                          alt={item.alt}
                          className={Style.productImage}
                        />
                      ))}
                    >
                      {listingData.images.map((item, i) => (
                        <Item key={i} item={item} />
                      ))}
                    </Carousel>
                  </div>

                  {/* Overview */}
                  <Card variant="outlined" className={Style.productOverview}>
                    <CardContent>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={Style.itemHeading}
                      >
                        Overview
                      </Typography>
                      <Grid container spacing={2} rowSpacing={6}>
                        <Grid item xs={12} sm={4} md={4} lg={3}>
                          <div className={Style.amenitiesList}>
                            <div className={Style.amenitiesIcon}>
                              <LocalOfferIcon />
                            </div>
                            <div className={Style.amenitiesContent}>
                              <Typography className={Style.headingTitle}>
                                ID No
                              </Typography>
                              <Typography className={Style.value}>
                                {listingData.listing_id}
                              </Typography>
                            </div>
                          </div>
                        </Grid>
                        {overviewIcon.map((item, i = 1) => (
                          <Grid key={i} item xs={12} sm={4} md={4} lg={3}>
                            <div className={Style.amenitiesList}>
                              <div className={Style.amenitiesIcon}>
                                <item.icon />
                              </div>
                              <div className={Style.amenitiesContent}>
                                <Typography className={Style.headingTitle}>
                                  {listingData.custom_fields[i].label}
                                </Typography>
                                <Typography className={Style.value}>
                                  {listingData.custom_fields[i].value[0].data}
                                </Typography>
                              </div>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* About */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={Style.itemHeading}
                      >
                        About This Listing
                      </Typography>
                      {splitDescription().map((item, i) => (
                        <Typography key={i} component="p" gutterBottom>
                          {item}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Amenities */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={Style.itemHeading}
                      >
                        Features & Amenities
                      </Typography>
                      <Grid container spacing={2}>
                        {listingData.custom_fields[0].value.map((item, i) => (
                          <Grid key={i} item xs={6} sm={4} md={4} lg={4}>
                            <FormControlLabel
                              label={item.data}
                              control={
                                <Checkbox
                                  checked
                                  className={Style.amenityValue}
                                />
                              }
                              className={Style.amenityValue}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Feedback */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={Style.itemHeading}
                      >
                        Leave feedback about this
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Comment *"
                            multiline
                            rows={10}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Name *"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Emal *"
                          />
                        </Grid>

                        <Grid item xs={3} sm={3} md={3} lg={3}>
                          <Button
                            variant="contained"
                            className={Style.submitBtn}
                          >
                            Submit Review
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid
                  item
                  className={Style.listingSidebar}
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                >
                  <Card className={Style.listingUserInfo}>
                    <CardContent>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={Style.heading}
                      >
                        Contact Listing Owner
                      </Typography>
                      <Box component="form">
                        <Grid container spacing={2} rowSpacing={2}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={4}
                            className={Style.userAva}
                          >
                            <Avatar
                              sx={{ width: 88, height: 88 }}
                              src="/tom_steven-150x150.jpg"
                            ></Avatar>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={8}>
                            <Typography
                              variant="h5"
                              component="h5"
                              className={Style.userName}
                            >
                              {userData?.username}
                            </Typography>
                            <Typography>
                              Phone: {listingData.contact.phone}
                            </Typography>
                            <Typography>
                              Email: {listingData.contact.email}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                              fullWidth
                              required
                              type="text"
                              variant="outlined"
                              placeholder="Name*"
                              // helperText="This field is required."
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                              fullWidth
                              required
                              type="email"
                              variant="outlined"
                              placeholder="Email*"
                              // helperText="This field is required."
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                              fullWidth
                              required
                              type="phone"
                              variant="outlined"
                              placeholder="Phone*"
                              // helperText="This field is required."
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                              fullWidth
                              required
                              variant="outlined"
                              placeholder="Message*"
                              // helperText="This field is required."
                              multiline
                              rows={4}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Button
                              fullWidth
                              type="submit"
                              variant="contained"
                              sx={{ height: "50px" }}
                            >
                              Send Message
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
            <NewsLetter />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default ProductDetail;
