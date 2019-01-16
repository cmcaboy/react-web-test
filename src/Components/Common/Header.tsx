import React from "react";
import { connect } from "react-redux";
import { startLogout } from "../../actions/auth";
import { Link } from "react-router-dom";

// The header component is only viewed on the expense pages
// It has 3 items:
// 1) Expense Champion logo that routes the user to the main page when clicked
// 2) Profile pic that routes the user to the profile page when clicked
// 3) Logout button that routes the user back to the auth page and clears
//    the user's unathenticates the user

interface Props {
  logout: () => void;
  profilePicture: string;
}

interface State {}

class Header extends React.Component<Props, State> {
  logout = () => this.props.logout();

  render() {
    const { profilePicture } = this.props;
    return (
      <div className="header">
        <div className="header-container">
          <Link to="/main">
            <h1 className="header-title">Expense Champion</h1>
          </Link>
          <div className="header-right">
            <Link to="/profile">
              <img src={profilePicture} className="header-img" />
            </Link>
            <h5 className="header-logout" onClick={this.logout}>
              Logout
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(startLogout())
});

const mapStateToProps = (state: any) => ({
  profilePicture: state.user.user_profile_image
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
