// react:
import React, { PureComponent } from "react";

// react-router:
import { withRouter } from "react-router";

// redux:
import { connect } from "react-redux";

// recompose:
import { compose } from "recompose";

// main components:

// material ui:
import { withStyles } from "@material-ui/core/styles";
// components:
import { AppBar, Menu, Toolbar, IconButton } from "@material-ui/core";
// icons:
import { MoreVert as MoreIcon } from "@material-ui/icons";

// libs:
import classNames from "classnames";


// jss:
const styles = (theme) => ({
	root: {
		zIndex: 1300,
		width: "100%",
		height: "48px",
		[theme.breakpoints.up("sm")]: {
			height: "64px",
		},
	},
	grow: {
		flexGrow: 1,
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
		cursor: "pointer",
	},
	sectionDesktop: {
		display: "none",
		alignItems: "center",
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
});

class MyAppBar extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			mobileMoreAnchorEl: null,
		};
	}

	componentDidMount() {}

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = (event) => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	render() {
		console.log("re-rendering appbar.");

		const { mobileMoreAnchorEl } = this.state;
		const { classes } = this.props;
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		const renderMobileMenu = (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMobileMenuOpen}
				onClose={this.handleMenuClose}
			>
				{this.props.mobileMenu}
			</Menu>
		);

		return (
			<div className={classNames(classes.root, this.props.rootClasses)}>
				<AppBar position="fixed">
					<Toolbar>
						{/* <IconButton
							className={classes.menuButton}
							color="inherit"
							aria-label="Open drawer"
							onClick={this.props.handleToggleDrawer}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							className={classes.title}
							variant="h6"
							color="inherit"
							noWrap
							onClick={() => {
								this.props.history.push("/");
							}}
						>
							Streams
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
							/>
						</div>
						 */}

						{this.props.main}

						<div className={classes.grow} />

						<div className={classes.sectionDesktop}>{this.props.desktop}</div>
						<div className={classes.sectionMobile}>
							{this.props.mobile}
							<IconButton
								aria-haspopup="true"
								onClick={this.handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default compose(
	withRouter,
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps),
)(MyAppBar);
