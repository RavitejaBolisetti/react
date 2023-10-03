import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ProductMapping } from 'components/common/UserManagement/Dealer/ProductMapping';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Product Mapping Component', () => {

    it('should render product mapping component', () => {
        customRender(<ProductMapping />);
    });

    it('save button should enable', async () => {
        const setButtonData=jest.fn();
        customRender(<ProductMapping userId={106} setButtonData={setButtonData} fetchProductHierarchyList={jest.fn()} fetchDealerProduct={jest.fn()} />);
        await waitFor(() => { expect(setButtonData).toHaveBeenCalled() });
        setButtonData.mock.calls[0][0]('hello');
    });

    it('tree click should work', () => {
        const productHierarchyData=[{prodctCode: 106, prodctShrtName: 'Kai'}];
        customRender(<ProductMapping userId={106} setButtonData={jest.fn()} fetchDealerProduct={jest.fn()} productHierarchyData={productHierarchyData} userProductListData={[{name: 'Kai'}]} />);
        const tree=screen.getByText('Kai');
        fireEvent.click(tree);
    });

    it('save button should work', async () => {
        const buttonData={
            saveBtn: true,
            formBtnActive: true
        };
        const saveDealerProduct=jest.fn();
        customRender(<ProductMapping buttonData={buttonData} setButtonData={jest.fn()} saveDealerProduct={saveDealerProduct} handleButtonClick={jest.fn()} showGlobalNotification={jest.fn()} />);
        const saveBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
        await waitFor(() => { expect(saveDealerProduct).toHaveBeenCalled() });
        saveDealerProduct.mock.calls[0][0].onErrorAction();
        saveDealerProduct.mock.calls[0][0].onSuccess();
    });

});
