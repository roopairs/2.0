import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import { HomePairFonts } from 'homepairs-fonts';
import strings from 'homepairs-strings';
import { fetchServiceRequests } from 'homepairs-endpoints';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, ServiceRequestStatusEnums } from 'homepairs-types';
import { isNullOrUndefined } from 'homepairs-utilities';
import { ThinButton } from 'homepairs-elements';

export type ServiceRequestCountProps = {
    /**
     * The individual property that gives this card the information to present 
     */
    propId: string;

    /**
     * This allows the property to render the edit button. Should be set true for 
     * Property Mangers and false for Tenants 
     */
    hasEdit?: boolean;

    /**
     * Callback function that should invoke something for the parent. This should 
     * navigate the user to an Edit Property modal
     */
    onClick?: () => any;
};

type ServiceRequestCountState = {
    pending: number;
    scheduled: number;
    inProgress: number;
};

const intialState: ServiceRequestCountState = {
    pending: 0,
    scheduled: 0,
    inProgress: 0,
};

const serviceRequestStrings = strings.detailedPropertyPage.serviceRequestCount;
const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        marginHorizontal: BaseStyles.MarginPadding.large,
        marginTop: BaseStyles.MarginPadding.largeConst,
        marginBottom: BaseStyles.MarginPadding.large,
        borderRadius: BaseStyles.BorderRadius.large,
        borderBottomColor: colors.veryLightGray,
        borderBottomWidth: 1,
        padding: BaseStyles.MarginPadding.large,
        width: BaseStyles.ContentWidth.thin,
        alignSelf: 'center',
        shadowColor: colors.shadow,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        elevation: 9,
    },
    livingSpaceContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: BaseStyles.ContentWidth.wide,
        paddingVertical: BaseStyles.MarginPadding.mediumConst,
    },
    titleContainer: {
        borderBottomColor: colors.veryLightGray,
        borderBottomWidth: 1,
        paddingBottom: BaseStyles.MarginPadding.mediumConst,
        marginBottom: BaseStyles.MarginPadding.mediumConst,
    },
    buttonContainer: {
        marginTop: BaseStyles.MarginPadding.mediumConst,
    },
    title: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.reg,
        fontFamily: HomePairFonts.nunito_bold,
    },
    cityStateText: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.xsmal,
    },
    cardTitle: {
        fontSize: BaseStyles.FontTheme.reg + 2,
        maxWidth: 450,
        fontFamily: BaseStyles.FontTheme.secondary,
    },
    cardDescription: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.small,
    },
    textContainer: {
        width: BaseStyles.ContentWidth.reg,
        borderBottomColor: colors.veryLightGray,
        paddingBottom: BaseStyles.MarginPadding.mediumConst,
        borderBottomWidth: 1,
    },
    detailContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    detailName: {
        fontSize: BaseStyles.FontTheme.xsmal,
        marginBottom: BaseStyles.MarginPadding.mediumConst,
        color: colors.tertiary,
    },
    detail: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.reg + 2,
        fontFamily: HomePairFonts.nunito_bold,
    },
    editButton: {
        alignItems: 'center',
        backgroundColor: colors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: HomePairsDimensions.MIN_BUTTON_WIDTH,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.lightGray,
    },
    editButtonText: {
        color: colors.lightGray,
        fontSize: 20,
    },
});


/**
 * ---------------------------------------------------
 * Render Details
 * ---------------------------------------------------
 * A small component that presents the amount of service requests for a 
 * particular type of services associated with the property
 * @param {string} arg0 -The class of the service requests
 * @param {number} arg1 -The amount of service requests for the class
 */
function renderDetailBox(arg0: string, arg1: number) {
    return (
        <View style={styles.detailContainer}>
            <Text style={styles.detailName}>{arg0}</Text>
            <Text style={styles.detail}>{arg1}</Text>
        </View>
    );
}

/**
 * ---------------------------------------------------
 * Service Request Count Info 
 * ---------------------------------------------------
 * A child component for the Detailed Property Card that presents details about 
 * the current service requests. It presents pending, scheduled, and in progress.  
 * @param {ServiceRequestCountProps} props 
 */
export default class ServiceRequestCount extends React.Component<ServiceRequestCountProps, ServiceRequestCountState> {


    constructor(props: Readonly<ServiceRequestCountProps>){
        super(props);
        this.state = intialState;
    }

    async componentDidMount(){
        await this.prepareServiceRequests();
    }

    /**
     * Fetches the service requests from the backend and then uses the response 
     * to count the amount of requests per qualifying category. 
     */
    async prepareServiceRequests(){
        const {propId} = this.props;

        await fetchServiceRequests(propId).then(response =>{
            const {data} = response;
            const {reqs} = data;
            let pending: number = 0;
            let scheduled: number = 0;
            let inProgress: number = 0;

            reqs.forEach(req => {
                const {status} = req;
                switch(ServiceRequestStatusEnums[status]){
                    case ServiceRequestStatusEnums.Scheduled:
                        scheduled += 1;
                        break;
                    case ServiceRequestStatusEnums.InProgress:
                        inProgress += 1;
                        break;
                    case ServiceRequestStatusEnums.Pending:
                        pending += 1;
                        break;
                    default:
                        break;
                }

            });

            this.setState({pending, scheduled, inProgress});  
        }).catch(error => {
            console.log(error);
        });
    }

    renderLivingSpace() {
        const {pending, scheduled, inProgress} = this.state;
        return (
            <View style={styles.livingSpaceContainer}>
                {renderDetailBox(serviceRequestStrings.pending, pending)}
                {renderDetailBox(serviceRequestStrings.scheduled, scheduled)}
                {renderDetailBox(serviceRequestStrings.inProgress, inProgress)}
            </View>
        );
    }

    render(){
        const {hasEdit, onClick } = this.props;
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{serviceRequestStrings.title}</Text>
                    </View>
                        {this.renderLivingSpace()}
                    <View style={styles.buttonContainer}>
                        {isNullOrUndefined(hasEdit) || hasEdit ? (
                            <ThinButton
                                name={serviceRequestStrings.button}
                                buttonStyle={styles.editButton}
                                buttonTextStyle={styles.editButtonText}
                                onClick={onClick} />
                        ) : (
                                <></>
                            )}
                    </View>
                </View>
            </View>
        );
    };
};

ServiceRequestCount.defaultProps = {
    hasEdit: true,
    onClick: () => { },
};