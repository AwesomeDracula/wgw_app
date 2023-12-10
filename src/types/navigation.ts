import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Example: undefined;
	CardList: undefined;
	AddNewCard: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
