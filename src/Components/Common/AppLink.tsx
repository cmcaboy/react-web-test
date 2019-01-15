import React from "react";

const AppLink = ({
  img,
  label,
  url
}: {
  img: string;
  label: string;
  url: string;
}) => (
  <div className="our-apps-apps-item">
    <a href={url}>
      <img src={img} className="our-apps-apps-item-img" />
      <h5>{label}</h5>
    </a>
  </div>
);

export { AppLink };
