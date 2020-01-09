
export const selectColorMode = (isDarkModeActive:boolean = false, baseStyles: any,
     getStyleSheetColored: (getDarkMode:boolean, baseStyles:any) => any) => {
        return getStyleSheetColored(isDarkModeActive, baseStyles)
}