// react:
import React, { PureComponent } from "react";

// material ui:
import { withStyles } from "@material-ui/core/styles";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";

// recompose:
import { compose } from "recompose";

// redux:
import { connect } from "react-redux";
import { closeAlert } from "shared/features/alert.js";

// jss:
const styles = (theme) => ({
	root: {},
});

class MyAlert extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleClose = () => {
		this.props.closeAlert();
	};

	render() {
		const { classes } = this.props;

		const { open, title, content, maxWidth, fullWidth } = this.props.alert;

		return (
			<div>
				<Dialog
					open={open}
					onClose={this.handleClose}
					fullWidth={fullWidth}
					maxWidth={maxWidth}
				>
					{/* {this.props.title !== null && <DialogTitle>{this.props.title}</DialogTitle>} */}
					<DialogTitle>{title}</DialogTitle>

					<DialogContent>
						{/* {this.props.content !== null && (
							<DialogContentText>{this.props.content}</DialogContentText>
						)} */}
						<DialogContentText>{content}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary" autoFocus>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		alert: state.alert,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeAlert: (data) => {
			dispatch(closeAlert(data));
		},
	};
};

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps),
)(MyAlert);
