"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import api from "../../app/api/client";

import Style from "./productCard.module.scss";

import {
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Avatar,
  IconButton,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

interface ProductCardProps {
  view: string;
  product: {
    listing_id: number;
    author_id: number;
    title: string;
    price: string;
    category: {
      term_id: number;
      name: string;
      slug: string;
      count: number;
    };
    listingtype: {
      id: string;
      name: string;
    };
    view_count: number;
    contact: {
      id: number;
      location: {
        term_id: number;
        name: string;
        slug: string;
        count: number;
      };
      address: string;
      phone: string;
      whatsapp_number: string;
      email: string;
    };
    images: {
      ID: number;
      title: string;
      url: string;
      alt: string;
    }[];
    custom_fields: {
      id: number;
      label: string;
      value: {
        id: number;
        data: string;
      }[];
      choices: {
        id: string;
        name: string;
      }[];
    }[];
    description: string;
  };
}

const ProductCard = (props: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleViewProductDetail = () => {
    const params = new URLSearchParams(searchParams);
    params.set("listings_id", props.product.listing_id.toString());
    router.push(`/property/${props.product.title}?${params.toString()}`);
  };

  return (
    <div onClick={() => handleViewProductDetail()}>
      <Card
        className={Style.cardContainer}
        sx={{ flexDirection: props.view === "grid" ? "column" : "row" }}
      >
        <div className={Style.productThumb}>
          <div className={Style.productType}>
            <span className={Style.productTypeBadge}>
              For {props.product?.listingtype?.name}
            </span>
          </div>
          <CardMedia
            className={Style.cardImg}
            component="img"
            alt="picture"
            height="240"
            image={props?.product?.images[0]?.url}
          />
          <Typography className={Style.productPrice}>
            {props.product?.price}
          </Typography>
          <div className={Style.listingAction}>
            <IconButton aria-label="like" className={Style.actionBtn}>
              <FavoriteBorderIcon className={Style.icon} />
            </IconButton>
            <IconButton aria-label="compare" className={Style.actionBtn}>
              <CompareArrowsIcon className={Style.icon} />
            </IconButton>
          </div>
        </div>
        <div className={Style.contentWrap}>
          <CardContent>
            <Typography gutterBottom component="div" sx={{ color: "#00c194" }}>
              {props.product?.category?.name}
            </Typography>
            <Typography
              noWrap
              gutterBottom
              variant="h3"
              component="h3"
              className={Style.title}
            >
              {props.product.title}
            </Typography>
            <div className={Style.entryMeta}>
              <LocationOnIcon />
              <Typography gutterBottom>
                {props.product?.contact?.location?.name}
              </Typography>
            </div>
            <Grid container className={Style.listInformation}>
              <Grid item className={Style.productFeatures}>
                <BedIcon className={Style.productFeaturesIcon} />
                <Typography>Beds 4</Typography>
              </Grid>
              <Grid className={Style.productFeatures}>
                <ShowerIcon className={Style.productFeaturesIcon} />
                <Typography>Baths 2</Typography>
              </Grid>
              <Grid className={Style.productFeatures}>
                <AspectRatioIcon className={Style.productFeaturesIcon} />
                <Typography>2000 Sqft</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider className={Style.cardDivider} />
          <CardActions className={Style.cardAction}>
            <div className={Style.author}>
              <Avatar
                alt="Tom Steven"
                src="/tom_steven-150x150.jpg"
                className={Style.img}
              />
              <Typography>By Tom Steven</Typography>
            </div>
            <Button className={Style.cardButton}>Details</Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
