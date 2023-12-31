import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from 'react-native';

import { useTheme } from '@/theme';
import { FieldError } from 'react-hook-form';

type Props = TextInputProps & {
	title: string;
	suffix?: JSX.Element;
	error?: FieldError;
};

const styles = StyleSheet.create({
	inputContainer: {
		borderWidth: 1.5,
	},
	title: {
		letterSpacing: 0.3,
	},
	text: {
		// letterSpacing: 0.8,
	},
});

function InputVariant({ title, suffix, error, ...props }: Props) {
	const { layout, borders, gutters, fonts } = useTheme();
	return (
		<View>
			<Text
				style={[
					fonts.size_16,
					fonts.medium,
					gutters.marginBottom_8,
					styles.title,
				]}
			>
				{title}
			</Text>
			<View
				style={[
					layout.row,
					gutters.paddingHorizontal_16,
					gutters.paddingVertical_16,
					borders.gray50,
					borders.rounded_4,
					styles.inputContainer,
					layout.justifyBetween,
					layout.itemsCenter,
				]}
			>
				<TextInput
					style={[layout.flex_1, fonts.size_16, styles.text, fonts.medium]}
					{...props}
				/>
				{suffix && suffix}
			</View>
			{error && <Text style={[fonts.red500]}>{error.message}</Text>}
		</View>
	);
}

InputVariant.defaultProps = {
	suffix: undefined,
	error: undefined,
};

export default InputVariant;
