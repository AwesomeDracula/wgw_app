import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';

type HeaderButton = {
	child: JSX.Element;
	onPress?: () => void;
};

type Props = {
	leftButton?: HeaderButton;
	rightButton?: HeaderButton;
	title?: string;
};

function Header({ leftButton, rightButton, title }: Props) {
	const { layout, gutters, backgrounds, fonts } = useTheme();

	return (
		<View
			style={[
				layout.row,
				layout.itemsCenter,
				layout.justifyBetween,
				gutters.paddingVertical_16,
				gutters.paddingHorizontal_16,
				backgrounds.white,
			]}
		>
			<View style={[layout.flex_1, layout.itemsStart]}>
				{leftButton && (
					<TouchableOpacity onPress={leftButton.onPress}>
						{leftButton.child}
					</TouchableOpacity>
				)}
			</View>
			<View style={[layout.flex_1, layout.itemsCenter]}>
				<Text style={[fonts.bold, fonts.size_18]}>{title}</Text>
			</View>
			<View style={[layout.flex_1, layout.itemsEnd]}>
				{rightButton && (
					<TouchableOpacity onPress={rightButton.onPress}>
						{rightButton.child}
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

Header.defaultProps = {
	leftButton: undefined,
	rightButton: undefined,
	title: '',
};

export default Header;
