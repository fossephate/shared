import { createSlice } from "@reduxjs/toolkit";
const clientSlice = createSlice({
	name: "client",
	initialState: {},
	reducers: {
		updateClient(state, action) {
			state.push({ ...action.payload });
		},
		updateUsername(state, action) {
			const todo = state.find((todo) => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
	},
});
export const { updateClient, updateUsername } = clientSlice.actions;
export default clientSlice.reducer;
