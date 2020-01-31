const strings = {
    title: 'HomePairs',
    serviceRequestPage: {
        title: 'Service Request',
        button: 'New Request',
    },
    connectAccountPage: {
        title: 'Account Settings',
        tokenFailed: 'failure',
        accountConnected: {
            accountConnectedCard: {
                title: 'Account Connected',
                subtitle:
                    'Your roopairs account is ready for on-demand service',
                button: 'Disconnect Account',
            },
        },
        accountNotConnected: {
            connectAccountCard: {
                title: 'Connect Roopairs Account',
                subtitle: 'Connect your roopairs account for on-demand service',
                button: 'Connect Account',
            },
        },
    },
    propertiesPage: {
        title: 'Properties',
        button: 'Add Property',
        viewPropertyCardButton: 'View Property',
    },
    detailedPropertyPage: {
        navigationParams: {
            propertyIndex: 'propertyIndex',
        },
        generalHomeInfo: {
            button: 'Edit Property',
            tenants: 'Max Tenants',
            bedrooms: 'Bedrooms',
            bathrooms: 'Bathrooms',
        },
    },
    signInPage: {
        subtitle: 'Sign in to your Account',
        inputForms: {
            email: 'EMAIL',
            password: 'PASSWORD',
        },
        button: 'Sign In',
        signUpHighlight: 'Sign Up',
        newUserText: 'New to HomePairs? ',
        modal: 'Logging In...',
    },
    signUpPage: {
        subtitle: 'Create your account',
        accountTypeRadioButton: {
            name: 'ACCOUNT TYPE',
            tenant: 'Tenant',
            landlord: 'Property Manager',
        },
        inputForms: {
            firstName: 'FIRST NAME',
            lastName: 'LAST NAME',
            email: 'EMAIL',
            phone: 'PHONE',
            password: 'PASSWORD',
            confirmPassword: 'CONFIRM PASSWORD',
            address: 'ADDRESS',
            city: 'CITY',
            state: 'STATE',
            companyName: 'COMPANY NAME',
            maxTenants: 'MAX NUMBER OF TENANTS',
            numBed: 'NUMBER OF BEDS',
            numBath: 'NUMBER OF BATHS',
        },
        button: 'Sign Up',
        currentUserText: 'Already have an account? ',
        signUpHighlight: 'Sign In',
        modal: 'Signing Up...',
    },
    logOut: 'Log Out',
};

export default strings;
