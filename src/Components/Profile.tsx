import React from "react";
import { connect } from "react-redux";
import formatDate from "../utils/formatDate";

interface Props {
  email: string;
  profilePicture: string;
  username: string;
  createdDate: string;
}

interface State {}

class Profile extends React.Component<Props, State> {
  render() {
    const { email, profilePicture, username, createdDate } = this.props;
    return (
      <div className="profile-container">
        <img src={profilePicture} />
        <h3>{username}</h3>
        <p>contact: {email}</p>
        <p>joined on {createdDate}</p>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  email: state.user.user_email,
  profilePicture: state.user.user_profile_image,
  username: state.user.user_username,
  createdDate: formatDate(state.user.user_creation_epoch)
});

export default connect(mapStateToProps)(Profile);
