import { DarkTheme } from '@react-navigation/native';

import type { ThemeConfiguration } from '@/types/theme/config';

const colorsLight = {
	red500: '#C13333',
	gray800: '#303030',
	gray400: '#808080',
	gray200: '#8F8F8F',
	gray100: '#DFDFDF',
	gray50: '#E6E3E6',
	white: '#FFFFFF',
	black: '#000000',
	purple500: '#44427D',
	purple100: '#E1E1EF',
	secondary: '#4AD8DA',
} as const;

const colorsDark = {
	gray800: '#E0E0E0',
	gray400: '#969696',
	gray200: '#BABABA',
	gray100: '#000000',
	purple500: '#A6A4F0',
	purple100: '#252732',
	purple50: '#1B1A23',
} as const;

const sizes = [5, 8, 10, 12, 16, 18, 24, 32, 40, 70, 80] as const;

export const config = {
	fonts: {
		sizes,
		colors: colorsLight,
	},
	gutters: sizes,
	backgrounds: colorsLight,
	borders: {
		widths: [1, 2],
		radius: [4, 12, 16, 22],
		colors: colorsLight,
	},
	navigationColors: {
		...DarkTheme.colors,
		background: colorsLight.white,
		card: colorsLight.white,
	},
	variants: {
		dark: {
			fonts: {
				colors: colorsDark,
			},
			backgrounds: colorsDark,
			navigationColors: {
				...DarkTheme.colors,
				background: colorsDark.purple50,
				card: colorsDark.purple50,
			},
		},
	},
} as const satisfies ThemeConfiguration;
