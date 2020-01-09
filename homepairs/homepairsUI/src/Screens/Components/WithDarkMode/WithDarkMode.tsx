import { connect } from "react-redux";
import React from 'react';
import { AppState } from 'homepair-types';
import colors from 'homepair-colors';
import { LightColorTheme, DarkColorTheme, ColorTheme} from 'homepair-base-styles';


type DarkModeProps = {
    isDarkMode: boolean,
}

export type DarkModeInjectedProps = {
    primaryColorTheme?: ColorTheme,
    allColors?: any,
}

export default function withDarkMode(WrappedComponent: any) {
    const ReduxComponent = class DarkMode extends React.Component<DarkModeProps>{ 
        injectedProps: DarkModeInjectedProps
        constructor(props: Readonly<DarkModeProps>){
            super(props)
            this.injectedProps = {
                primaryColorTheme: this.props.isDarkMode ? DarkColorTheme: LightColorTheme,
                allColors: this.props.isDarkMode ? colors.DarkModeColors : colors.LightModeColors,
            }
        }
        render(){
            return(<WrappedComponent {...this.injectedProps}/>)
        }  
    }

    function mapStateToProps(state: AppState) : DarkModeProps {
        return { isDarkMode: state.settings.isDarkModeActive}
    }

    return connect(mapStateToProps)(ReduxComponent);
}