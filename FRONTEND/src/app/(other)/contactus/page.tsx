"use client";
import React, { useState } from "react";
import "../../../styles/contactus.css";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    query: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="contact_us_6">
      <div className="responsive-container-block container">
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="container-block form-wrapper">
            <div className="mob-text">
              <p className="text-blk contactus-head">Get in Touch</p>
              <p className="text-blk contactus-subhead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
                diam lectus sapien.
              </p>
            </div>
            <div className="responsive-container-block" id="i2cbk">
              <div
                className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                id="i10mt-3"
              >
                <p className="text-blk input-title">FIRST NAME</p>
                <input
                  className="input"
                  id="ijowk-3"
                  name="firstName"
                  placeholder="Please enter first name..."
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div
                className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                id="ip1yp"
              >
                <p className="text-blk input-title">EMAIL</p>
                <input
                  className="input"
                  id="ipmgh-3"
                  name="email"
                  placeholder="Please enter email..."
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div
                className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                id="ih9wi"
              >
                <p className="text-blk input-title">PHONE NUMBER</p>
                <input
                  className="input"
                  id="imgis-3"
                  name="phoneNumber"
                  placeholder="Please enter phone number..."
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div
                className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                id="i634i-3"
              >
                <p className="text-blk input-title">
                  WHAT DO YOU HAVE IN MIND ?
                </p>
                <textarea
                  className="textinput"
                  id="i5vyy-3"
                  name="query"
                  placeholder="Please enter query..."
                  value={formData.query}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <button
              className="submit-btn"
              id="w-c-s-bgc_p-1-dm-id-2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div
          className="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12"
          id="i772w"
        >
          <div className="map-part">
            <p className="text-blk map-contactus-head" id="w-c-s-fc_p-1-dm-id">
              Reach us at
            </p>
            <p className="text-blk map-contactus-subhead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
              diam lectus sapien.
            </p>
            <div className="social-media-links mob">
              <a className="social-icon-link" href="#" id="ix94i-2-2">
                <img
                  className="link-img image-block"
                  src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
                  alt="Twitter"
                />
              </a>
              <a className="social-icon-link" href="#" id="itixd">
                <img
                  className="link-img image-block"
                  src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"
                  alt="Facebook"
                />
              </a>
              <a className="social-icon-link" href="#" id="izxvt">
                <img
                  className="link-img image-block"
                  src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
                  alt="Google"
                />
              </a>
              <a className="social-icon-link" href="#" id="izldf-2-2">
                <img
                  className="link-img image-block"
                  src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
                  alt="Instagram"
                />
              </a>
            </div>
            <div className="map-box container-block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
