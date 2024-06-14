"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import api from "../api/client";
import Homestyle from "./home.module.scss";

import {
  Box,
  Container,
  Grid,
  Typography,
  ButtonGroup,
  Button,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  FormControl,
  Paper,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import KeyIcon from "@mui/icons-material/Key";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupsIcon from "@mui/icons-material/Groups";

// import ProductCard from "@/components/productCard/productCard";
import LoadingPage from "@/components/loadingPage/loading";

const categories: string[] = [
  "Apartments",
  "Commercial",
  "Office",
  "Restaurant",
  "Studio Home",
  "Villa",
];

const types: { id: string; name: string }[] = [
  { id: "sell", name: "Sell" },
  { id: "buy", name: "Buy" },
  { id: "rent", name: "Rent" },
];

const locations: string[] = [
  "California",
  "Claremont",
  "Kansas",
  "Abliene",
  "Louisiana",
  "New Jersey",
];

let logos: { id: number; title: string; link: string }[] = [
  {
    id: 1,
    title: "client-logo-1",
    link: "/client-logo-1.svg",
  },
  {
    id: 2,
    title: "client-logo-2",
    link: "/client-logo-2.svg",
  },
  {
    id: 3,
    title: "client-logo-3",
    link: "/client-logo-3.svg",
  },
  {
    id: 4,
    title: "client-logo-4",
    link: "/client-logo-4.svg",
  },
  {
    id: 5,
    title: "client-logo-5",
    link: "/client-logo-5.svg",
  },
  {
    id: 6,
    title: "client-logo-6",
    link: "/client-logo-6.svg",
  },
];

const temp: string[] = ["1", "2", "3", "4", "5", "6"];

const locationImgs: { img: string; title: string; properties: number }[] = [
  {
    img: "/location-1.jpg",
    title: "California",
    properties: 4,
  },
  {
    img: "/location-2.jpg",
    title: "Claremont",
    properties: 4,
  },
  {
    img: "/location-3.jpg",
    title: "Kansas",
    properties: 2,
  },
  {
    img: "/location-4.jpg",
    title: "Louisiana",
    properties: 1,
  },
  {
    img: "/location-5.jpg",
    title: "Abilene",
    properties: 2,
  },
];

let agents: {
  id: number;
  ava: string;
  count: number;
  name: string;
  subTitle: string;
  phone: string;
}[] = [
  {
    id: 1,
    ava: "/rosy_janner.jpg",
    count: 2,
    name: "Rosy Janner",
    subTitle: "Sunshine",
    phone: "+442037691880",
  },
  {
    id: 2,
    ava: "/david_lee.jpg",
    count: 4,
    name: "David Lee",
    subTitle: "Sunshine",
    phone: "+182137121886",
  },
  {
    id: 3,
    ava: "/mike_hussy-1.jpg",
    count: 1,
    name: "Mike Hussy",
    subTitle: "Eco Builders",
    phone: "+442037691880",
  },
  {
    id: 4,
    ava: "/tom_steven.jpg",
    count: 2,
    name: "Tom Steven",
    subTitle: "Sweet Home",
    phone: "+052015698546",
  },
];

const Home = () => {
  const matches = useMediaQuery("(min-width:600px)");

  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(true);
  const [listingTypes, setListingTypes] = useState("sell");
  const [selectedListingType, setSelectedListingType] = useState("");
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

  interface ListingTypes {
    id: string;
    name: string;
  }

  useEffect(() => {
    handleLoadListingWithType();
  }, [listingTypes]);

  const handleLoadListing = () => {
    api
      .get("listings")
      .then((res) => {
        if (res.status === 200) {
          setListingsData(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleLoadListingWithType = () => {
    api
      .get(
        `Listings/filter?title=null&type=${listingTypes}&category_id=0&location_id=0&min_price=0&max_price=10000000&sort_by=date-desc`
      )
      .then((res) => {
        if (res.status === 200) {
          setListingsData(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSelectedListingType = (event: SelectChangeEvent) => {
    setSelectedListingType(event.target.value as string);
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "white",
          }}
        >
          {/* container 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundSize: "cover",
              backgroundImage: `url('https://homlisti.tpblog.net/wp-content/uploads/2021/08/home-3-main-banner.jpg')`,
              borderBottomLeftRadius: "50% 20%",
              borderBottomRightRadius: "50% 20%",
              minHeight: "732px",
            }}
          >
            <Container maxWidth="lg">
              <Box
                sx={{
                  margin: "auto",
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    padding: "10px 0 10px 0",
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "54px",
                    textAlign: "center",

                    "@media (max-width:800px)": {
                      fontSize: "24px",
                    },
                  }}
                >
                  Find the perfect place to <br /> live with your family
                </Typography>
                <ButtonGroup variant="text" sx={{ padding: "10px 0 10px 0" }}>
                  <Grid
                    container
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {categories.map((category) => (
                      <Grid item key={category}>
                        <Button
                          startIcon={<SearchIcon />}
                          sx={{
                            textTransform: "none",
                            color: "white",
                            padding: "8px",

                            "&:hover": { color: "#00C194" },
                            "&:not(:last-child)": {
                              borderRight: "none",
                            },
                          }}
                        >
                          {category}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </ButtonGroup>
                <Grid container rowSpacing={1}>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      label="Enter Keyword here ..."
                      sx={{ backgroundColor: "white", width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <FormControl
                      sx={{
                        backgroundColor: "white",
                      }}
                      fullWidth
                    >
                      {/* <InputLabel id="demo-simple-select-label">
                    Select Type
                  </InputLabel> */}
                      <Select
                        // labelId="demo-simple-select-label"
                        value={selectedListingType}
                        onChange={handleSelectedListingType}
                      >
                        <MenuItem value="">
                          <em>Placeholder</em>
                        </MenuItem>
                        {/* {listingTypes.length > 0
                          ? listingTypes.map((type: ListingTypes) => (
                              <MenuItem key={type.id} value={type.id}>
                                {type.name}
                              </MenuItem>
                            ))
                          : types.map((type) => (
                              <MenuItem key={type.id} value={type.name}>
                                {type.name}
                              </MenuItem>
                            ))} */}
                        {types.map((type) => (
                          <MenuItem key={type.id} value={type.name}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      label="Select Location"
                      select
                      sx={{ backgroundColor: "white", width: "100%" }}
                    >
                      {locations.map((location) => (
                        <MenuItem key={location}>{location}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Button
                      variant="contained"
                      endIcon={<SearchIcon />}
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#00C194",

                        "&:hover": {
                          backgroundColor: "#00A47E",
                        },
                      }}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      color: "white",
                      padding: "10px 0 10px 0",
                      textAlign: "center",
                    }}
                  >
                    We have more than 54,000 apartments, place & plot.
                  </Typography>
                </Grid>
              </Box>
            </Container>
          </div>
          {/* container 2 */}
          <Box
            sx={{
              margin: "90px 0 90px 0",
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={2} rowSpacing={2} columnSpacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  sx={{ justifyContent: "center" }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#00C194", textTransform: "uppercase" }}
                    gutterBottom
                  >
                    Our clients
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "800",
                      fontSize: "32px",
                      lineHeight: "1.2",
                      textTransform: "uppercase",
                    }}
                    gutterBottom
                  >
                    {"We're going to became"}
                    {<br />}
                    {"partners for the long run"}
                  </Typography>
                  <Typography gutterBottom>
                    Ghen an unknown printer took a galley of type andscr
                    ambledit to make a type specimen book has survived not only
                    five centuries but also.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={2}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {logos.map((logo) => (
                      <Grid item key={logo.id} xs={12} sm={4} md={4} lg={4}>
                        <Box
                          sx={{
                            "&:hover .home-logo": {
                              cursor: "pointer",
                              filter: "none",
                            },
                          }}
                        >
                          <Image
                            className="home-logo"
                            alt={logo.title}
                            src={logo.link}
                            width={200}
                            height={117}
                            style={{
                              display: "flex",
                              filter: "grayscale(100%)",
                              margin: "auto",
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* container 3 */}
          <Box className={Homestyle.container3}>
            <Container maxWidth="lg">
              <Grid container className={Homestyle.sectionTitle}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography className={Homestyle.subTitle}>
                    Our properties
                  </Typography>
                  <Typography variant="h2" className={Homestyle.mainTitle}>
                    Latest properties
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <ButtonGroup variant="text" sx={{ padding: "10px 0 10px 0" }}>
                    <Grid container spacing={2}>
                      {types.map((type) => (
                        <Grid item key={type.id}>
                          <Button
                            onClick={() => {
                              setLoading(true);
                              setListingTypes(type.id);
                            }}
                            variant="contained"
                            sx={{
                              textTransform: "none",
                              color:
                                type.id === listingTypes ? "white" : "black",
                              backgroundColor:
                                type.id === listingTypes
                                  ? "#00C194"
                                  : "transparent",
                              padding: "6px 35px",
                              borderRadius: "24px",
                              border: "1px solid #00C194",

                              "&:hover": {
                                color: "white",
                                backgroundColor: "#00C194",
                              },
                              "&:not(:last-child)": {
                                borderRight: "none",
                              },
                            }}
                          >
                            {type.name}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                {listingsData.slice(0, 6).map((item, i) => (
                  <Grid key={i} item xs={12} sm={12} md={4} lg={4}>
                    {/* <ProductCard view="grid" product={item} /> */}
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* container 4 */}
          <Box className={Homestyle.container4}>
            <Container maxWidth="lg">
              <div className={Homestyle.title}>
                <Typography className={Homestyle.subTitle}>
                  Our working proccess
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  className={Homestyle.mainTitle}
                >
                  How it works
                </Typography>
                <Typography className={Homestyle.description}>
                  Make a type specimen book. It has survived not only five
                  centuries, but also
                  <br /> the leap into electronic typesetting, remaining.
                </Typography>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Paper variant="outlined" className={Homestyle.serviceBox}>
                    <div className={Homestyle.imgWrap}>
                      <div className={Homestyle.hoverBackground} />
                      <HomeIcon className={Homestyle.icon} />
                    </div>
                    <div className={Homestyle.content}>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={Homestyle.mainTitle}
                      >
                        Find property
                      </Typography>
                      <Typography className={Homestyle.description}>
                        Odales mauris quis tellus facilis wisvel mattis magna
                        interdumr awabitur aweeget aliquam elit.
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Paper variant="outlined" className={Homestyle.serviceBox}>
                    <div className={Homestyle.imgWrap}>
                      <div className={Homestyle.hoverBackground} />
                      <ArticleIcon className={Homestyle.icon} />
                    </div>
                    <div className={Homestyle.content}>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={Homestyle.mainTitle}
                      >
                        Make a Deal
                      </Typography>
                      <Typography className={Homestyle.description}>
                        Odales mauris quis tellus facilis wisvel mattis magna
                        interdumr awabitur aweeget aliquam elit.
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Paper variant="outlined" className={Homestyle.serviceBox}>
                    <div className={Homestyle.imgWrap}>
                      <div className={Homestyle.hoverBackground} />
                      <KeyIcon className={Homestyle.icon} />
                    </div>
                    <div className={Homestyle.content}>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={Homestyle.mainTitle}
                      >
                        Get your keys
                      </Typography>
                      <Typography className={Homestyle.description}>
                        Odales mauris quis tellus facilis wisvel mattis magna
                        interdumr awabitur aweeget aliquam elit.
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Container 5 */}
          <Box className={Homestyle.container5}>
            <ImageList cols={matches ? 5 : 1} gap={0}>
              {locationImgs.map((location) => (
                <ImageListItem key={location.img}>
                  <div className={Homestyle.imgContainer}>
                    <div className={Homestyle.overlay}></div>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={location.img}
                      alt={location.title}
                      loading="lazy"
                      className={Homestyle.img}
                    />
                    <div className={Homestyle.content}>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={Homestyle.title}
                      >
                        {location.title}
                      </Typography>
                      <div className={Homestyle.count}>
                        <Typography className={Homestyle.text}>
                          {location.properties}{" "}
                          {location.properties > 1 ? "Properties" : "Property"}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>

          {/* Container 6 */}
          <Box className={Homestyle.container6}>
            <Container maxWidth="lg">
              <div className={Homestyle.title}>
                <Typography className={Homestyle.subTitle}>
                  EXPERTISE IS HERE
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  className={Homestyle.mainTitle}
                >
                  Our Exclusive Agents
                </Typography>
              </div>
              <Grid container spacing={2} className={Homestyle.wrap}>
                {agents.map((agent) => (
                  <Grid key={agent.id} item xs={6} sm={6} md={3} lg={3}>
                    <Card className={Homestyle.agentBlock}>
                      <CardActionArea className={Homestyle.agentContainer}>
                        <Box className={Homestyle.agentImgContainer}>
                          <CardMedia
                            className={Homestyle.agentImg}
                            component="img"
                            height="255"
                            image={agent.ava}
                            alt={agent.name}
                          />
                          <Box className={Homestyle.categoryBox}>
                            <Typography className={Homestyle.itemCategory}>
                              {agent.count} Listings
                            </Typography>
                          </Box>
                        </Box>
                        <CardContent className={Homestyle.itemContent}>
                          <Typography
                            gutterBottom
                            variant="h3"
                            component="h3"
                            className={Homestyle.itemName}
                          >
                            {agent.name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h4"
                            component="h4"
                            className={Homestyle.itemSubtitle}
                          >
                            {agent.subTitle}
                          </Typography>
                          <Box className={Homestyle.itemContact}>
                            <PhoneIcon className={Homestyle.itemIcon} />
                            <Typography
                              gutterBottom
                              className={Homestyle.itemPhone}
                            >
                              Call: {agent.phone}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box className={Homestyle.elementorWrap}>
                  <Box className={Homestyle.elementorContainer}>
                    <GroupsIcon className={Homestyle.iconHolder} />
                    <Box className={Homestyle.contentHolder}>
                      <Typography
                        gutterBottom
                        variant="h3"
                        component="h3"
                        className={Homestyle.infoTitle}
                      >
                        Become an Agent
                      </Typography>
                      <Typography sx={{ color: "#70778B", fontSize: "16px" }}>
                        Agent hen an unknown printer took a galley scramble
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={Homestyle.btnWrap}>
                    <Button variant="contained" className={Homestyle.btn}>
                      Join Now
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </div>
      )}
    </>
  );
};

export default Home;
