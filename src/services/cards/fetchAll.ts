import { Card } from '@/store/cardSlice';

export default async () => {
	const response = await fetch('http://localhost:3000/cards');
	const data: Array<Card> = (await response.json()) as Array<Card>;
	return data;
};
