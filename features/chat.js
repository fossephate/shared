import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
	name: "chat",
	initialState: {
		messages: [],
		userids: [],
	},
	reducers: {
		updateMessages(state, action) {
			state.messages = action.payload.messages;
		},
		sendMessage(state, action) {},
		receiveMessage(state, action) {
			// 			text: data.text,
			// 			username: data.username,
			// 			userid: data.userid,
			// 			time: data.time,
			// 			isReplay: data.isReplay,
			// 			isBanned: data.isBanned,
			// todo: fix chat so this isn't needed:
			setTimeout(() => {
				window.dispatchEvent(new Event("resize"));
			}, 1000);
			// add message to messages:
			state.messages.push({
				id: action.payload.id,
				userid: action.payload.userid,
				username: action.payload.username,
				text: action.payload.text,
				time: action.payload.time,
				isReplay: action.payload.isReplay,
				isBanned: action.payload.isBanned,
			});
			let userids = state.userids.splice(0);
			// add the userid if not already in the state:
			if (userids.indexOf(action.payload.userid) == -1) {
				state.userids.push(action.payload.userid);
			}
			if (action.payload.pinged) {
				// todo:
			}
		},
	},
});
export const { sendMessage, receiveMessage, updateMessages } = chatSlice.actions;
export default chatSlice.reducer;
