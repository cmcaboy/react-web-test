import React, { SFC } from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../../selectors/expenses";
import ReactModal from "react-modal";
import { WELCOME, WELCOME_2 } from "../../utils/variables";
import { firstUse } from "../../actions/user";

interface Props {
  showModal: boolean;
  firstUse: () => void;
}

interface State {
  showModal: boolean;
}
const customStyles = {
  content: {
    margin: "10% 20%",
    borderWidth: "2px",
    borderColor: "#364051",
    overflowY: "scroll"
  }
};

class NewUserModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showModal: this.props.showModal
    };
  }

  closeModal = () => {
    // turn modal off
    this.setState({ showModal: false });
    // change user_is_new to 0 in memory
    this.props.firstUse();
  };

  render() {
    const { showModal } = this.state;
    return (
      <ReactModal
        style={customStyles}
        isOpen={showModal}
        contentLabel="Expense Champion"
      >
        <h1>Welcome to Expense Champion!</h1>
        <p>{WELCOME}</p>
        <p>{WELCOME_2}</p>
        <button className="button modal-center" onClick={this.closeModal}>
          CLOSE
        </button>
      </ReactModal>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  firstUse: () => dispatch(firstUse())
});

const mapStateToProps = (state: any) => ({
  showModal: !!state.user.user_is_new
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUserModal);
