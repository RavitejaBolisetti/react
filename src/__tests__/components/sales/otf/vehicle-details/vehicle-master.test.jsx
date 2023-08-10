import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { VehicleDetailsMaster, VehicleDetailsMasterMain } from '@components/Sales/OTF/VehicleDetails/VehicleDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';

import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const initialState = {
    auth: { userId: 123 },
    isLoaded: false,
    data: [],
    isFilteredListLoaded: false,
    filteredListData: [],

    isLoading: false,
    isLoadingOnSave: false,
}; // Provide an initial state that matches your mapStateToProps structure
const store = mockStore(initialState);

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <VehicleDetailsMaster form={form} {...props} />;
};

const props = {
    VehicleDetailsData: [],
    isVehicleLovDataLoading: true,
    VehicleLovData: [],
    resetProductLov: jest.fn(),
    isVehicleLovDataLoaded: true,
    ProductHierarchyData: [],
    fetchProductLovCode: jest.fn(),
    fetchProductLov: jest.fn(),
    isLoading: jest.fn(),
    saveData: jest.fn(),
    ProductLovLoading: jest.fn(),
    isProductHierarchyDataLoaded: jest.fn(),
    fetchList: jest.fn(),
    resetData: jest.fn(),
    isDataLoaded: jest.fn(),
    listShowLoading: jest.fn(),
    showGlobalNotification: jest.fn(),
    section: { id: 3, title: 'Vehicle Details', displayOnList: true },

    handleFormValueChange: jest.fn(),
    NEXT_ACTION: jest.fn(),
    handleButtonClick: jest.fn(),
};
describe('OTF finance view Details render', () => {
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

    it('finance form input should work', () => {
        const prop2 = { formActionType: { viewMode: true } };
        customRender(<FormWrapper {...prop2} typeData={'VEHCL_TYPE'} {...props} />);
        screen.debug();

        const btn1 = screen.getByRole('button', { name: 'minus Vehicle Information' });
        fireEvent.click(btn1);
        expect(btn1).toBeTruthy();

        const btn2 = screen.getByRole('button', { name: 'plus Tax Details' });
        fireEvent.click(btn2);
        expect(btn2).toBeTruthy();

        const btn3 = screen.getByRole('button', { name: 'plus Charges' });
        fireEvent.click(btn3);
        expect(btn3).toBeTruthy();
    });
    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} buttonData={defaultBtnVisiblity} typeData={'VEHCL_TYPE'} onCloseAction={jest.fn()} />
            </Provider>
        );

        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
    });
});
describe('VehicleDetailsMasterMain Component', () => {
    it('renders without crashing', () => {
        customRender(<VehicleDetailsMaster store={store} />);
        screen.debug();
    });

    it('displays section title correctly', () => {
        const { getByText } = customRender(<VehicleDetailsMaster store={store} />);
        const sectionTitle = getByText('Vehicle Details');
        expect(sectionTitle).toBeInTheDocument();
    });

    // Write more test cases to cover different scenarios, interactions, and state changes
});
