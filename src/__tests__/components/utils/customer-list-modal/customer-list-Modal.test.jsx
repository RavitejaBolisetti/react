/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { CustomerListModal } from "@components/utils/CustomerListModal/CustomerListModal";
import { CustomerListMaster } from "@components/utils/CustomerListModal/CustomerListMaster";
import { screen, fireEvent } from "@testing-library/react";
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';


describe("CustomerListModal components", () => {
    const tableProps = {
        srl: false,
        rowKey: 'registrationNumber',
        rowSelection: {
            type: 'radio',
        },
        pagination: false,
        isLoading: false,
        selectedRows: [{ key: 2, value: "testdms", "registrationNumber": 'hdhh' }],
        formBtnActive: false,
        setFormBtnActive: jest.fn(),
        handleSelectedData: jest.fn(),
        setSelectedRowData: [{ key: 2, value: "testdms" }, { key: 2, value: "testdms" }],
        onChange: jest.fn()
    }
    it("should render CustomerListModal components UI", () => {
        const { getByRole } = customRender(<CustomerListModal
            {...tableProps}
            isVisible={true}
            setSelectedRows={[{ key: 2, value: "testdms" }, { key: 2, value: "testdms", "registrationNumber": 'hdhh' }]}
            handleViewDetail={jest.fn()}
            selectedRowKeys={jest.fn()}
            onClick={jest.fn()}
            onChange={jest.fn()}
            handleResetFilter={jest.fn()}
            setCusomerSearchVisible={jest.fn()}
            setFilterString={jest.fn()}
            fetchCustomerList={jest.fn()}
        />);

        const customer = getByRole('columnheader', { name: 'Customer ID', exact: false });
        expect(customer).toBeTruthy();

        const customerName = getByRole('columnheader', { name: 'Customer Name', exact: false });
        expect(customerName).toBeTruthy();

        const mobileNo = getByRole('columnheader', { name: 'Mobile No', exact: false });
        expect(mobileNo).toBeTruthy();

        const regNumber = getByRole('columnheader', { name: 'Registration Number', exact: false });
        expect(regNumber).toBeTruthy();

        const chassisNo = getByRole('columnheader', { name: 'Chassis Number', exact: false });
        expect(chassisNo).toBeTruthy();

        const viewDetails = getByRole('button', { name: 'View Details', exact: false });
        fireEvent.click(viewDetails);
        expect(screen.getByTestId("counter-text")).toBeInTheDocument(true);
    })
});
describe("CustomerListMaster components", () => {
    const mockStore = createMockStore({
        auth: { userId: '1234' },
        data: {
            ConfigurableParameterEditing: { filteredListData: [{ key: 1376, value: "testDMS" }, { key: 367, value: "testDMS" }] },
            OTF: {
                Referrals: { isLoaded: false, isLoading: true, filter: { searchType: 'test', searchParam: "test" } },
            },
        },
    });


    const props = {
        isVisible: true,
        titleOverride: 'Search Result',
        handleResetFilter: jest.fn(),
        onCloseAction: jest.fn(),
        setCusomerSearchVisible: jest.fn(),
        data: jest.fn(),
        fnSetData: jest.fn(),
        handleFormValueChange: jest.fn(),
        setSelectedRowData: jest.fn(),
        filterString: undefined,
        setFilterString: jest.fn(),
        optionType: [{key: 563, value: "test"}, {key: 32, value: "test33"}]
    }

    it("should render CustomerListMaster components UI", () => {
        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <CustomerListMaster
                    {...props}
                    isVisible={jest.fn()}
                    fetchCustomerList={jest.fn()}
                    onSuccessAction={jest.fn()}
                    onErrorAction={jest.fn()}
                    showGlobalNotification={jest.fn()}
                    handleSelectedData={jest.fn()}
                    handleChange={jest.fn()}
                    handleSearchParamSearch={jest.fn()}
                />
            </Provider>);

        const search = getByRole('button', { name: 'search', exact: false });
        fireEvent.click(search);

        const searchImg = getByRole('img', { name: 'search', exact: false });
        expect(searchImg).toBeTruthy();
    })
});