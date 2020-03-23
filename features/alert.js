import { createSlice, createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";

const alertSlice = createSlice({
	name: "alert",
	initialState: {
		open: false,
		title: null,
		content: null,
		maxWidth: null,
		fullWidth: null,
	},
	reducers: {
		openAlert(state, action) {
			state.title = action.payload.title ? action.payload.title : null;
			state.content = action.payload.content ? action.payload.content : null;

			if (typeof action.payload.fullWidth !== "undefined") {
				state.fullWidth = action.payload.fullWidth;
			} else {
				state.fullWidth = true;
			}
			if (typeof action.payload.maxWidth !== "undefined") {
				state.maxWidth = action.payload.maxWidth;
			} else {
				state.maxWidth = "sm";
			}
			
			state.open = true;
		},
		closeAlert(state, action) {
			state.open = false;
		}
	},
});
export const {
	openAlert,
	closeAlert,
} = alertSlice.actions;
export default alertSlice.reducer;
