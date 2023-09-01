import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ProductDetailMaster } from '@components/Sales/VehicleDetail/ProductDetails/ListProductDetail';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';

beforeEach(() => {
    jest.clearAllMocks();
});

const defaultBtnVisiblity = {
    editBtn: true,

    saveBtn: true,

    cancelBtn: true,

    saveAndNewBtn: true,

    saveAndNewBtnClicked: true,

    closeBtn: true,

    formBtnActive: true,

    cancelOTFBtn: true,

    transferOTFBtn: true,

    allotBtn: true,

    unAllotBtn: true,

    invoiceBtn: true,

    deliveryNote: true,

    changeHistory: true,
};

const props = { formActionType: { viewMode: false }, isDataLoaded: true, ProductDetailsData: [{ key: '1', value: '2' }], isLoading: false, handleButtonClick: jest.fn(), fetchList: jest.fn(), resetData: jest.fn(), saveData: jest.fn(), listShowLoading: jest.fn(), showGlobalNotification: jest.fn(), section: { id: 3, title: 'Product Details', displayOnList: true }, handleFormValueChange: jest.fn(), NEXT_ACTION: jest.fn() };
const typeData = {
    VEH_ITEM: [
        { id: 'da9507a1-788c-4f3c-a087-a42943598b88', key: 'VIT001', parentKey: 'VEH_ITEM', value: 'Front Right Tyre' },
        { id: '143a2655-179a-44f4-aa2d-0b81676519ca', key: 'VIT002', parentKey: 'VEH_ITEM', value: 'Front Left Tyre' },
    ],
};
describe('Vehicle ProductDetails render', () => {
    it('should render page', async () => {
        const prop = { formActionType: { viewMode: false } };
        customRender(<ProductDetailMaster typeData={typeData} {...props} ProductDetailsData={['t1', 't2']} userId={'123'} selectedRecordId={'12'} resetData={jest.fn()} moduleTitle={''} onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />);

        const productDetails = screen.getByText('Product Attribute Details');
        expect(productDetails).toBeTruthy();

        const plusImg = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusImg[0]);

        const connectedVehicle = screen.getByText('Connected Vehicle');
        expect(connectedVehicle).toBeTruthy();
        fireEvent.click(plusImg[1]);

        const aggregateText = screen.getByText('Aggregates');
        expect(aggregateText).toBeTruthy();

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
    });
    it('should render viewdetails page', () => {
        const prop = { formActionType: { viewMode: true } };
        customRender(<ProductDetailMaster {...prop} moduleTitle={''} onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />);
    });
    it('onfinish should work', () => {
        const prop = { formActionType: { viewMode: false } };
        customRender(<ProductDetailMaster typeData={typeData} setButtonData={jest.fn()} setitemOptions={''} setIsReadOnly={false} isReadOnly={true} selectedRecordId="MAKGF1F57A7192176" buttonData={defaultBtnVisiblity} {...props} ProductDetailsData={['t1', 't2']} userId={'123'} resetData={jest.fn()} moduleTitle={''} onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />);
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });

        fireEvent.click(saveBtn);
    });

    it('should validate fields on finish failed', async () => {
        const mockStore = createMockStore({});
        customRender(
            <Provider store={mockStore}>
                <ProductDetailMaster typeData={typeData} setButtonData={jest.fn()} buttonData={defaultBtnVisiblity} setitemOptions={''} setIsReadOnly={false} isReadOnly={true} selectedRecordId="MAKGF1F57A7192176" {...props} ProductDetailsData={['t1', 't2']} userId={'123'} resetData={jest.fn()} moduleTitle={''} onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFormFieldChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(addBtn);

        const plusAdd = screen.getByRole('button', { name: /plus add/i });
        fireEvent.click(plusAdd);

        const saveNextBtn = screen.getByRole('button', { name: /save & next/i });
        fireEvent.click(saveNextBtn);
    });
});
