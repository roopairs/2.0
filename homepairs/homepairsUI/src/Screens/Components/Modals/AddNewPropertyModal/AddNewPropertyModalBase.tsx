import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import HomePairColors from 'homepairs-colors';
import {
    InputForm,
    InputFormProps,
    ThinButton,
    ThinButtonProps,
} from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import Colors from 'homepairs-colors';
import {
    AuthPageInjectedProps,
    DarkModeInjectedProps,
} from 'homepairs-components';
import { ModalInjectedProps } from '../WithModal/WithModal';
import Card from 'homepairs-elements';

export type AddNewPropertyDispatchProps = {
    onCreateProperty: (
        newProperty: Property,
        email: string,
        setInitialState: () => void,
        onChangeModalVisibility: (check: boolean) => void,
    ) => void;
};

export type NewPropertyState = {
    email: string;
};

type Props = ModalInjectedProps &
    DarkModeInjectedProps &
    AddNewPropertyDispatchProps &
    NewPropertyState;

type CreateState = {
    streetAddress: string;
    city: string;
    state: string;
    numBed: number;
    numBath: number;
    maxTenants: number;
    pm: string;
};

const signUpStrings = strings.signUpPage;

const initialState: CreateState = {
    streetAddress: '',
    city: '',
    state: '',
    numBed: 0,
    numBath: 0,
    maxTenants: 0,
    pm: '',
};

function setInputStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = colorTheme == null ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        formTitle: {
            marginVertical: '3.5%',
            fontFamily: BaseStyles.FontTheme.primary,
            color: colors.lightGray,
        },
        input: {
            alignItems: 'center',
            alignSelf: 'center',
            margin: BaseStyles.MarginPadding.xsmallConst,
            minWidth: 40,
            width: BaseStyles.ContentWidth.max,
            height: 40,
            color: colors.lightGray,
            borderColor: colors.lightGray,
            borderWidth: 1,
            borderRadius: BaseStyles.BorderRadius.small,
            paddingHorizontal: BaseStyles.MarginPadding.mediumConst,
        },
        modalContainer: {
            maxWidth: 500,
            width: '100%',
            maxHeight: 1000,
            alignSelf: 'center',
        },
    });
}

export default class AddNewPropertyModalBase extends React.Component<
    Props,
    CreateState
> {
    private inputFormStyle;

    constructor(props: Readonly<Props>) {
        super(props);
        this.inputFormStyle = setInputStyles(props.primaryColorTheme);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormCity = this.getFormCity.bind(this);
        this.getFormState = this.getFormState.bind(this);
        this.getFormNumBed = this.getFormNumBed.bind(this);
        this.getFormNumBath = this.getFormNumBath.bind(this);
        this.getFormMaxTenants = this.getFormMaxTenants.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.state = initialState;
    }

    getFormAddress(childData: string) {
        this.setState({ streetAddress: childData });
    }

    getFormCity(childData: string) {
        this.setState({ city: childData });
    }

    getFormState(childData: string) {
        this.setState({ state: childData });
    }

    getFormNumBed(childData: string) {
        const num = Number(childData);
        if (isNaN(num)) {
            this.setState({ numBed: num });
        } else {
            // alert
        }
    }

    getFormNumBath(childData: string) {
        const num = Number(childData);
        if (isNaN(num)) {
            this.setState({ numBath: num });
        } else {
            // alert
        }
    }

    getFormMaxTenants(childData: string) {
        const num = Number(childData);
        if (isNaN(num)) {
            this.setState({ maxTenants: num });
        } else {
            // alert
        }
    }

    setInitialState() {
        this.setState(initialState);
    }

    clickSubmitButton() {
        // put error messages inside InputForm component
        const newProperty: Property = {
            address: this.state.streetAddress,
            city: this.state.city,
            state: this.state.state,
            tenants: this.state.maxTenants,
            bedrooms: this.state.numBed,
            bathrooms: this.state.numBath,
        };
        this.props.onCreateProperty(
            newProperty,
            this.props.email,
            this.setInitialState,
            this.props.onChangeModalVisibility,
        );
    }

    submitButton: ThinButtonProps = {
        name: 'Submit',
        onClick: () => {
            this.clickSubmitButton();
        },
        buttonStyle: {
            alignItems: 'center',
            backgroundColor: Colors.LightModeColors.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
            minWidth: HomePairsDimensions.MIN_BUTTON_WIDTH,
            borderRadius: BaseStyles.BorderRadius.large,
            borderWidth: 1,
            borderColor: Colors.LightModeColors.blueButton,
        },
        buttonTextStyle: {
            color: Colors.LightModeColors.blueButtonText,
            fontSize: BaseStyles.FontTheme.lg,
            alignSelf: 'center',
        },
        containerStyle: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            minHeight: 50,
        },
    };

    inputFormProps(): { [id: string]: InputFormProps } {
        return {
            streetAddress: {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            city: {
                name: signUpStrings.inputForms.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            state: {
                name: signUpStrings.inputForms.state,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            numBed: {
                name: signUpStrings.inputForms.numBed,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            numBath: {
                name: signUpStrings.inputForms.numBath,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            maxTenants: {
                name: signUpStrings.inputForms.maxTenants,
                parentCallBack: this.getFormMaxTenants,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
        };
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={this.inputFormStyle.modalContainer}>
                    <Card
                        showCloseButton={true}
                        title="Create New Property"
                        closeButtonPressedCallBack={() =>
                            this.props.onChangeModalVisibility(false)
                        }
                    >
                        <InputForm {...this.inputFormProps().streetAddress} />
                        <InputForm {...this.inputFormProps().city} />
                        <InputForm {...this.inputFormProps().state} />
                        <InputForm {...this.inputFormProps().maxTenants} />
                        <InputForm {...this.inputFormProps().numBed} />
                        <InputForm {...this.inputFormProps().numBath} />
                        <ThinButton {...this.submitButton} />
                    </Card>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
