import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
	name: "client",
	initialState: {
		authToken: null,
		loggedIn: false,
		hostAuthed: false,
		userid: null,
		username: "???",
		connectedAccounts: [],
		validUsernames: [],
		usernameIndex: 0,
		waitlisted: false,
		timePlayed: 0,
		emailVerified: false,
		roles: {},
	},
	reducers: {
		updateClient(state, action) {
			return (state = { ...state, ...action.payload });
		},
		changeUsernameIndex(state, action) {
			state.usernameIndex = action.payload.usernameIndex;
			// state = { ...state, action.payload.usernameIndex };
			return state;
		},
		login(state, action) {},
		register(state, action) {},
		authenticate(state, action) {},
	},
});
export const {
	updateClient,
	changeUsernameIndex,
	authenticate,
	login,
	register,
} = clientSlice.actions;
export default clientSlice.reducer;
