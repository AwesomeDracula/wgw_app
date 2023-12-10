import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
	title: string;
	onPress: () => unknown;
	isPrimary?: boolean;
	disabled?: boolean;
};

function Button({ title, onPress, isPrimary, disabled }: Readonly<Props>) {
	const { backgrounds, borders, gutters, fonts } = useTheme();
	return (
		<TouchableOpacity
			style={[
				!isPrimary && backgrounds.secondary,
				borders.rounded_22,
				gutters.paddingVertical_12,
				layout.itemsCenter,
				disabled && backgrounds.gray100,
			]}
			onPress={onPress}
		>
			<Text style={[fonts.white, fonts.size_16, fonts.bold]}>{title}</Text>
		</TouchableOpacity>
	);
}

Button.defaultProps = {
	isPrimary: false,
	disabled: false,
};

export default Button;
