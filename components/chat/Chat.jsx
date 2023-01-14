// react:
import React, { PureComponent } from "react";

import MessageList from "./MessageList.jsx";
import MemberList from "./MemberList.jsx";
import SendMessageForm from "./SendMessageForm.jsx";

// material ui:
import { withStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab } from "@material-ui/core";

// libs:
import { device } from "shared/libs/utils.js";

// jss:
const styles = (theme) => ({
	root: {
		gridArea: "chat",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		// flex: "1",
		padding: "5px",
		height: "300px",
		// new:
		position: "relative",
	},
	[device.tablet]: {
		root: {
			height: "unset",
		},
	},
	[device.laptop]: {
		root: {
			// position: "",
			// width: "100%",
			// padding: "5px",
		},
	},
});

// @withStyles(styles)
class Chat extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			tab: 0,
		};
	}

	handleChangeTab = (event, value) => {
		this.setState({ tab: value });
	};

	render() {
		const { classes } = this.props;

		if (this.props.hide) {
			return null;
		}

		return (
			<Paper id="chat" className={classes.root}>
				<Tabs
					value={this.state.tab}
					onChange={this.handleChangeTab}
					indicatorColor="primary"
					centered
					variant="fullWidth"
				>
					<Tab label="Chat" />
					<Tab label="Members" />
				</Tabs>
				<div hidden={this.state.tab !== 0}>
					<MessageList />
					<SendMessageForm />
				</div>
				<div hidden={this.state.tab !== 1}>
					<MemberList />
				</div>
			</Paper>
		);
	}
}

export default withStyles(styles)(Chat);
