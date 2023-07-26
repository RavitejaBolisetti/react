import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import PageHeader from '@pages/common/PageHeader/PageHeader';
import { screen, fireEvent, waitFor} from "@testing-library/react";
import { showGlobalNotification } from 'store/actions/notification'; 
const mockFetchList = jest.fn();
const mockMarkFavourite = jest.fn();
const mockListShowLoading = jest.fn();
const mockShowGlobalNotification = jest.fn();

describe('PageHeader Component', () => {
  it('should render PageHeader component', async () => {
      const { container } = customRender(<PageHeader isFavourite={false} canMarkFavourite={true} mockFetchList={mockFetchList} mockMarkFavourite={mockMarkFavourite} mockShowGlobalNotification={mockShowGlobalNotification} mockListShowLoading={mockListShowLoading} />);
      expect(container).toMatchSnapshot();
  });

  it('renders page title correctly', () => {
    customRender(<PageHeader pageTitle="Test Page" />);
    const pageTitleElement = screen.getByText('Test Page');
    expect(pageTitleElement).toBeInTheDocument();
  });

 it('displays "Mark as favorite" icon when canMarkFavourite is true', () => {
    customRender(<PageHeader pageTitle="Mark as favourite" canMarkFavourite={true} onError={jest.fn()} handleFavouriteClick={jest.fn()} isFavourite={false}/>);
    const markAsFavoriteIcon = screen.getByTestId('addfav');
    expect(markAsFavoriteIcon).toBeInTheDocument();
 });

 it('displays "Mark as favorite" icon when canMarkFavourite is true', async() => {
    customRender(<PageHeader pageTitle="Mark as favourite" canMarkFavourite={true} onSuccess={jest.fn()} onError={jest.fn()} handleFavouriteClick={jest.fn()} isFavourite={false} showGlobalNotification={showGlobalNotification}/>);
    const markAsFavoriteIcon = screen.getByTestId('addfav');
    fireEvent.click(markAsFavoriteIcon);
    // const successMessage =  await waitFor(() => screen.findByText("Favourite's Menu updated Successfully"), {
    //   timeout: 3000
    // });
   
    // expect(successMessage).toBeInTheDocuments();
  });

  it('calls handleFavouriteClick when "Mark as favorite" icon is clicked', () => {
    customRender(<PageHeader pageTitle="Test Page" canMarkFavourite={true}  onError={jest.fn()} handleFavouriteClick={jest.fn()} isFavourite={true} />);
    const markAsFavoriteIcon = screen.getByTestId('addfav');
    fireEvent.click(markAsFavoriteIcon);
    expect(mockMarkFavourite).toHaveBeenCalledTimes(1);
  });
  // it("should check global notification component working or not", async() =>{
  //   customRender(<PageHeader showGlobalNotification={showGlobalNotification} pageTitle="Test Page" canMarkFavourite={true}  onError={jest.fn()} handleFavouriteClick={jest.fn()} isFavourite={true} onSuccess={jest.fn()} />);
  //   const successMessage = screen.findByText("Favourite's Menu updated Successfully");
  //   expect(successMessage).toBeInTheDocuments();
  // });
});