import Image from "next/image";

import { Container, Typography, Button } from "@mui/material";

import Style from "./newsLetter.module.scss";

const NewsLetter = () => {
  return (
    <div className={Style.newsLetterWrapper}>
      <Container maxWidth="xl">
        <div className={Style.container}>
          <div>
            <Typography variant="h2" component="h2" className={Style.mainTitle}>
              Sign up for newsletter
            </Typography>
            <Typography className={Style.description}>
              Get latest news and update
            </Typography>
          </div>
          <div className={Style.emailWrap}>
            <input
              type="email"
              placeholder="Enter your e-mail address"
              className={Style.emailInput}
            />
            <div>
              <Button className={Style.subcribeBtn}>Subcribe</Button>
            </div>
          </div>
        </div>
        <Image
          src="/newsletter-bg.png"
          alt="newsletter-bg"
          width={357}
          height={131}
          className={Style.bgImage}
        />
      </Container>
    </div>
  );
};

export default NewsLetter;
