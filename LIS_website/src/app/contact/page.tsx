"use client";
import * as React from "react";
import Style from "./contact.module.scss"
import Container from "@mui/material/Container";
import Box from "@mui/material/Box"
import "../globals.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';

function Contact() {

    return (
        <Box sx={{
            minHeight: {xs: "2430px", sm: "2330px", md: "1720px", lg: "1720px", xl: "1720px"},
            backgroundColor: "#fff",
            paddingTop: "86px"
        }}>
           <Box
                className = {Style.breadcrumbBanner} 
           >
                <div className={Style.barContainer}>
                    <div className={Style.containerTitle}>
                        <>
                            <a href="/" style={{
                                color: "#878c9f",
                                textDecoration: "none",
                            }}>
                                Home
                            </a>
                            <ChevronRightIcon 
                                sx={{
                                    fontSize: "18px",
                                    marginRight:"7px",
                                    marginLeft:"7px"
                                }}
                            />
                        </>
                    </div>
                    <div className={Style.contactAddress}>
                       Contact
                    </div>
                </div>
           </Box>
           <Container id={Style.primary} 
                sx={{
                    maxWidth: {lg: "1315px"},
                    padding: {xs:"0px", sm: "0px" ,md: "0px"}
                }}
            >
                <Container className={Style.elementSection}
                    sx={{
                        padding: {xs:"0px",sm: "0px" ,md: "0px"}
                    }}
                >
                    <Box className = {Style.elementContainer}
                        sx={{
                            flexDirection: {xs:"column !important",sm: "column !important", md: "row !important"}
                        }}
                    >
                        <Box 
                            className = {Style.elementColumn}
                            sx={{
                                width: {xs:"100%", md: "54.805%", sm: "100%"}
                            }}
                        >
                            <Box
                                className = {Style.widgetWrap}
                                sx={{
                                    padding: {xs:"15px 15px 15px 15px !important", sm: "15px 15px 15px 15px !important"},
                                    marginBottom: {xs:"20px", sm: "20px"},
                                    alignItems: {xs: "center",sm: "center"}
                                }}
                            >
                                <Box>
                                    <Box>
                                        <Box
                                            sx={{
                                                width: {xs:"100%", sm: "100%"}
                                            }}
                                            className = {Style.elementColumn}
                                        >
                                            <Box
                                                className = {Style.widgetWrap_2}
                                            >
                                                <Box className = {Style.elementElement}
                                                    sx={{
                                                        marginBottom: "30px"
                                                    }}
                                                >
                                                    <div className = {Style.elementWidgetContainer}>
                                                        <div className = {Style.sectionTitleWrap}>
                                                           <div className={Style.titleInner}>
                                                                <h2 className={Style.mainTitle}>
                                                                    Get in Touch
                                                                </h2>

                                                                <div className={Style.description}>
                                                                    <p>Borem ipsum dolor sit amet conse ctetur adipisicing elit sed do eiusmod Eorem ipsum dolor sit amet conse ctetur.</p>
                                                                </div>
                                                           </div>
                                                        </div>
                                                    </div>
                                                </Box>
                                                <Box className = {Style.element2308}>
                                                    <Box className = {Style.element2308Section}>
                                                        <Box 
                                                            className = {Style.elementCol2308}
                                                            sx={{
                                                                width: {sm: "100%"}
                                                            }}
                                                        >
                                                            <Box className = {Style.element2308Widget}>
                                                                <Box className = {Style.elementElement2308}>
                                                                    <Box 
                                                                        sx={{
                                                                            overflow: "hidden",
                                                                        }}
                                                                    >
                                                                        <div className={Style.serviceBox}>
                                                                            <div className={Style.iconHolder}>
                                                                                <PlaceIcon className = {Style.fas} />
                                                                            </div>
                                                                            <div className={Style.contentHolder}>
                                                                                <h3 className = {Style.infoTitle}>
                                                                                    Location
                                                                                </h3>
                                                                                <p className={Style.infoContent}>
                                                                                    131 Martens Place, Alexandra Hills, Australia.
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </Box>

                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box className = {Style.element2308}>
                                                    <Box className = {Style.element2308Section}>
                                                        <Box 
                                                            className = {Style.elementCol2308}
                                                            sx={{
                                                                width: {sm: "100%"}
                                                            }}
                                                        >
                                                            <Box className = {Style.element2308Widget}>
                                                                <Box className = {Style.elementElement2308}>
                                                                    <Box 
                                                                        sx={{
                                                                            overflow: "hidden",
                                                                        }}
                                                                    >
                                                                        <div className={Style.serviceBox}>
                                                                            <div className={Style.iconHolder}>
                                                                                <LocalPhoneIcon className = {Style.fas} />
                                                                            </div>
                                                                            <div className={Style.contentHolder}>
                                                                                <h3 className = {Style.infoTitle}>
                                                                                    Emergency Call
                                                                                </h3>
                                                                                <p className={Style.infoContent}>
                                                                                    +86 21 6137 9292
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </Box>

                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box className = {Style.element2308}>
                                                    <Box className = {Style.element2308Section}>
                                                        <Box 
                                                            className = {Style.elementCol2308}
                                                            sx={{
                                                                width: {sm: "100%"}
                                                            }}
                                                        >
                                                            <Box className = {Style.element2308Widget}>
                                                                <Box className = {Style.elementElement2308}>
                                                                    <Box 
                                                                        sx={{
                                                                            overflow: "hidden",
                                                                        }}
                                                                    >
                                                                        <div className={Style.serviceBox}>
                                                                            <div className={Style.iconHolder}>
                                                                                <ShareIcon className = {Style.fas} />
                                                                            </div>
                                                                            <div className={Style.contentHolder}>
                                                                                <h3 className = {Style.infoTitle}>
                                                                                    Follow Us On
                                                                                </h3>
                                                                                <div className={Style.socialIcon}>
                                                                                    <FacebookIcon className={Style.icon} />
                                                                                    <TwitterIcon className={Style.icon} />
                                                                                    <PinterestIcon className={Style.icon} />
                                                                                    <InstagramIcon className={Style.icon} />
                                                                                    <RedditIcon className={Style.icon} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Box>

                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box 
                            className = {Style.elementColumn}
                            sx={{
                                width: {xs: "100%", md: "54.805%", sm: "100%"},
                                padding: {xs: "15px", sm: "15px"},
                                paddingRight: {md: "0px", lg: "0px"}
                            }}
                        >
                            <Box
                                className = {Style.widgetWrap_3}
                            >
                                <Box    >
                                    <Box>
                                        <Box
                                            sx={{
                                                width: {xs:"100%", sm: "100%"}
                                            }}
                                            className = {Style.elementColumn}
                                        >
                                            <Box
                                                className = {Style.widgetWrap_2}
                                            >
                                                <Box className = {Style.elementElement}
                                                    sx={{
                                                        marginBottom: "30px"
                                                    }}
                                                >
                                                    <div className = {Style.elementWidgetContainer}>
                                                        <div className = {Style.sectionTitleWrap}>
                                                           <div className={Style.titleInner}>
                                                                <h2 className={Style.mainTitle}>
                                                                    Quick Contact
                                                                </h2>

                                                                <div className={Style.description}>
                                                                    <p>Borem ipsum dolor sit amet conse ctetur adipisicing elit sed do eiusmod Eorem ipsum dolor sit amet conse ctetur.</p>
                                                                </div>
                                                           </div>
                                                        </div>
                                                    </div>
                                                </Box>
                                                <Box className = {Style.elementElement}>
                                                    <Box className= {Style.elementFluent}>
                                                        <form data-form_id ="1" id={Style.fluentForm_1} className={Style.fluentForm_1} data-form_instance = "ff_form_instance_1_1" method="POST">
                                                            <fieldset className={Style.elementFieldset}>
                                                                <legend className={Style.ff_screen_reader_title}>
                                                                    Contact Form
                                                                </legend>
                                                                <input type="hidden" name="__fluent_form_embded_post_id" value="2308" />
                                                                <input type="hidden" id={Style.fluentForm1FluentFormNonce} name="_fluentform_1_fluentformnonce" value="e3373ab833"></input>
                                                                <input type="hidden" name="_wp_http_referer" value="/contact/"></input>
                                                                <Box className = {Style.ffTContainer}>
                                                                    <Box className = {Style.ffTContainer}>
                                                                       <Box className = {Style.margin} sx={{width: "100%"}}>
                                                                            <Box className = {Style.ffTCell}>
                                                                                <Box className = {Style.fluentForm}>
                                                                                    <div className={Style.inputLabel}>
                                                                                        <label className = {Style.ff1Title}>
                                                                                            Name
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className={Style.inputContent}>
                                                                                        <input type="text" name = "names[first-name]" id={Style.namesFirstName} className= {Style.elFormControl} 
                                                                                               aria-invalid="false" aria-required = "false"
                                                                                        />
                                                                                    </div>
                                                                                </Box>
                                                                                <Box className = {Style.fluentForm}>
                                                                                    <div className={Style.inputLabel}>
                                                                                        <label className = {Style.ff1Title}>
                                                                                            Phone
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className={Style.inputContent}>
                                                                                        <input type="text" name = "names[first-name]" id={Style.namesFirstName} className= {Style.elFormControl} 
                                                                                               aria-invalid="false" aria-required = "false"
                                                                                        />
                                                                                    </div>
                                                                                </Box>
                                                                            </Box>
                                                                       </Box>
                                                                       <Box className = {Style.margin} sx = {{width: "100%"}}>
                                                                            <Box className = {Style.ffTCell}>
                                                                                <Box className = {Style.fluentForm_2}>
                                                                                    <div className={Style.inputLabel}>
                                                                                        <label className = {Style.ff1Title}>
                                                                                            Comments
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className={Style.inputContent}>
                                                                                        <textarea name = "names[first-name]" id={Style.namesFirstName_2} className= {Style.elFormControl} 
                                                                                            aria-invalid="false" aria-required = "false"
                                                                                        />
                                                                                    </div>
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                                <Box className = {Style.submitBtn}>
                                                                    <button type="submit" className={Style.btnSubmit}>
                                                                        SEND MESSAGE
                                                                    </button>
                                                                </Box>
                                                            </fieldset>
                                                        </form>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        
                    </Box>
                </Container>
                <Container
                    sx={{
                        margin: "0px",
                        padding: "0px",
                        paddingLeft: {xs: "0px !important", lg: "24px !important"},
                        width: "100%",
                        maxWidth: "1290px !important"
                    }}
                >
                    <Box>
                        <Box className = {Style.elementCol100}>
                            <Box className = {Style.elementWidgetWrap}>
                                <Box sx={{position: "relative", width: {xs: "96% !important", sm: "100% !important", md: "100% !important", xl:"100% !important"}}} className = {Style.elementElement}>
                                    <Box className = {Style.mapWidgetContainer}>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12655.07462189681!2d-99.16545225773281!3d19.43934071811698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8cdc19e3477%3A0xe98bef6360302321!2sUVM%20Campus%20San%20Rafael!5e0!3m2!1sbn!2sbd!4v1625466586177!5m2!1sbn!2sbd"
                                            width="1200" height="500" allowFullScreen loading="lazy" className={Style.iframeMap}
                                        >
                                            
                                        </iframe>
                                    </Box>
                                </Box>
                            </Box>                              
                        </Box>
                    </Box>
                </Container>
           </Container>
        </Box>
    ) 
}

export default Contact;