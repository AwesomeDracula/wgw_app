import { ViewStyle } from 'react-native';

export default {
	/* Card */
	card: {
		shadowOffset: { width: 0, height: 5 },
		shadowColor: '#000000',
		shadowOpacity: 0.1,
		shadowRadius: 20,
		elevation: 4,
	},
} as const satisfies Record<string, ViewStyle>;
