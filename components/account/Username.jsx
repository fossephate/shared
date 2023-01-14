// react:
import React, { PureComponent } from "react";

// components:
import PopoverMenu from "shared/components/account/PopoverMenu.jsx";

// material ui:
import { withStyles } from "@material-ui/core/styles";

// redux:
import { connect } from "react-redux";

// recompose:
import { compose } from "recompose";

// jss:
const styles = (theme) => ({
	root: {},
});

class Username extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			popoverOpen: false,
		};

		this.ref = React.createRef();
	}

	handleOpenPopover = () => {
		this.setState({ popoverOpen: true });
	};

	handleClosePopover = () => {
		this.setState({ popoverOpen: false });
	};

	componentDidMount() {
		this.setState({ loaded: true });
	}

	render() {
		return (
			<>
				<div
					style={this.props.style}
					onClick={this.handleOpenPopover}
					ref={(ref) => {
						this.ref = ref;
					}}
				>
					{this.props.children}
				</div>
				{this.state.loaded && (
					<PopoverMenu
						userid={this.props.userid}
						open={this.state.popoverOpen}
						onClose={this.handleClosePopover}
						anchorEl={this.ref}
					/>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default compose(withStyles(styles), connect(mapStateToProps))(Username);
