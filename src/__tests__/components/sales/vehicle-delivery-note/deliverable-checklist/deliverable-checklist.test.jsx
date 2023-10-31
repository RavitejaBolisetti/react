import '@testing-library/jest-dom/extend-expect';
import { DeliverableChecklistMaster } from '@components/Sales/VehicleDeliveryNote/DeliverableChecklist/DeliverableChecklistMaster';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Deliverable checklist Master components', () => {
    it('should render components', () => {
        customRender(<DeliverableChecklistMaster setButtonData={jest.fn()} />);
    });
    it('should render view components', () => {
        const formActionType = { viewMode: true };
        customRender(<DeliverableChecklistMaster setButtonData={jest.fn()} formActionType={formActionType} />);
    });

    it('test1', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    DeliverableChecklistMain: { isLoaded: true, data: [{ customerId: 'C230853564', customerName: 'SAURAV CHANDRAPRAKASH THAKUR', deliveryHdrId: null, deliveryNoteDate: null, deliveryNoteStatus: 'pending', invoiceDate: '2023-10-06', invoiceId: 'INV23D010027', invoicehdrId: '9ffb0069-9ff7-4db3-a1cb-b6335eb52af9', mobileNumber: null, modelGroup: 'SCN', otfId: '30d8fd22-68b4-41e3-8106-41cac63e641e', otfNumber: 'OTF23D002140', vehicleDeliveryNote: null, vehicleSoldByDealer: true }] },
                },
            },
        });
        const formActionType = { viewMode: false };
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <DeliverableChecklistMaster setFilterString={jest.fn()} setButtonData={jest.fn()} formActionType={formActionType} fetchList={fetchList} />
            </Provider>
        );

        const editBtn = screen.getByRole('button', { name: /fa-edit/i });
        fireEvent.click(editBtn);

        const clearBtn = screen.getByRole('button', { name: /Save/i });
        fireEvent.click(clearBtn);
    });

    it('test2', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    DeliverableChecklistMain: { isLoaded: true, data: [{ customerId: 'C230853564', customerName: 'SAURAV CHANDRAPRAKASH THAKUR', deliveryHdrId: null, deliveryNoteDate: null, deliveryNoteStatus: 'pending', invoiceDate: '2023-10-06', invoiceId: 'INV23D010027', invoicehdrId: '9ffb0069-9ff7-4db3-a1cb-b6335eb52af9', mobileNumber: null, modelGroup: 'SCN', otfId: '30d8fd22-68b4-41e3-8106-41cac63e641e', otfNumber: 'OTF23D002140', vehicleDeliveryNote: null, vehicleSoldByDealer: true }] },
                },
            },
        });
        const formActionType = { viewMode: false };
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <DeliverableChecklistMaster setFilterString={jest.fn()} setButtonData={jest.fn()} formActionType={formActionType} fetchList={fetchList} onCloseAction={jest.fn()} />
            </Provider>
        );

        const editBtn = screen.getByRole('button', { name: /fa-edit/i });
        fireEvent.click(editBtn);

        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });
});
