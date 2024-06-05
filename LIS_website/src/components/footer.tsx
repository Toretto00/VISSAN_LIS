"use-client";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { Grid, Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import CircleIcon from "@mui/icons-material/Circle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

const quickLinks: { title: string; link: string }[] = [
  { title: "About Us", link: "/about" },
  { title: "Blog & Articles", link: "/" },
  { title: "Term and Conditions", link: "/" },
  { title: "Privacy Policy", link: "/" },
  { title: "Contact Us", link: "/contact" },
];

function Footer() {
  const router = useRouter();

  return (
    <footer style={{ backgroundColor: "#173454" }}>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={2}
          rowSpacing={8}
          sx={{
            paddingTop: "40px",
            paddingBottom: "40px",
            width: "100%",
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ "&:hover": { cursor: "pointer" } }}>
              <Image src="/logo_light.svg" width={136} height={36} alt="Logo" />
            </Box>
            <Typography color={"#BCD3DA"} sx={{ marginTop: "8px" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </Typography>
            <Box sx={{ marginTop: "8px" }}>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#2C4764",
                  borderRadius: "4px",
                  marginRight: "8px",

                  "&:hover": {
                    backgroundColor: "#00C194",
                  },
                  "&:hover .icon-rotate": {
                    transform: "rotateY(360deg)",
                    transition: "transform 0.6s ease",
                  },
                }}
              >
                <FacebookIcon className="icon-rotate" />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#2C4764",
                  borderRadius: "4px",
                  marginRight: "8px",

                  a: {
                    lineHeight: "20px",
                  },

                  "&:hover": {
                    backgroundColor: "#00C194",
                  },
                  "&:hover .icon-rotate": {
                    transform: "rotateY(360deg)",
                    transition: "transform 0.6s ease",
                  },
                }}
              >
                <Link href={"https://discord.gg/QVYWPX2D"} target="blank">
                  <ConnectWithoutContactIcon
                    className="icon-rotate"
                    sx={{
                      color: "white",
                    }}
                  />
                </Link>
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#2C4764",
                  borderRadius: "4px",
                  marginRight: "8px",

                  "&:hover": {
                    backgroundColor: "#00C194",
                  },
                  "&:hover .icon-rotate": {
                    transform: "rotateY(360deg)",
                    transition: "transform 0.6s ease",
                  },
                }}
              >
                <LinkedInIcon className="icon-rotate" />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#2C4764",
                  borderRadius: "4px",
                  marginRight: "8px",

                  "&:hover": {
                    backgroundColor: "#00C194",
                  },
                  "&:hover .icon-rotate": {
                    transform: "rotateY(360deg)",
                    transition: "transform 0.6s ease",
                  },
                }}
              >
                <PinterestIcon className="icon-rotate" />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#2C4764",
                  borderRadius: "4px",

                  "&:hover": {
                    backgroundColor: "#00C194",
                  },
                  "&:hover .icon-rotate": {
                    transform: "rotateY(360deg)",
                    transition: "transform 0.6s ease",
                  },
                }}
              >
                <InstagramIcon className="icon-rotate" />
              </IconButton>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" color={"white"}>
              Quick Links
            </Typography>
            <Divider
              sx={{
                height: "4px",
                borderRadius: "4px",
                width: "20%",
                marginTop: "24px",
                backgroundColor: "#00C194",
                opacity: 1,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                justifyContent: "center",
                alignItems: "left",
              }}
            >
              {quickLinks.map((link) => (
                <Button
                  onClick={() => {
                    router.push(link.link);
                  }}
                  startIcon={<CircleIcon sx={{ height: "8px" }} />}
                  key={link.title}
                  sx={{
                    justifyContent: "center",
                    width: "fit-content",
                    color: "#BCD3DA",
                    marginTop: "4px",
                    textTransform: "none",
                    transform: "translate(0)",
                    transition: "transform 0.3s ease",

                    "&:hover": {
                      color: "white",
                      transform: "translate(4px)",
                      transition: "transform 0.3s ease",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography variant="h5" color={"white"}>
              Newsletter
            </Typography>
            <Divider
              sx={{
                height: "4px",
                borderRadius: "4px",
                width: "20%",
                marginTop: "24px",
                backgroundColor: "#00C194",
                opacity: 1,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                justifyContent: "center",
                alignItems: "left",
              }}
            >
              <TextField
                variant="outlined"
                label="Enter email address"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  marginTop: "24px",
                }}
              ></TextField>
              <Button
                variant="contained"
                sx={{
                  width: "50%",
                  marginTop: "8px",
                  backgroundColor: "#00A679",

                  "&:hover": { backgroundColor: "#00C194" },
                }}
              >
                Subcribe
              </Button>
              <Typography sx={{ color: "#BCD3DA", marginTop: "8px" }}>
                We never span you!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography variant="h5" color={"white"}>
              Contact
            </Typography>
            <Divider
              sx={{
                height: "4px",
                borderRadius: "4px",
                width: "20%",
                marginTop: "24px",
                backgroundColor: "#00C194",
                opacity: 1,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "left",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "24px",
                  marginBottom: "8px",
                }}
              >
                <LocationOnIcon sx={{ color: "#BCD3DA" }} />
                <Typography sx={{ color: "#BCD3DA" }}>
                  121 King St, Melbourne den 3000, Australia
                </Typography>
              </Box>
              <Button
                startIcon={<EmailIcon />}
                sx={{
                  justifyContent: "center",
                  width: "fit-content",
                  color: "#BCD3DA",
                  marginTop: "4px",
                  textTransform: "none",
                  transform: "translate(0)",
                  transition: "transform 0.3s ease",

                  "&:hover": {
                    color: "white",
                    transform: "translate(4px)",
                    transition: "transform 0.3s ease",
                    backgroundColor: "transparent",
                  },
                }}
              >
                info@example.com
              </Button>
              <Button
                startIcon={<PhoneIcon />}
                sx={{
                  justifyContent: "center",
                  width: "fit-content",
                  color: "#BCD3DA",
                  marginTop: "4px",
                  textTransform: "none",
                  transform: "translate(0)",
                  transition: "transform 0.3s ease",

                  "&:hover": {
                    color: "white",
                    transform: "translate(4px)",
                    transition: "transform 0.3s ease",
                    backgroundColor: "transparent",
                  },
                }}
              >
                +123-596-000
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
