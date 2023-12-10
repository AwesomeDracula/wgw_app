import { ImageVariant } from '@/components/atoms';
import { StyleSheet, Text, View } from 'react-native';
import VisaImage from '@/theme/assets/images/visa.png';
import { isImageSourcePropType } from '@/types/guards/image';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { useMemo } from 'react';
import { getCardLastFourDigits } from '@/utils/card.util';

type Props = {
	cardNumber: string;
	nameOnCard: string;
	expireDate: string;
};

const styles = StyleSheet.create({
	visaImage: {
		width: 66,
		height: 22,
	},
	cardNumber: {
		letterSpacing: 1.2,
		lineHeight: 32,
	},
	cardNumberMask: {
		letterSpacing: 1.6,
	},
});

function CardItem({ cardNumber, nameOnCard, expireDate }: Readonly<Props>) {
	const { t } = useTranslation(['card']);
	const { borders, gutters, shadow, backgrounds, layout, fonts } = useTheme();

	if (!isImageSourcePropType(VisaImage)) {
		throw new Error('Image source is not valid');
	}

	const lastFourDigits = useMemo(() => {
		return getCardLastFourDigits(cardNumber);
	}, [cardNumber]);

	return (
		<View
			style={[
				shadow.card,
				backgrounds.white,
				borders.rounded_12,
				gutters.marginHorizontal_24,
				gutters.paddingLeft_32,
				gutters.paddingRight_70,
				gutters.marginVertical_12,
				gutters.paddingTop_32,
				gutters.paddingBottom_24,
			]}
		>
			<View>
				<ImageVariant source={VisaImage} style={styles.visaImage} />
			</View>
			<View style={[gutters.marginTop_12, layout.row, layout.justifyBetween]}>
				<Text style={[fonts.gray400, fonts.size_24, styles.cardNumberMask]}>
					••••
				</Text>
				<Text style={[fonts.gray400, fonts.size_24, styles.cardNumberMask]}>
					••••
				</Text>
				<Text style={[fonts.gray400, fonts.size_24, styles.cardNumberMask]}>
					••••
				</Text>
				<Text style={[fonts.gray400, fonts.size_18, styles.cardNumber]}>
					{lastFourDigits}
				</Text>
			</View>
			<View style={[gutters.marginTop_12, layout.row, layout.justifyBetween]}>
				<View>
					<Text
						style={[
							fonts.gray200,
							gutters.marginBottom_12,
							fonts.size_10,
							fonts.medium,
							layout.blur,
						]}
					>
						{t('card:nameOnCard')}
					</Text>
					<Text style={[fonts.medium]}>{nameOnCard}</Text>
				</View>
				<View style={[layout.itemsEnd]}>
					<Text
						style={[
							fonts.gray200,
							gutters.marginBottom_12,
							fonts.size_10,
							fonts.medium,
							layout.blur,
						]}
					>
						{t('card:expires')}
					</Text>
					<Text style={[fonts.medium]}>{expireDate}</Text>
				</View>
			</View>
		</View>
	);
}

export default CardItem;
