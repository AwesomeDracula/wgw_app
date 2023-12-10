export interface ICreateCard {
	cardNumber: string;
	nameOnCard: string;
	cvv: string;
	expiryDate: Date;
}

export default async (body: ICreateCard) => {
	const response = await fetch('http://localhost:3000/cards', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	const data: unknown = await response.json();
	return data;
};
