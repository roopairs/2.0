import { AccountActions, PropertyListActions } from 'homepairs-redux-actions';
import { AccountTypes, AccountStateAction, Account, FetchPropertyAndPropertyManagerAction, SetAccountAuthenticationStateAction} from 'homepairs-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { navigationPages} from 'homepairs-routes';
import { propertyManagerMock1 , prepareNavigationSwitchMock} from 'homepairs-test';
import { HOMEPAIRS_REGISTER_TENANT_ENDPOINT, generateAccountForTenant } from '../index';


const {FETCH_PROFILE} = AccountActions.FETCH_PROFILE_ACTION_TYPES;
const {FETCH_PROPERTY_AND_PROPERTY_MANAGER} = PropertyListActions.PROPERTY_LIST_ACTION_TYPES;

const URL = HOMEPAIRS_REGISTER_TENANT_ENDPOINT;
const [mockSwitchNavigation, navigationSwitchSpyFunction] = prepareNavigationSwitchMock();
const navSpyFunction = navigationSwitchSpyFunction;
const TenantPropertyPageKey = navigationPages.TenantProperty;

const testTenantAccount1: Account = {
    accountType: AccountTypes.Tenant,
    firstName: 'Jacky',
    lastName: 'Lynne',
    email: 'jackyLynne@gmail.com',
    address: 'ABC Street',
    roopairsToken: '',
};

const testJsonValue1 = {
    tenant: {
        firstName: 'Jacky',
        lastName: 'Lynne',
        address: 'ABC Street',
        email: 'jackyLynne@gmail.com',
        propId: '100',
        tenantID: 15,
        pm:{
            pmInfo: {
                firstName: "Eeron",
                lastName: 'Grant',
                accountType: AccountTypes.PropertyManager,
                email: 'eerongrant@gmail.com',
            },
          },
      },
      properties:{
        propId: '100',
        maxTenants: 3,
        numBath: 2,
        numBed: 3,
        pm: "Eeron Grant",
        address: "ABC Street",
      },
      token: '',
};

const expectedFetchResult1: AccountStateAction = {
    type: FETCH_PROFILE,
    profile:{
        accountType: AccountTypes.Tenant,
        firstName: 'Jacky',
        lastName: 'Lynne',
        email: 'jackyLynne@gmail.com',
        address: 'ABC Street',
        roopairsToken: '',
        propId: '100',
        tenantId: 15,
    },
};

const expectedTenantProperty1: FetchPropertyAndPropertyManagerAction = {
    type: FETCH_PROPERTY_AND_PROPERTY_MANAGER,
    propertyManager: {
        accountType: 1,
        email: "eerongrant@gmail.com",
        firstName: "Eeron",
        lastName: "Grant",
    },
    property: [{
      tenants: 3,
      bathrooms: 2,
      bedrooms: 3,
      address: "ABC Street",
      propId: '100',
    }]};

const expectedSessionResults: SetAccountAuthenticationStateAction = {
    authed: true,
    type: "SESSION/SET_AUTH_STATE",
};

const mockNavigation = mockSwitchNavigation;

const createTestProps = (props: Object) => ({
  navigation: mockNavigation,
  ...props,
});


// To test nested actions with an async REST request, we need to call an await on the 
// dispatch methods in order to get an updated state. 
describe('generateAccountForTenant Action', () => {
    const password= 'pass4jacky';
    const testProps = createTestProps({});
    const mock = new MockAdapter(axios);

    beforeEach(()=>{
        propertyManagerMock1.clearActions();
    });

    describe('Tests Action when account created successfully', () => {
        it('Test when the role is tenant', async () => {
          const data = { 
              status: 'success',
              ...testJsonValue1,
              role: 'tenant',
          };
          const spyFunction = jest.fn(() => {});
          mock.onPost(URL).reply(200, data);
          await propertyManagerMock1.dispatch(
            generateAccountForTenant(testTenantAccount1, password, mockSwitchNavigation, spyFunction))
            .then(() => {
                expect(spyFunction.call).toHaveLength(1);
                const actionResults = propertyManagerMock1.getActions();
                expect(actionResults).toHaveLength(2); // Three actions: Session, FetchProfile, and FetchProperty
                expect(actionResults[0]).toStrictEqual(expectedSessionResults);
                expect(actionResults[1]).toStrictEqual(expectedFetchResult1);
                // expect(actionResults[2]).toStrictEqual(expectedTenantProperty1);
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
            generateAccountForTenant(testTenantAccount1, password, testProps.navigation, statusFailedSpy))
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
            generateAccountForTenant(testTenantAccount1, password, testProps.navigation, statusFailedSpy))
            .then(() => {
                expect(propertyManagerMock1.getActions()).toHaveLength(0);
                expect(statusFailedSpy.mock.calls).toHaveLength(1);
                expect(statusFailedSpy).toBeCalledWith("Home Pairs was unable create the account. Please try again.");
            }); 
      });
    });    
});