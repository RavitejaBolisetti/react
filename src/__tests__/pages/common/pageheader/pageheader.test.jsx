import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import PageHeader from '@pages/common/PageHeader/PageHeader';
import { screen} from "@testing-library/react";
describe('PageHeader Component', () => {
    it('should render PageHeader component', async () => {
        const { container } = customRender(<PageHeader />);
        expect(container).toMatchSnapshot();
    });
});


// Mock the Redux store state
const mockState = {
 auth: { userId: 'user123' },
 data: {
   Menu: {
     isLoaded: true,
     filter: null,
     data: [],
     favouriteMenu: [],
     flatternData: [],
   },
 },
 common: {
   LeftSideBar: { collapsed: false },
 },
};

const mockFetchList = jest.fn();
const mockMarkFavourite = jest.fn();
const mockListShowLoading = jest.fn();
const mockShowGlobalNotification = jest.fn();

jest.mock('store/actions/data/menu', () => ({
 menuDataActions: {
   fetchList: () => mockFetchList,
   markFavourite: () => mockMarkFavourite,
   listShowLoading: () => mockListShowLoading,
 },
}));

jest.mock('store/actions/notification', () => ({
 showGlobalNotification: () => mockShowGlobalNotification,
}));

describe('PageHeader', () => {
 beforeEach(() => {
   // Reset mock function calls before each test
   jest.clearAllMocks();
 });

 test('renders page title correctly', () => {
    customRender(<PageHeader pageTitle="Test Page" />);

   const pageTitleElement = screen.getByText('Test Page');
   expect(pageTitleElement).toBeInTheDocument();
 });

//  test('displays "Mark as favorite" icon when canMarkFavourite is true', () => {
//     customRender(

// <PageHeader canMarkFavourite="Mark as favourite" canMarkFavourite={true} onError={jest.fn()} handleFavouriteClick={jest.fn()} isFavourite={false}/>
//    );

//    const markAsFavoriteIcon = screen.getByLabelText('Mark as favourite');
//    expect(markAsFavoriteIcon).toBeInTheDocument();
//  });
});