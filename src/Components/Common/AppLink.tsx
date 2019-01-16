import React, { SFC } from "react";

// App Icons on Landing page

interface Props {
  img: string;
  label: string;
  url: string;
}

const AppLink: SFC<Props> = ({
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
