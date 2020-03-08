import { takeEvery } from "redux-saga/effects";
import { login, register, authenticate } from "shared/features/client.js";

const handleClientActions = (params) => {
	let list = [];
	list.push(
		takeEvery(login, (action) => {
			params.socket.emit(
				"login",
				{ ...action.payload, socketid: params.socket.id },
				(data) => {
					if (action.payload.cb) {
						action.payload.cb(data);
					}
				},
			);
		}),
	);
	list.push(
		takeEvery(register, (action) => {
			params.socket.emit("register", { ...action.payload }, (data) => {
				if (action.payload.cb) {
					action.payload.cb(data);
				}
			});
		}),
	);
	list.push(
		takeEvery(authenticate, (action) => {
			params.socket.emit("authenticate", { authToken: action.payload.authToken });
		}),
	);
	return list;
};

export default handleClientActions;
