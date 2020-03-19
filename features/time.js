import { createSlice } from "@reduxjs/toolkit";

const timeSlice = createSlice({
	name: "time",
	initialState: {
		server: 0, // server time (in ms)
		lastServerUpdate: 0, // when it was last updated (in ms)
		ping: 0,
	},
	reducers: {
		updateServerTime(state, action) {
			state.server = action.payload.time;
			state.lastServerUpdate = Date.now();
		},
		updatePing(state, action) {
			state.ping = action.payload.time;
		},
		updateLastServerUpdate(state, action) {
			state.lastServerUpdate = action.payload.time;
		},
	},
});
export const { updateServerTime, updatePing, updateLastServerUpdate } = timeSlice.actions;
export default timeSlice.reducer;
