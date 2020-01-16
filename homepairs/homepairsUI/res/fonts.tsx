import * as Font from 'expo-font';

/** 
 * NOTICE: We are required to call the loadAsync multiple times. This is due to a bug in how non-Chrome 
 * web browsers appear to call this async function. If more than one asset is loaded, the function 
 * never does completed. Therefore, this is a hack-around for the problem. 
 * 
 * I may report this issue to expo.
*/
export const LoadFonts = async () => {
	await Font.loadAsync({
		'nunito-black': require('./assets/fonts/Nunito-Black.ttf')
	});
	await Font.loadAsync({
		'nunito-blackitalic': require('./assets/fonts/Nunito-BlackItalic.ttf')
	});
	await Font.loadAsync({
		'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf')
	});
	await Font.loadAsync({
		'nunito-bolditalic': require('./assets/fonts/Nunito-BoldItalic.ttf')
	});
	await Font.loadAsync({
		'nunito-extrabold': require('./assets/fonts/Nunito-ExtraBold.ttf')
	});
	await Font.loadAsync({
		'nunito-extrabolditalic': require('./assets/fonts/Nunito-ExtraBoldItalic.ttf')
	});
	await Font.loadAsync({
		'nunito-extralight': require('./assets/fonts/Nunito-ExtraLight.ttf')
	});
	await Font.loadAsync({
		'nunito-extralightitalic': require('./assets/fonts/Nunito-ExtraLightItalic.ttf')
	});
	await Font.loadAsync({
		'nunito-italic': require('./assets/fonts/Nunito-Italic.ttf')
	});
	await Font.loadAsync({
		'nunito-light': require('./assets/fonts/Nunito-Light.ttf')
	});
	await Font.loadAsync({
		'nunito-lightitalic': require('./assets/fonts/Nunito-LightItalic.ttf')
	});
	await Font.loadAsync({
		'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf')
	});
	await Font.loadAsync({
		'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf')
	});

	/*Font.loadAsync({
		//Load desired fonts into /res/assets/fonts and then run the script via: npm run fonts 
		'nunito-black': require('./assets/fonts/Nunito-Black.ttf'),
		'nunito-blackitalic': require('./assets/fonts/Nunito-BlackItalic.ttf'),
		'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
		'nunito-bolditalic': require('./assets/fonts/Nunito-BoldItalic.ttf'),
		'nunito-extrabold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
		'nunito-extrabolditalic': require('./assets/fonts/Nunito-ExtraBoldItalic.ttf'),
		'nunito-extralight': require('./assets/fonts/Nunito-ExtraLight.ttf'),
		'nunito-extralightitalic': require('./assets/fonts/Nunito-ExtraLightItalic.ttf'),
		'nunito-italic': require('./assets/fonts/Nunito-Italic.ttf'),
		'nunito-light': require('./assets/fonts/Nunito-Light.ttf'),
		'nunito-lightitalic': require('./assets/fonts/Nunito-LightItalic.ttf'),
		'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
		'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf'),
		'nunito-semibolditalic': require('./assets/fonts/Nunito-SemiBoldItalic.ttf')
	});*/
}

export const HomePairFonts = {
	nunito_black: 'nunito-black',
	nunito_blackitalic: 'nunito-blackitalic',
	nunito_bold: 'nunito-bold',
	nunito_bolditalic: 'nunito-bolditalic',
	nunito_extrabold: 'nunito-extrabold',
	nunito_extrabolditalic: 'nunito-extrabolditalic',
	nunito_extralight: 'nunito-extralight',
	nunito_extralightitalic: 'nunito-extralightitalic',
	nunito_italic: 'nunito-italic',
	nunito_light: 'nunito-light',
	nunito_lightitalic: 'nunito-lightitalic',
	nunito_regular: 'nunito-regular',
	nunito_semibold: 'nunito-semibold',
	nunito_semibolditalic: 'nunito-semibolditalic'
}
