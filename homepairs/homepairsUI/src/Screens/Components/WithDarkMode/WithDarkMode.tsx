import { connect } from "react-redux";
import React from 'react';
import { AppState } from 'homepair-types';
import { LightColorTheme, DarkColorTheme, ColorTheme} from 'homepair-base-styles';


type DarkModeProps = {
    isDarkMode: boolean,
}

export type DarkModeInjectedProps = {
    primaryColorTheme?: ColorTheme,
}

export function withDarkMode(WrappedComponent: any) {
    const ReduxComponent = class DarkMode extends React.Component<DarkModeProps>{ 
        injectedProps: DarkModeInjectedProps

        constructor(props: Readonly<DarkModeProps>){
            super(props);
            this.injectedProps = {
                primaryColorTheme: props.isDarkMode ? DarkColorTheme: LightColorTheme,
            };
        }

        render(){
            const {primaryColorTheme} = this.injectedProps;
            return(<WrappedComponent primaryColorTheme={primaryColorTheme}/>);
        }  
    };

    function mapStateToProps(state: AppState) : DarkModeProps {
        return { isDarkMode: state.settings.isDarkModeActive};
    }

    return connect(mapStateToProps)(ReduxComponent);
}