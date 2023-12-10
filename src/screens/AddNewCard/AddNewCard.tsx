import { Button, ImageVariant, InputVariant } from '@/components/atoms';
import { Header } from '@/components/molecules';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import BackIcon from '@/theme/assets/images/back.png';
import MastercardSecureCode from '@/theme/assets/images/mastercardSecureCode.png';
import OmiseIcon from '@/theme/assets/images/omise.png';
import VerifiedByVisa from '@/theme/assets/images/verifiedByVisa.png';
import { isImageSourcePropType } from '@/types/guards/image';
import { ApplicationScreenProps } from '@/types/navigation';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import JcbIcon from '@/theme/assets/images/jcb.png';
import MasterCardIcon from '@/theme/assets/images/mastercard.png';
import VisaIcon from '@/theme/assets/images/visaIcon.png';
import { Controller, useForm } from 'react-hook-form';
import createOne, { ICreateCard } from '@/services/cards/createOne';
import { useAppDispatch } from '@/store/hooks';
import { setCards } from '@/store/cardSlice';
import { fetchAll } from '@/services/cards';

type FormData = {
	cardNumber: string;
	nameOnCard: string;
	expiryDate: string;
	cvv: string;
};

const styles = StyleSheet.create({
	cardIcon: {
		width: 25,
		height: 15,
	},
	parralelInput: {
		width: '45%',
	},
	brand: {
		height: 20,
		minWidth: 40,
		maxWidth: 50,
	},
});

function AddNewCard({ navigation }: Readonly<ApplicationScreenProps>) {
	const { t } = useTranslation(['card']);
	const { layout, gutters, fonts } = useTheme();
	const dispatch = useAppDispatch();
	const fetchCards = async () => {
		const data = await fetchAll();
		dispatch(setCards(data));
	};

	if (
		!isImageSourcePropType(BackIcon) ||
		!isImageSourcePropType(MastercardSecureCode) ||
		!isImageSourcePropType(OmiseIcon) ||
		!isImageSourcePropType(VerifiedByVisa)
	) {
		throw new Error('Image source is not valid');
	}

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<FormData>({
		defaultValues: {
			cardNumber: '',
			nameOnCard: '',
			expiryDate: '',
			cvv: '',
		},
	});
	const onSubmit = async (data: FormData) => {
		try {
			const expirationYear = `20${data.expiryDate.substring(3)}`;
			const expirationMonth = data.expiryDate.substring(0, 2);
			const cardData: ICreateCard = {
				...data,
				expiryDate: new Date(
					parseInt(expirationYear, 10),
					parseInt(expirationMonth, 10),
				),
			};
			await createOne(cardData);
			await fetchCards();
			navigation.navigate('CardList');
		} catch (error) {
			Alert.alert('Something wrong!');
		}
	};

	const renderCardNumberSuffix = () => {
		if (
			!isImageSourcePropType(VisaIcon) ||
			!isImageSourcePropType(MasterCardIcon) ||
			!isImageSourcePropType(JcbIcon)
		) {
			throw new Error('Image source is not valid');
		}
		return (
			<View style={[layout.row]}>
				<ImageVariant style={[styles.cardIcon]} source={VisaIcon} />
				<ImageVariant
					style={[gutters.marginLeft_5, styles.cardIcon]}
					source={MasterCardIcon}
				/>
				<ImageVariant
					style={[gutters.marginLeft_5, styles.cardIcon]}
					source={JcbIcon}
				/>
			</View>
		);
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
					onPress: () => navigation.goBack(),
				}}
			/>
			<ScrollView contentContainerStyle={[gutters.paddingHorizontal_24]}>
				<View style={[gutters.marginTop_24]}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'This is required.',
							},
							minLength: {
								value: 16,
								message: 'Min length must be 16.',
							},
							maxLength: {
								value: 16,
								message: 'Max length must be 16.',
							},
							pattern: {
								value: /^\d+$/,
								message: 'Contains only numbers.',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputVariant
								title={t('card:cardNumber')}
								placeholder="0000 0000 0000 0000"
								suffix={renderCardNumberSuffix()}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors.cardNumber}
							/>
						)}
						name="cardNumber"
					/>
				</View>
				<View style={[gutters.marginTop_24]}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'This is required.',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputVariant
								title={t('card:nameOnCard')}
								placeholder="Ty Lee"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors.nameOnCard}
							/>
						)}
						name="nameOnCard"
					/>
				</View>
				<View style={[layout.row, layout.justifyBetween, gutters.marginTop_24]}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'This is required.',
							},
							minLength: {
								value: 5,
								message: 'MM/YY expected.',
							},
							maxLength: {
								value: 5,
								message: 'MM/YY expected.',
							},
							pattern: {
								value: /^\d+\/\d+$/,
								message: 'Bad format.',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={styles.parralelInput}>
								<InputVariant
									style={[layout.itemsStart, fonts.medium, fonts.size_16]}
									title={t('card:expiryDate')}
									placeholder="MM/YY"
									onBlur={onBlur}
									error={errors.expiryDate}
									onChangeText={(text: string) => {
										let formatText = text;
										if (text.length > 2 && text[2] !== '/') {
											formatText = `${text.substring(0, 2)}/${text.substring(
												2,
											)}`;
										}
										onChange(formatText);
									}}
									value={value}
								/>
							</View>
						)}
						name="expiryDate"
					/>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'This is required.',
							},
							minLength: {
								value: 3,
								message: 'Min length must be 3.',
							},
							maxLength: {
								value: 3,
								message: 'Max length must be 3.',
							},
							pattern: {
								value: /^\d+$/,
								message: 'Contains only numbers.',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={styles.parralelInput}>
								<InputVariant
									style={[layout.itemsEnd, fonts.medium, fonts.size_16]}
									title={t('card:cvv')}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									error={errors.cvv}
								/>
							</View>
						)}
						name="cvv"
					/>
				</View>
				<View style={[layout.row, layout.justifyCenter, gutters.marginTop_40]}>
					<ImageVariant
						style={[styles.brand, gutters.marginHorizontal_10]}
						source={VerifiedByVisa}
						resizeMode="contain"
					/>
					<ImageVariant
						style={[styles.brand, gutters.marginHorizontal_10]}
						source={MastercardSecureCode}
						resizeMode="contain"
					/>
					<ImageVariant
						style={[styles.brand, gutters.marginHorizontal_10]}
						source={OmiseIcon}
						resizeMode="contain"
					/>
				</View>
			</ScrollView>
			<View style={[gutters.paddingHorizontal_24]}>
				<Button
					disabled={!isDirty || !isValid}
					title={t('card:addCardBtn')}
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
		</SafeScreen>
	);
}

export default AddNewCard;
