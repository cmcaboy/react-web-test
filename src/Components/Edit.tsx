import React from "react";

interface Props {
  logout: () => void;
}

interface State {}

class Edit extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h3>Edit Page</h3>
      </div>
    );
  }
}

export default Edit;
