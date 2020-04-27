import { AccountActions } from 'homepairs-redux-actions';
import { AccountTypes, AccountStateAction, FetchPropertiesAction, FetchPropertyAction, SetAccountAuthenticationStateAction  } from 'homepairs-types';
import { NavigationSwitchProp } from 'react-navigation';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { propertyManagerMock1, prepareNavigationSwitchMock } from 'homepairs-test';
import { fetchAccount } from '../api-request';
import { HOMEPAIRS_LOGIN_ENDPOINT } from '../constants';

const TYPE = 'ACCOUNT/FETCH_PROFILE';
const [mockSwitchNavigation, navigationSwitchSpyFunction] = prepareNavigationSwitchMock();
const spyFunction = navigationSwitchSpyFunction;
const URL = HOMEPAIRS_LOGIN_ENDPOINT;

const expectedResults: {[id:string]: AccountStateAction} = {
  PM_WITHOUT_TOKEN: { // PM Account w/out token 
    type: TYPE,
    profile: {
      accountType: AccountTypes.PropertyManager,
      firstName: 'Jack',
      address: undefined,
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      roopairsToken: '',
      pmId: 102449555,
    },
  },
  PM_WITH_TOKEN: { // PM Account with token
    type: TYPE,
    profile: {
      accountType: AccountTypes.PropertyManager,
      firstName: 'Jack',
      address: 'lifelike line Apt. 3',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      roopairsToken: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
      pmId: 102449555,
    },
  },
  TENANT_WITH_TOKEN: { // Tenant account with Token 
    type: TYPE,
    profile: {
      accountType: AccountTypes.Tenant,
      firstName: 'Kyle',
      address: undefined,
      lastName: 'Lion',
      email: 'kylelion@gmail.com',
      roopairsToken: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
      tenantId: 20,
      propId: 99,
    },
  },
  TENANT_WITHOUT_TOKEN: { // Tenant account with Token 
    type: TYPE,
    profile: {
      accountType: AccountTypes.Tenant,
      firstName: 'Kyle',
      address: 'lifelike line Apt. 3, San Luis Obispo',
      lastName: 'Lion',
      email: 'kylelion@gmail.com',
      roopairsToken: '',
      tenantId: 20,
      propId: 99,
    },
  },
  NO_TOKEN_DEFINED: { // Account of a response with no token
    type: TYPE,
    profile: {
      accountType: AccountTypes.PropertyManager,
      firstName: 'Jack',
      address: undefined,
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      roopairsToken: undefined,
      pmId: 102449555,
    },
  },
};

const expectedEmptyTenant: FetchPropertiesAction = {
  type: "PROPERTY_LIST/FETCH_PROPERTIES",
  properties: {},
};

const expectedTenantProperty : FetchPropertyAction = {
  type: "PROPERTY_LIST/FETCH_PROPERTY_AND_PROPERTY_MANAGER",
  propertyManager: {
    accountType: 1,
    email: "eerongrant@gmail.com",
    firstName: "Eeron",
    lastName: "Grant",
  },
  property: {
    '99': {
      propId: '99',
      tenants: 5,
      bathrooms: 2,
      bedrooms: 3,
      address: "200 N. Santa Rosa, San Luis Obispo, CA",
    },
  },
};

const testJsonValues: {[id:string]: any} =
{
  PM_WITHOUT_TOKEN: { // PM without token
    role: 'pm',
    pm: {
      firstName: 'Jack',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      pmId: 102449555,
    },
    token: '',
  },
  PM_WITH_TOKEN: { // PM with token
    role: 'pm',
    pm: {
      firstName: 'Jack',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      address: 'lifelike line Apt. 3',
      pmId: 102449555,
    },
    token: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
  },
  TENANT_WITH_TOKEN: {
    role: 'tenant',
    tenant: {
      firstName: 'Kyle',
      lastName: 'Lion',
      email: 'kylelion@gmail.com',
      propId: '99',
      tenantID: 20,
      pm: {
        pmInfo: {
          accountType: AccountTypes.PropertyManager,
          email: 'eerongrant@gmail.com',
          firstName: "Eeron",
          lastName: 'Grant',
        },
      },
    },
    // TODO: Check with backed to see if they return an Array of Properties or Single Property for Tenant login
    properties:[
      {
        maxTenants: 5,
        numBath: 2,
        numBed: 3,
        propId: '99',
        streetAddress: "200 N. Santa Rosa, San Luis Obispo, CA",
      },
    ],
    token: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
  },
  TENANT_WITHOUT_TOKEN: { // Tenant without a token
    role: 'tenant',
    tenant: {
      firstName: 'Kyle',
      lastName: 'Lion',
      address: 'lifelike line Apt. 3',
      city: 'San Luis Obispo',
      email: 'kylelion@gmail.com',
      propId: '99',
      tenantID: 20,
    },
    token: '',
  },
  NO_TOKEN_DEFINED: { // Response with no token key
    role: 'pm',
    pm: {
      firstName: 'Jack',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      pmId: 102449555,
    },
  },
};

const expectedSessionAction : SetAccountAuthenticationStateAction = {
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
describe('FetchAccount Action', () => {
    const email = 'jacky@gmail.com';
    const password= 'pass4jacky';
    const testProps = createTestProps({});
    const mock = new MockAdapter(axios);

    describe('Tests Action when response returned is success', () => {
        beforeEach(()=>{
          propertyManagerMock1.clearActions();
        });

        it('Test when the role is a PM', async () => {
          const data = { 
              status: 'success',
              ...testJsonValues.PM_WITH_TOKEN,
          };
          mock.onPost(URL).reply(200, data);
          await propertyManagerMock1.dispatch(
            fetchAccount(email, password, testProps.navigation))
            .then(() => {
              expect(spyFunction.call).toHaveLength(1);
              const actionResults = propertyManagerMock1.getActions();
              expect(actionResults).toHaveLength(3);
              expect(actionResults[0]).toStrictEqual(expectedSessionAction);
              expect(actionResults[1]).toStrictEqual(expectedResults.PM_WITH_TOKEN);
              expect(actionResults[2]).toStrictEqual(expectedEmptyTenant);
            });
      });

      it('Test when the role is a Tenant with a property', async () => {
        const data = { 
            status: 'success',
            ...testJsonValues.TENANT_WITH_TOKEN,
        };
        mock.onPost(URL).reply(200, data);
        await propertyManagerMock1.dispatch(fetchAccount(email, password, testProps.navigation)).then(() => {
          expect(spyFunction.call).toHaveLength(1);
          const actionResults = propertyManagerMock1.getActions();
          expect(actionResults).toHaveLength(3);
          expect(actionResults[2]).toStrictEqual(expectedTenantProperty);
        });
    });

    describe('Test action when authentication is a failure', () => {
      beforeEach(()=>{
        propertyManagerMock1.clearActions();
      });
      
      it('When response has not been returned', async () => {
        const statusFailedSpy = jest.fn((error?:string) => {});
        mock.onPost(URL).reply(400, null);
        await propertyManagerMock1.dispatch(fetchAccount(email, password, testProps.navigation, statusFailedSpy))
        .then(() => {
          expect(spyFunction.call).toHaveLength(1);
          expect(statusFailedSpy).toBeCalledWith("Unable to establish a connection with HomePairs servers");
        });

      });

      it('When response returns failure', async () => {
        const data = { 
            status: 'failure',
        };
        const statusFailedSpy = jest.fn(() => {});
        mock.onPost(URL).reply(200, data);
        await propertyManagerMock1.dispatch(fetchAccount(email, password, testProps.navigation, statusFailedSpy)).then(() => {
          expect(propertyManagerMock1.getActions()).toHaveLength(0);
          expect(statusFailedSpy.mock.calls).toHaveLength(1);
          expect(statusFailedSpy).toBeCalledWith("Home Pairs was unable to log in. Please try again.");
        }); 
      });

    });
  });
});