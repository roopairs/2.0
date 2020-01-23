import React from "react";
import { MainAppStackType, HomePairsDimensions } from "homepair-types";
import {
  Platform,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  ScrollViewProps,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { SceneHeaderProps, default as SceneHeader }  from './SceneHeader';
import { HeaderActions } from "homepair-redux-actions";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { DarkModeInjectedProps } from "../WithDarkMode/WithDarkMode";
import * as BaseStyles from "homepair-base-styles";
import { ModalInjectedProps } from '../Modals/WithModal/WithModal';

type SceneDispatchProps = {
  onSetHeaderGoBackButton?: (isSet: boolean) => any;
  onCloseHeaderMenu?: () => any;
};
export type SceneInjectedProps = NavigationStackScreenProps<any, any> &
  SceneDispatchProps &
  DarkModeInjectedProps & ModalInjectedProps;
type State = {
  showModal: boolean;
};
export function withSceneHeader(WrappedComponent: any, Page: MainAppStackType) {
  var styles: any;
  const ReduxComponent = withNavigation(
    class ReduxComponentBase extends React.Component<
      SceneInjectedProps,
      State
    > {
      colorScheme: any;
      constructor(props: Readonly<SceneInjectedProps>) {
        super(props);
        this.colorScheme =
          typeof props.primaryColorTheme == 'undefined'
            ? BaseStyles.LightColorTheme
            : props.primaryColorTheme;
        styles = setStyle(this.colorScheme);
        this.renderContents = this.renderContents.bind(this);
        this.onPressButton = this.onPressButton.bind(this);
        console.log('withSceneHeader constructor')
        console.log(props._onChangeModalVisibility)
      }

      onPressButton() {
          console.log('withSceneHeader onPressButton')
          console.log(this.props._onChangeModalVisibility)
          return Page.doesButtonUseNavigate ? Page._onButtonClick(this.props) : this.props._onChangeModalVisibility(true)
      }

      scrollViewProps(): ScrollViewProps {
        return {
          contentContainerStyle: styles.scrollViewContentContainer,
          directionalLockEnabled: true,
          automaticallyAdjustContentInsets: false
        };
      }

      sceneHeaderProps(): SceneHeaderProps & DarkModeInjectedProps {
        return {
          title: Page.title,
          buttonTitle: Page.button,
          onButtonPress: this.onPressButton,
          primaryColorTheme: this.props.primaryColorTheme,
          allColors: this.props.allColors
        };
      }

      renderTouchArea() {
        return !(Platform.OS === "web") ? (
          <TouchableWithoutFeedback
            onPressIn={this.props.onCloseHeaderMenu}
            style={{ flex: 1 }}
          >
            {this.renderContents()}
          </TouchableWithoutFeedback>
        ) : (
          <View style={{ flex: 1 }}>{this.renderContents()}</View>
        );
      }

      renderContents() {
        return (
          <>
            <SceneHeader {...this.sceneHeaderProps()} />
            <ScrollView {...this.scrollViewProps()}>
              <WrappedComponent {...this.props} />
            </ScrollView>
          </>
        );
      }

      render() {
        return Platform.OS === "android" ? (
          <View style={styles.container}>
            <View style={styles.pallet}>{this.renderTouchArea()}</View>
          </View>
        ) : (
          <View style={styles.container}>
            <SafeAreaView style={styles.pallet}>
              {this.renderTouchArea()}
            </SafeAreaView>
          </View>
        );
      }
    }
  );

  function mapDispatchToProps(dispatch: any): SceneDispatchProps {
    return {
      onSetHeaderGoBackButton: (isSet: boolean) => {
        dispatch(HeaderActions.showGoBackButton(isSet));
        dispatch(HeaderActions.toggleMenu(false));
      },
      onCloseHeaderMenu: () => {
        dispatch(HeaderActions.toggleMenu(false));
      }
    };
  }

  return connect(null, mapDispatchToProps)(ReduxComponent);
}

function setStyle(colorTheme: BaseStyles.ColorTheme) {
  return StyleSheet.create({
    container: {
      alignItems: "center",
      alignSelf: "center",
      width: '100%',
      backgroundColor: colorTheme.primary,
      flex: 1
    },
    pallet: {
      backgroundColor: colorTheme.secondary,
      width: '100%',
      maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
      minWidth: HomePairsDimensions.MIN_PALLET,
      alignSelf: "center",
      flex: 1
    },
    scrollViewStyle: {},
    scrollViewContentContainer: {
      maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
      backgroundColor: colorTheme.secondary,
      alignSelf: "center",
      width: BaseStyles.ContentWidth.max,
      flexGrow: 1
    }
  });
}
