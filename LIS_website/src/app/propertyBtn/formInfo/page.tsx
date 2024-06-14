"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Style from "./formInfo.module.scss";
import api from "@/app/api/client";
import { useGlobalContext } from "@/app/Context/store";

import {
  Container,
  Box,
  TextField,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  Button,
  styled,
} from "@mui/material";

import SellIcon from "@mui/icons-material/Sell";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonIcon from "@mui/icons-material/Person";
import LinkIcon from "@mui/icons-material/Link";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const priceType = [
  { label: "Fixed" },
  { label: "Negotiable" },
  { label: "On Call" },
];

const priceUnit = [
  { label: "Year(yr)" },
  { label: "Month(mo)" },
  { label: "Total Price(total)" },
];

const bed = [
  { id: 18, label: "1" },
  { id: 19, label: "2" },
  { id: 10, label: "3" },
  { id: 21, label: "4" },
  { id: 22, label: "5" },
  { id: 23, label: "6" },
];

const bath = [
  { id: 24, label: "1" },
  { id: 25, label: "2" },
  { id: 26, label: "3" },
  { id: 27, label: "4" },
];

const amenitiesCheck = [
  { label: "TV cable" },
  { label: "Gym" },
  { label: "Microwave" },
  { label: "Air conditioning" },
  { label: "Swimming pool" },
  { label: "Outdoor Shower" },
  { label: "Sauna" },
  { label: "Barbeque" },
  { label: "Laudry" },
  { label: "Lawn" },
  { label: "Washer" },
  { label: "Refrigerator" },
];

const categoryCheck = [
  { label: "Real Estate" },
  { label: "Health & Medical" },
  { label: "Home Services" },
  { label: "Restaurants" },
  { label: "Education" },
];

// interface properties {
//   listingType: string;
//   category: number;
//   loading: boolean;
// }

const FormInfo = (props: any) => {
  const [listingTitle, setListingTitle] = useState("");
  const [listingPrice, setListingPrice] = useState("");
  const [listingParking, setListingParking] = useState(-1);
  const [listingBed, setListingBed] = useState(-1);
  const [listingBath, setListingBath] = useState(-1);
  const [listingTV, setListingTV] = useState(-1);
  const [listingAir, setListingAir] = useState(-1);
  const [listingBarbeque, setListingBarbeque] = useState(-1);
  const [listingGym, setListingGym] = useState(-1);
  const [listingSwim, setListingSwim] = useState(-1);
  const [listingLaundry, setListingLaundry] = useState(-1);
  const [listingMicrowave, setListingMicrowave] = useState(-1);
  const [listingOutdoor, setListingOutdoor] = useState(-1);
  const [listingLawn, setListingLawn] = useState(-1);
  const [listingRefRigerator, setListingRefrigerator] = useState(-1);
  const [listingSauna, SetListingSauna] = useState(-1);
  const [listingWasher, setListingWasher] = useState(-1);
  const { JWT } = useGlobalContext();

  const router = useRouter();

  const handleSubmitForm = () => {
    console.log(props.category);
    console.log(props.listingType);
    if (JWT !== "") {
      api.defaults.headers.common = { Authorization: `Bearer ${JWT}` };
      api
        .post(
          `Listings?author_id=4&title=${listingTitle}&price=${listingPrice}&category_id=${props.category}&listing_type=${props.listingType}&tv=${listingTV}&air=${listingAir}&barbeque=${listingBarbeque}&gym=${listingGym}&swim=${listingSwim}&laundry=${listingLaundry}&microwave=${listingMicrowave}&outdoor=${listingOutdoor}&lawn=${listingLawn}&refrigerator=${listingRefRigerator}&sauna=${listingSauna}&washer=${listingWasher}&parking=16&bed=${listingBed}&bath=${listingBath}`
        )
        .then((res) => {
          if (res) {
            console.log(res);
            router.push("/property");
          }
        })
        .catch((e) => {
          console.log(e);
          router.push("/property");
        });
    }
  };
  return (
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
      }}
    >
      <Box className={Style.contentArea}>
        <Container className={Style.container}>
          <Box className={Style.mainForm}>
            <div className={Style.mainContent}>
              <div className={Style.pageContentInner}>
                <div className={Style.post2363}>
                  <div className={Style.homeListingForm}>
                    <Box className={Style.adTypeSelection}>
                      <Box className={Style.posSectionTitle}>
                        <h3 className={Style.section}>
                          <InsertPhotoIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Listing Information
                        </h3>
                      </Box>
                      <Box className={Style.formGroup}>
                        <label className={Style.category}>
                          Title
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <input
                          id="outlined-basic"
                          value={listingTitle}
                          onChange={(e) => setListingTitle(e.target.value)}
                          className={Style.inputStyle}
                        />
                      </Box>
                      <Box className={Style.posSectionTitle}>
                        <h3>Pricing</h3>
                      </Box>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          className={Style.formSetting}
                        >
                          <FormControlLabel
                            value="Price"
                            control={
                              <Radio
                                className={Style.settingRadio}
                                style={{ transform: "scale(0.7)" }}
                              />
                            }
                            label="Price"
                          />
                          <FormControlLabel
                            value="Price Range"
                            control={
                              <Radio
                                className={Style.settingRadio}
                                style={{ transform: "scale(0.7)" }}
                              />
                            }
                            label="Price Range"
                          />
                          <FormControlLabel
                            value="Disable"
                            control={
                              <Radio
                                className={Style.settingRadio}
                                style={{ transform: "scale(0.7)" }}
                              />
                            }
                            label="Disable"
                          />
                        </RadioGroup>
                      </FormControl>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>
                          Price Type
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <Autocomplete
                          className={Style.comboBox}
                          disablePortal
                          id="combo-box-demo"
                          options={priceType}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Select price type" />
                          )}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>
                          Price [$]
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <input
                          id="outlined-basic"
                          value={listingPrice}
                          onChange={(e) => setListingPrice(e.target.value)}
                          className={Style.inputStyle}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>Price Unit</label>
                        <Autocomplete
                          className={Style.comboBox}
                          disablePortal
                          id="combo-box-demo"
                          options={priceUnit}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Select price type" />
                          )}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>
                          Amenities
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <div className={Style.checkBox}>
                          <FormGroup
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            {amenitiesCheck.map((value) => (
                              <FormControlLabel
                                key={value.label}
                                control={
                                  <Checkbox
                                    name={value.label}
                                    // onChange={handleCheckAmenities}
                                  />
                                }
                                label={value.label}
                                className={Style.checkLabel}
                              />
                            ))}
                          </FormGroup>
                        </div>
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>
                          Type
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <FormControl sx={{ marginLeft: "10px" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            className={Style.formSetting}
                          >
                            <FormControlLabel
                              value="Price"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Apartment"
                            />
                            <FormControlLabel
                              value="Price Range"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Office"
                            />
                            <FormControlLabel
                              value="Disable"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Restaurant"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>
                          Parking
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <FormControl sx={{ marginLeft: "10px" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            className={Style.formSetting}
                          >
                            <FormControlLabel
                              value="Price"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Yes"
                            />
                            <FormControlLabel
                              value="Price Range"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="No"
                            />
                            <FormControlLabel
                              value="Disable"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Another"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>Bedroom</label>
                        <Autocomplete
                          className={Style.comboBox}
                          disablePortal
                          id="combo-box-demo"
                          options={bed}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>Bathroom</label>
                        <Autocomplete
                          className={Style.comboBox}
                          disablePortal
                          id="combo-box-demo"
                          options={bath}
                          // onChange={(e, value) => {
                          //   setListingBath(value.id);
                          // }}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>Purpose</label>
                        <FormControl sx={{ marginLeft: "10px" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            className={Style.formSetting}
                          >
                            <FormControlLabel
                              value="Price"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="For Sell"
                            />
                            <FormControlLabel
                              value="Price Range"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="For Buy"
                            />
                            <FormControlLabel
                              value="Disable"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="For Rent"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box className={Style.formGroup}>
                        <label className={Style.category}>Location</label>
                        <input
                          id="outlined-basic"
                          className={Style.inputStyle}
                        />
                      </Box>
                      <Box className={Style.formGroup}>
                        <label className={Style.category}>Build Year</label>
                        <input
                          id="outlined-basic"
                          className={Style.inputStyle}
                        />
                      </Box>
                      <Box className={Style.posSectionTitle}>
                        <h3>
                          <InsertPhotoIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Panorama Image
                        </h3>
                      </Box>

                      <Button
                        sx={{
                          backgroundColor: "#00c194 !important",
                          marginBottom: "10px",
                        }}
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                      </Button>

                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>Description</label>
                        <textarea
                          name="names[first-name]"
                          className={Style.textArea}
                          aria-invalid="false"
                          aria-required="false"
                        ></textarea>
                      </Box>

                      <Box className={Style.posSectionTitle}>
                        <h3>
                          <PersonIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Image
                        </h3>

                        <div className={Style.uploadImage}>
                          <p>Drop files here to add them</p>
                          <Button
                            sx={{
                              backgroundColor: "#00c194 !important",
                              marginBottom: "10px",
                            }}
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                          >
                            Browse file
                            <VisuallyHiddenInput type="image" />
                          </Button>
                        </div>

                        <div className={Style.alertDanger}>
                          <p>Recommended image size to (1170x650)px</p>
                          <p>Image maximum size 3 MB.</p>
                          <p>Allowed image type (png, jpg, jpeg).</p>
                          <p>Allowed image type (png, jpg, jpeg).</p>
                        </div>
                      </Box>
                      <Box className={Style.posSectionTitle}>
                        <h3>
                          <LinkIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Video URL
                        </h3>
                        <input
                          style={{ margin: "0" }}
                          id="outlined-basic"
                          className={Style.inputStyle}
                          placeholder="Only Youtube & Vimeo URL"
                        />
                        <small className={Style.formText}>
                          E.g. https://www.youtube.com/watch?v=RiXdDGk_XCU,
                          https://vimeo.com/620922414
                        </small>
                      </Box>

                      <Box
                        className={Style.posSectionTitle}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <h3>
                          <SellIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Yelp Nearby Places
                        </h3>
                        <div
                          style={{ width: "70% !important" }}
                          className={Style.checkBox}
                        >
                          <FormGroup
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            {categoryCheck.map((value) => (
                              <FormControlLabel
                                key={value.label}
                                control={<Checkbox />}
                                label={value.label}
                                className={Style.checkLabel}
                              />
                            ))}
                          </FormGroup>
                        </div>
                      </Box>

                      <Box className={Style.posSectionTitle}>
                        <h3>
                          <PersonIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Contact Details
                        </h3>
                        <div className={Style.rowFix}>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              State
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Phone
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Zip code
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Facebook
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Address
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Email
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                        </div>

                        <Button
                          sx={{
                            marginTop: "20px",
                            backgroundColor: "#00c194",
                            fontWeight: "700",
                          }}
                          variant="contained"
                          onClick={handleSubmitForm}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default FormInfo;
