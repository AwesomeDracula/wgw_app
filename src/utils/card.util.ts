export function getCardLastFourDigits(cardNumber: string) {
	if (cardNumber.length > 3) {
		return cardNumber.substring(cardNumber.length - 4);
	}
	return cardNumber;
}
