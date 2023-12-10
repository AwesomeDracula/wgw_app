import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from './store';

export interface Card {
	_id: string;
	cardNumber: string;
	nameOnCard: string;
	cvv: string;
	expiryDate: string;
}

interface CardsState {
	cards: Array<Card>;
}

const initialState: CardsState = {
	cards: [],
};

export const counterSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		setCards: (state, action: PayloadAction<Array<Card>>) => {
			// eslint-disable-next-line no-param-reassign
			state.cards = action.payload;
		},
	},
});

export const { setCards } = counterSlice.actions;

export const fetchAllCards = (state: RootState) => state.cards.cards;

export default counterSlice.reducer;
