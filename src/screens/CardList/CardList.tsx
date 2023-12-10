import { ImageVariant } from '@/components/atoms';
import { Header } from '@/components/molecules';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import BackIcon from '@/theme/assets/images/back.png';
import AddIcon from '@/theme/assets/images/add.png';
import { isImageSourcePropType } from '@/types/guards/image';
import { useEffect } from 'react';
import CardItem from '@/components/molecules/CardItem/CardItem';
import { ApplicationScreenProps } from '@/types/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAll } from '@/services/cards';
import { Card, setCards } from '@/store/cardSlice';
import { createOmiseCharge, createOmiseToken } from '@/services/omise';
import CardListEmpty from './CardListEmpty';

function CardList({ navigation }: Readonly<ApplicationScreenProps>) {
	const { t } = useTranslation(['card']);

	const { layout, gutters } = useTheme();

	const cards = useAppSelector(state => state.cards.cards);
	const dispatch = useAppDispatch();

	const fetchCards = async () => {
		const data = await fetchAll();
		dispatch(setCards(data));
	};

	useEffect(() => {
		void fetchCards();
	}, []);

	if (!isImageSourcePropType(BackIcon) || !isImageSourcePropType(AddIcon)) {
		throw new Error('Image source is not valid');
	}

	const onAddNewCardPress = () => navigation.navigate('AddNewCard');

	const onPressCardItem = async (card: Card) => {
		try {
			const omiseToken: unknown = await createOmiseToken(card);
			createOmiseCharge(omiseToken)
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
				.then(data => Alert.alert(`Pay ${data?.amount} successfully`))
				.catch(() => Alert.alert('Something wrong!!!'));
		} catch (error) {
			Alert.alert('Cannot create token');
		}
	};

	return (
		<SafeScreen>
			<Header
				leftButton={{
					child: (
						<ImageVariant
							style={[layout.iconWidth, layout.iconHeight]}
							source={BackIcon}
						/>
					),
					onPress: () => {},
				}}
				title={t('card:title')}
				rightButton={{
					child: (
						<ImageVariant
							style={[layout.iconWidth, layout.iconHeight]}
							source={AddIcon}
						/>
					),
					onPress: onAddNewCardPress,
				}}
			/>
			{cards.length === 0 ? (
				<CardListEmpty onAddNewCardPress={onAddNewCardPress} />
			) : (
				<ScrollView contentContainerStyle={[gutters.paddingBottom_18]}>
					{cards.map(card => {
						const expires = new Date(card.expiryDate);
						const shortYear = expires.getFullYear() % 100;
						return (
							<TouchableOpacity
								// eslint-disable-next-line no-underscore-dangle
								key={card._id}
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onPress={() => onPressCardItem(card)}
							>
								<CardItem
									cardNumber={card.cardNumber}
									nameOnCard={card.nameOnCard}
									expireDate={`${expires.getMonth() + 1}/${shortYear}`}
								/>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			)}
		</SafeScreen>
	);
}

export default CardList;
