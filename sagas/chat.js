import { takeEvery } from "redux-saga/effects";
import { sendMessage } from "shared/features/chat.js";

const handleChatActions = (params) => {
	let list = [];
	list.push(
		takeEvery(sendMessage, (action) => {
			params.socket.emit("chatMessage", { text: action.payload.text });
		}),
	);
	return list;
};

export default handleChatActions;
