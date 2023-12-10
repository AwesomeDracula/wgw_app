/* eslint-disable */
import Config from "react-native-config";
import Omise from 'omise-react-native';

Omise.config(
	Config.omise_pkey,
	Config.omise_skey,
	'2017-11-12',
);

export const createOmiseToken = async (cardData) => {
  const expiryDate = new Date(cardData.expiryDate);
  console.log(Config.omise_pkey);
	const data = await Omise.createToken({
		card: {
			name: cardData.nameOnCard,
			city: 'Hanoi',
			postal_code: 10320,
			number: cardData.cardNumber,
			expiration_month: expiryDate.getMonth() + 1,
			expiration_year: expiryDate.getFullYear(),
			security_code: cardData.cvv,
		},
	});
	return data.id;
};

export const createOmiseCharge = async (cardToken) => {
  await Omise.createSource({
    type: 'internet_banking_bbl',
    amount: 5000,
    currency: 'thb'
  });
  const data = await Omise.createCharge({
    description: 'test',
    amount: 5000,
    currency: 'thb',
    capture: true,
    card: cardToken,
  });

  return data;
}
