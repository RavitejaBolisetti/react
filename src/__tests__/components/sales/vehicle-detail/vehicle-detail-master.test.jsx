import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { VehicleDetailMaster } from 'components/Sales/VehicleDetail/VehicleDetailMaster';
import customRender from '@utils/test-utils';

jest.mock('store/actions/data/vehicle/vehicleDetail', () => ({
    vehicleDetailDataActions: {},
}));

describe('Vehicle Detail Master Component', () => {
    it('should render vehicle detail master component', () => {
        customRender(<VehicleDetailMaster setFilterString={jest.fn()} />);
    });

    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { VH_DTLS_SER: [{ name: 'test' }] } },
                Vehicle: {
                    VehicleDetail: { filter: { advanceFilter: true, searchParam: 'Test', fromDate: 'Test' } },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleDetailMaster fetchList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('Should click on view button and close Action call', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                Vehicle: {
                    VehicleDetail: {
                        data: {
                            vehicleSearch: [
                                {
                                    chassisNumber: 'N5H82480',
                                    color: 'A0NISANBLU',
                                    customerCode: 'C230343008',
                                    customerName: 'NAMDEV',
                                    engineNumber: 'S2G9218257',
                                    grnDate: '2022-08-27T00:00:00.000+00:00',
                                    grnNumber: 'GRN23C000335',
                                    invoiceDate: '2022-08-30T00:00:00.000+00:00',
                                    invoiceNumber: 'INV23C000364',
                                    mfgWarranty: 'Expired',
                                    mobileNumber: '8652810126',
                                    model: 'MAHINDRA ALFA LC PLUS DSL BSVI NISS BLU',
                                    modelDescription: 'MAHINDRA ALFA LC PLUS DSL BSVI NISS BLU',
                                    modelFamily: '796',
                                    modelGroup: 'ALFL',
                                    netDealerPrice: 254333,
                                    orignallyWarrantyStartDate: null,
                                    registrationNumber: 'MH01CQ1336',
                                    status: null,
                                    vehicleIdentificationNumber: 'MA1LV2NR9N5H82480',
                                },
                            ],
                        },
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDetail = jest.fn();
        const saveData = jest.fn();
        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleDetailMaster fetchList={fetchList} fetchDetail={fetchDetail} saveData={saveData} setFilterString={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('NAMDEV')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });

        fireEvent.click(viewBtn);

        const closeBtn = screen.getAllByRole('button', { name: /close/i });
        fireEvent.click(closeBtn[1]);
    });

    it('test2', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleDetail: {
                        data: {
                            vehicleSearch: [
                                {
                                    chassisNumber: 'N5H82480',
                                    color: 'A0NISANBLU',
                                    customerCode: 'C230343008',
                                    customerName: 'NAMDEV',
                                    engineNumber: 'S2G9218257',
                                    grnDate: '2022-08-27T00:00:00.000+00:00',
                                    grnNumber: 'GRN23C000335',
                                    invoiceDate: '2022-08-30T00:00:00.000+00:00',
                                    invoiceNumber: 'INV23C000364',
                                    mfgWarranty: 'Expired',
                                    mobileNumber: '8652810126',
                                    model: 'MAHINDRA ALFA LC PLUS DSL BSVI NISS BLU',
                                    modelDescription: 'MAHINDRA ALFA LC PLUS DSL BSVI NISS BLU',
                                    modelFamily: '796',
                                    modelGroup: 'ALFL',
                                    netDealerPrice: 254333,
                                    orignallyWarrantyStartDate: null,
                                    registrationNumber: 'MH01CQ1336',
                                    status: null,
                                    vehicleIdentificationNumber: 'MA1LV2NR9N5H82480',
                                },
                            ],
                        },
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const fetchDetail = jest.fn();
        const buttonData = { editBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleDetailMaster isVisible={true} fetchDetail={fetchDetail} fetchProductList={jest.fn()} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchList={fetchList} buttonData={buttonData} saveData={saveData} setFilterString={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('NAMDEV')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });

        fireEvent.click(viewBtn);

        const editBtn = screen.getAllByRole('button', { name: /edit/i });
        fireEvent.click(editBtn[0]);

        const textbox = screen.getByRole('checkbox', { name: /OEM Privileged Customer/i });
        fireEvent.click(textbox);

        const save = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(save);
    });
});
