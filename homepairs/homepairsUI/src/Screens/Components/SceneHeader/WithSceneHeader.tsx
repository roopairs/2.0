import React from 'react';
import { MainAppStackType,  HomePairsDimensions  } from 'homepair-types';
import { Platform, View, TouchableWithoutFeedback, ScrollView, ScrollViewProps, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { SceneHeaderProps, SceneHeader} from 'homepair-components';
import { HeaderActions } from 'homepair-redux-actions';
import { connect } from 'react-redux';
import { withNavigation} from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';
import HomePairColors from 'homepair-colors';
import * as BaseStyles from 'homepair-base-styles';


type SceneDispatchProps = {
    onSetHeaderGoBackButton?: (isSet:boolean) => any 
    onCloseHeaderMenu?: () => any
}
export type SceneInjectedProps = NavigationStackScreenProps<any,any> & SceneDispatchProps & DarkModeInjectedProps

export default function withSceneHeader(WrappedComponent : any, Page: MainAppStackType){
    var styles: any
    const ReduxComponent = withNavigation(class ReduxComponentBase extends React.Component<SceneInjectedProps> {
        colorScheme : any 
        constructor(props: Readonly<SceneInjectedProps>) {
          super(props);
          this.colorScheme = (props.primaryColorTheme == null) ? HomePairColors.LightModeColors : props.primaryColorTheme
          styles = setStyle(this.colorScheme)
          this.renderContents = this.renderContents.bind(this);
        }
        
        scrollViewProps() : ScrollViewProps {
            return{
                //style: styles.scrollViewStyle, 
                contentContainerStyle: styles.scrollViewContentContainer,
                directionalLockEnabled: true,
                automaticallyAdjustContentInsets: false,
            }
        }
        
        sceneHeaderProps() : SceneHeaderProps & DarkModeInjectedProps {
            return{
                title: Page.title,
                buttonTitle: Page.button,
                onButtonPress: Page.buttonAction,
                primaryColorTheme: this.props.primaryColorTheme,
                allColors: this.props.allColors,
            }
        }
        
        renderTouchArea(){
            return(
                (!(Platform.OS === 'web')) ?
                  (
                    <TouchableWithoutFeedback onPressIn={this.props.onCloseHeaderMenu}>
                        {this.renderContents()}
                    </TouchableWithoutFeedback>
                )
                : this.renderContents() 
              )
        }

        renderContents() {
            return(
                    <ScrollView {...this.scrollViewProps()}>
                        <SceneHeader {...this.sceneHeaderProps()}/>
                        <WrappedComponent
                        {...this.props}/>
                    </ScrollView>
            )
        }
        
        render(){
            return(
              (Platform.OS === 'android') ?
                (
                    <View style={styles.container}>
                          <View style={ styles.pallet}>
                            {this.renderTouchArea()}
                          </View>
                      </View>
                )
              :(
                    <View style={styles.container}>
                        <SafeAreaView style={styles.pallet}>
                          {this.renderTouchArea()}
                        </SafeAreaView>
                      </View>
                )
            )
        }
    })

    function mapDispatchToProps(dispatch: any) : SceneDispatchProps {
        return { 
          onSetHeaderGoBackButton: (isSet:boolean) => {
            dispatch(HeaderActions.showGoBackButton(isSet));
            dispatch(HeaderActions.toggleMenu(false))
          },
          onCloseHeaderMenu: () => {
            dispatch(HeaderActions.toggleMenu(false))
          },
        }
    };
      
    return connect(
        null,
        mapDispatchToProps
    )(ReduxComponent);
}

function setStyle(colorTheme: BaseStyles.ColorTheme){
    return(
        StyleSheet.create({
            container : {
                alignItems: 'center',
                backgroundColor: colorTheme.primary, 
                width: BaseStyles.ContentWidth.max,
                //flex: 1,
            },
            pallet:{
                //flex: 1,
                backgroundColor: colorTheme.secondary,
                width: BaseStyles.ContentWidth.max,
                //height: '100%',
                //minHeight: HomePairsDimensions.MIN_PALLET_HEIGHT,
                maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
                alignSelf: 'center',
            },
            scrollViewStyle: {
                flex: 1,
            
                //flexGrow: 1,
                //marginBottom: BaseStyles.MarginPadding.largeConst,
            },
            scrollViewContentContainer: {
                maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
                backgroundColor: colorTheme.secondary,
                alignSelf: 'center',
                width: BaseStyles.ContentWidth.max,
                //height: 1000,
                flexGrow: 1,
            },
    }))
}