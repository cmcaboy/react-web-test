import React from "react";

interface Props {
  logout: () => void;
}

interface State {}

class NotFoundPage extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h3>Page Not Found</h3>
      </div>
    );
  }
}

export default NotFoundPage;
