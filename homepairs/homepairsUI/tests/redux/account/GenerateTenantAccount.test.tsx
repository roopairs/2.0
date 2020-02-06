import { AccountActions, PropertyListActions } from 'homepairs-redux-actions';
import { AccountTypes, AccountStateAction, Account, Property, FetchPropertyAction} from 'homepairs-types';
import { NavigationSwitchProp } from 'react-navigation';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { propertyManagerMock1 } from '../../fixtures/StoreFixture';


const {FETCH_PROFILE} = AccountActions.FETCH_PROFILE_ACTION_TYPES;
const {FETCH_PROPERTY} = PropertyListActions.PROPERTY_LIST_ACTION_TYPES;

const URL = 'http://homepairs-alpha.herokuapp.com/API/register/tenant/';
const navSpyFunction = jest.fn((arg:string) => {return arg;});
const TenantPropertyPageKey = 'TenantProperties';

const testTenantAccount1: Account = {
    accountType: AccountTypes.Tenant,
    firstName: 'Jacky',
    lastName: 'Lynne',
    email: 'jackyLynne@gmail.com',
    phone: '924-555-5555',
    streetAddress: 'ABC Street',
    city: 'Foster Town',
    roopairsToken: '',
};

const testJsonValue1 = {
    tenant: {
        accountType: AccountTypes.Tenant,
        firstName: 'Jacky',
        lastName: 'Lynne',
        streetAddress: 'ABC Street',
        city: 'Foster Town',
        email: 'jackyLynne@gmail.com',
        phone: '924-555-5555',
        propId: 100,
        tenantID: 15,
        place:{
            city: "Foster Town",
            maxTenants: 3,
            numBath: 2,
            numBed: 3,
            pm: "Eeron Grant",
            state: undefined,
            streetAddress: "ABC Street",
          },
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
        phone: '924-555-5555',
        streetAddress: 'ABC Street',
        city: 'Foster Town',
        roopairsToken: '',
        propId: 100,
        tenantId: 15,
    },
};

const expectedTenantProperty1: FetchPropertyAction = {
    type: FETCH_PROPERTY,
    property: [{
      city: "Foster Town",
      tenants: 3,
      bathrooms: 2,
      bedrooms: 3,
      state: undefined,
      streetAddress: "ABC Street",
    }]};

const mockNavigation: NavigationSwitchProp = {
  navigate: (routeNameOrOptions)=>{
    navSpyFunction(routeNameOrOptions);
    return true;
  },
  state: undefined,
  dispatch: undefined, 
  goBack: undefined,
  dismiss: undefined,
  openDrawer:undefined,
  closeDrawer: undefined, 
  toggleDrawer: undefined, 
  getParam: undefined,
  setParams: undefined,
  emit: undefined, 
  addListener: undefined, 
  isFocused: undefined, 
  isFirstRouteInParent: undefined, 
  dangerouslyGetParent: undefined,
  jumpTo: undefined,
};

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
        
        it('Test when the role is a PM', async () => {
          const data = { 
              status: 'success',
              ...testJsonValue1,
              role: 'tenant',
          };
          const spyFunction = jest.fn(() => {});
          mock.onPost(URL).reply(200, data);
          await propertyManagerMock1.dispatch(
            AccountActions.generateAccountForTenant(testTenantAccount1, password, mockNavigation, spyFunction))
            .then(() => {
                expect(spyFunction.call).toHaveLength(1);
                const actionResults = propertyManagerMock1.getActions();
                expect(actionResults).toHaveLength(2);
                expect(actionResults[0]).toStrictEqual(expectedFetchResult1);
                expect(actionResults[1]).toStrictEqual(expectedTenantProperty1);
                expect(navSpyFunction).toBeCalledWith(TenantPropertyPageKey);
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
            AccountActions.generateAccountForTenant(testTenantAccount1, password, testProps.navigation, statusFailedSpy))
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
            AccountActions.generateAccountForTenant(testTenantAccount1, password, testProps.navigation, statusFailedSpy))
            .then(() => {
                expect(propertyManagerMock1.getActions()).toHaveLength(0);
                expect(statusFailedSpy.mock.calls).toHaveLength(1);
                expect(statusFailedSpy).toBeCalledWith("Home Pairs was unable create the account. Please try again.");
            }); 
      });
    });    
});