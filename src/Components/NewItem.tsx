import React from "react";

interface Props {
  logout: () => void;
}

interface State {}

class NewItem extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h3>New Item Page</h3>
      </div>
    );
  }
}

export default NewItem;
