// react:
import React, { PureComponent } from "react";

// components:

// material ui:
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
// import CloseIcon from "@material-ui/icons/Close";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Username from "shared/components/account/Username.jsx";

// material ui:
// import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";


// redux:
import { connect } from "react-redux";
import { sendMessage } from "shared/features/chat.js";


// recompose:
import { compose } from "recompose";

// jss:

const styles = (theme) => ({
	root: {
		overflowY: "auto",
		// marginBottom: "15px",
		boxShadow: "none",
		position: "absolute",
		top: 64,
		left: 0,
		bottom: 90,
		right: 0,
	},
	listItem: {
		cursor: "pointer",
		userSelect: "none",
		width: "100%",
	},
});

class MemberList extends PureComponent {
	constructor(props) {
		super(props);

		this.messagesEnd = null;
		this.rootRef = React.createRef();
		this.shouldScroll = false;
	}

	handleClick = (event) => {};

	getMemberList = () => {

		const { classes } = this.props;

		let members = [];
		let count = 0;

		for (let key in this.props.accountMap) {

			if (!this.props.accountMap.hasOwnProperty(key)) {
				continue;
			}

			count++;
			let account = this.props.accountMap[key];
	
			members.push(
				<Username key={key} style={{ width: "100%" }} userid={account.userid}>
					<ListItem button className={classes.listItem} userid={account.userid}>
						<ListItemText primary={account.username} />
					</ListItem>
				</Username>,
			);
		}

		if (count === 0) {
			members.push(
				<MenuItem key={0} userid={null}>
					<Typography variant="inherit" noWrap>
						Loading...
					</Typography>
				</MenuItem>,
			);
		}
		return members;
	};




	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.root} elevation={4}>
				{this.getMemberList()}
			</Paper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		accountMap: state.stream.accountMap,
		isMod: state.client.roles.mod,
		isBanned: state.client.isBanned,
		// lastMessage: state.stream.chat.messages[state.stream.chat.messages.length - 1],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (text) => {
			dispatch(sendMessage(text));
		},
	};
};

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps),
)(MemberList);
