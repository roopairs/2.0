import { AccountActions, PROPERTY_LIST_ACTION_TYPES } from 'homepairs-redux-actions';
import { AccountTypes, AccountStateAction, Account, Property, FetchPropertiesAction} from 'homepairs-types';
import { NavigationSwitchProp } from 'react-navigation';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { navigationPages } from 'src/routes';
import { HOMEPAIRS_REGISTER_PM_ENDPOINT, generateAccountForPM } from 'homepairs-endpoints';
import { SetAccountAuthenticationStateAction } from 'homepairs-types';
import { propertyManagerMock1, prepareNavigationSwitchMock  } from 'homepairs-test';

const TYPE = 'ACCOUNT/FETCH_PROFILE';
const URL = HOMEPAIRS_REGISTER_PM_ENDPOINT;
const [mockSwitchNavigation, navigationSwitchSpyFunction ] = prepareNavigationSwitchMock();
const navSpyFunction = navigationSwitchSpyFunction;
const AccountPropertiesPageKey = navigationPages.PropertiesScreen;
const {FETCH_PROPERTIES} = PROPERTY_LIST_ACTION_TYPES;

const testPMAccount1: Account = {
    accountType: AccountTypes.Landlord,
    firstName: 'Jacky',
    lastName: 'Lynne',
    email: 'jackyLynne@gmail.com',
    address: 'ABC Street',
    token: '',
};

const testJsonValue1 = {
    role: 'pm',
    pm: {
        firstName: 'Jacky',
        lastName: 'Lynne',
        email: 'jackyLynne@gmail.com',
        address: 'ABC Street',
      },
    token: '1d9f80e98e9b16b94bf76c2dc49fe15b8b30d1a2',
    properties: [
      {
        maxTenants: 10,
        numBath: 4,
        numBed: 10,
        pm: 'Jacky Lynne',
        propId: '1',
        streetAddress: 'ABG Street',
      },
    ],
};

const expectedFetchResult1: AccountStateAction = {
    type: TYPE,
    profile:{
        accountType: AccountTypes.PropertyManager,
        firstName: 'Jacky',
        lastName: 'Lynne',
        email: 'jackyLynne@gmail.com',
        address: 'ABC Street',
        pmId: undefined,
        token: '1d9f80e98e9b16b94bf76c2dc49fe15b8b30d1a2',
    },
};

const expectedProperties: FetchPropertiesAction ={
    type: FETCH_PROPERTIES,
    properties: {
      '1': {
        propId: '1',
        tenants: 10,
        bathrooms: 4,
        bedrooms: 10,
        address: "ABG Street",
      },
    },
};

const expectedSessionResult : SetAccountAuthenticationStateAction = {
  authed: true, 
  type: "SESSION/SET_AUTH_STATE",
};

const mockNavigation: NavigationSwitchProp = mockSwitchNavigation;

const createTestProps = (props: Object) => ({
  navigation: mockNavigation,
  ...props,
});


// To test nested actions with an async REST request, we need to call an await on the 
// dispatch methods in order to get an updated state. 
describe('generateAccountForPM Action', () => {
    const password= 'pass4jacky';
    const testProps = createTestProps({});
    const mock = new MockAdapter(axios);

    beforeEach(()=>{
        propertyManagerMock1.clearActions();
    });

    describe('Tests Action when account created successfully', () => {
        
        it('Test when the role is a PM', async () => {
          const data = { 
              status: 'success',
              ...testJsonValue1,
              role: 'pm',
          };
          const spyFunction = jest.fn(() => {});
          mock.onPost(URL).reply(200, data);
          await propertyManagerMock1.dispatch(
            generateAccountForPM(testPMAccount1, password, mockNavigation, spyFunction))
            .then(() => {
                expect(spyFunction.call).toHaveLength(1);
                const actionResults = propertyManagerMock1.getActions();
                expect(actionResults).toHaveLength(3);
                expect(actionResults[0]).toStrictEqual(expectedSessionResult);
                expect(actionResults[1]).toStrictEqual(expectedFetchResult1);
                expect(actionResults[2]).toStrictEqual(expectedProperties);
            });
      });
    });


    describe('Test action when authentication is failure', () => {
      beforeEach(()=>{
        propertyManagerMock1.clearActions();
      });

      it('When response has not been returned', async () => {
        const statusFailedSpy = jest.fn(() => {});
        mock.onPost(URL).reply(400, null);
        await propertyManagerMock1.dispatch(
            generateAccountForPM(testPMAccount1, password, testProps.navigation, statusFailedSpy))
            .then(() => {
                expect(statusFailedSpy.call).toHaveLength(1);
                expect(propertyManagerMock1.getActions()).toHaveLength(0);
                expect(statusFailedSpy).toBeCalledWith("Connection to the server could not be established.");
            });
      });

      
      it('When homepairs response returns failure', async () => {
        const data = { 
            status: 'failure',
        };
        const statusFailedSpy = jest.fn(() => {});
        mock.onPost(URL).reply(200, data);
        await propertyManagerMock1.dispatch(
            generateAccountForPM(testPMAccount1, password, testProps.navigation, statusFailedSpy))
            .then(() => {
                expect(propertyManagerMock1.getActions()).toHaveLength(0);
                expect(statusFailedSpy.mock.calls).toHaveLength(1);
                expect(statusFailedSpy).toBeCalledWith("Home Pairs was unable create the account. Please try again.");
            }); 
      });
    });    
});