import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
	onAddNewCardPress: () => void;
};

function CardListEmpty({ onAddNewCardPress }: Props) {
	const { t } = useTranslation(['card']);
	const { layout, fonts, gutters } = useTheme();
	return (
		<View
			style={[
				layout.flex_1,
				layout.relative,
				layout.fullWidth,
				layout.justifyCenter,
				layout.itemsCenter,
				gutters.paddingHorizontal_70,
			]}
		>
			<Text style={[fonts.size_40, gutters.marginBottom_16]}>💳</Text>
			<Text style={[fonts.size_18, gutters.marginBottom_16]}>
				{t('card:emptyCardTitle')}
			</Text>
			<Text style={[fonts.size_18, fonts.alignCenter, gutters.marginBottom_16]}>
				{t('card:emptyCardDescription')}
			</Text>
			<TouchableOpacity onPress={onAddNewCardPress}>
				<Text style={[fonts.size_18, fonts.alignCenter, fonts.secondary]}>
					{t('card:addNewCard')}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default CardListEmpty;
