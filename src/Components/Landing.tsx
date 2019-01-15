import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { AppLink } from "./Common/AppLink";
import { WHO_WE_ARE_DESC_1, WHO_WE_ARE_DESC_2 } from "../utils/variables";
import emailValidation from "../utils/emailValidation";

interface Props {}

interface State {
  email: string;
  error: string;
  success: boolean;
}

class Landing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      error: "",
      success: false
    };
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ email: e.target.value });

  onClick = async () => {
    const { email } = this.state;
    this.setState({ error: "" });

    if (!emailValidation(email)) {
      return this.setState({ error: "Please specify a valid email" });
    }

    let data;
    try {
      const rawData = await fetch(
        `http://dev.datechnologies.co/Tests/scripts/add-email.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `email=${email}`
          // body: { email },
        }
      );
      data = await rawData.json();
      console.log("data: ", data);
    } catch (e) {
      // Could set an error here
      console.log("Error subscribing to email list: ", e);
      return this.setState({ error: "Could not connect to network" });
    }

    if (data.code !== "Success") {
      return this.setState({ error: data.message });
    }

    return this.setState({ success: true });
  };

  render() {
    const { email, error, success } = this.state;
    return (
      <div className="container">
        <div className="top-section">
          <Link to={`/auth`}>
            <h5 className="login-button">Login</h5>
          </Link>
          <img
            // width="400px"
            // height="200px"
            src="images/gpc_logo_large@2x.png"
            className="primary-logo"
            alt="D & A Technologies"
          />
          <h1 className="secondary-logo">APP DESIGN & DEVELOPMENT AGENCY</h1>
        </div>
        <div className="who-we-are">
          <h2 className="who-we-are-title">WHO WE ARE</h2>
          <div className="who-we-are-desc">
            <p>{WHO_WE_ARE_DESC_1}</p>
            <p>{WHO_WE_ARE_DESC_2}</p>
          </div>
        </div>
        <div className="our-apps">
          <h2 className="our-apps-title">OUR APPS</h2>
          <div className="our-apps-apps">
            <AppLink
              label="Movo"
              url="https://movo.me"
              img="images/logo_movo@2x.png"
            />
            <AppLink
              label="Conair WeightWatchers"
              url="https://itunes.apple.com/us/app/ww-body-analysis-scale-tracker/id1157071126?mt="
              img="images/logo_conair@2x.png"
            />
            <AppLink
              label="Tapping Solution"
              url="https://itunes.apple.com/us/app/the-tapping-solution/id1419815487?mt=8"
              img="images/logo_tappingSolution@2x.png"
            />
            <AppLink
              label="goTenna"
              url="https://www.gotenna.com"
              img="images/logo_goTenna@2x.png"
            />
          </div>
        </div>
        <div className="subscribe">
          <h2 className="subscribe-title">SUBSCRIBE TO NEWSLETTER</h2>
          <div className="subscribe-email">
            <input
              type="text"
              className="subscribe-input"
              placeholder="Your email"
              value={email}
              onChange={this.onChange}
            />
            <button
              disabled={success}
              onClick={this.onClick}
              className="subscribe-button"
            >
              SUBSCRIBE
            </button>
          </div>
          <p className="error">{error}</p>
          <p className="success">
            {success && "You are subscribed. Thank you!"}
          </p>
        </div>
        <div className="footer">
          <p className="footer-item">Footer</p>
        </div>
      </div>
    );
  }
}

export default Landing;
