import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import cardsReducer from '@/store/cardSlice';

export const store = configureStore({
	reducer: {
		cards: cardsReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
