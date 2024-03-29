/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import customRender from '@utils/test-utils';
import { CompanyProfileMaster } from 'components/common/CustomerMaster/CorporateCustomer/CompanyProfile/CompanyProfileMaster';
import { fireEvent, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

jest.mock('@components/common/CustomerMaster/CorporateCustomer/CompanyProfile/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Save & Next</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/customerMaster/documentView', () => ({
    documentViewDataActions: {},
}));

jest.mock('store/actions/data/customerMaster/corporateCompanyProfileAction', () => ({
    corporateCompanyProfileDataActions: {},
}));

describe('company profile', () => {
    it('save button should work', () => {
        const formActionType = {
            viewMode: true,
        };
        const buttonData = {
            saveBtn: true,
            formBtnActive: false,
            closeBtn: true,
            cancelBtn: true
        };
        customRender(<CompanyProfileMaster resetViewData={jest.fn()} resetData={jest.fn()} formActionType={formActionType} buttonData={buttonData} setButtonData={jest.fn()} />);
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('should render view detail component', () => {
        const formActionType = {
            viewMode: true,
        };
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    CompanyProfile: {
                        isLoaded: 'false',
                        data: { id: '123', value: 'test123', customerFormDocId: '106' },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <CompanyProfileMaster resetViewData={jest.fn()} fetchViewDocument={jest.fn()} selectedCustomerId={106} fetchCompanyProfileData={jest.fn()} resetData={jest.fn()} formActionType={formActionType} formData={true} />
            </Provider>
        );
        const minusBtn = screen.getByRole('img', { name: 'minus' });
        fireEvent.click(minusBtn);
        const plusBtn = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn[0]);
        fireEvent.click(plusBtn[1]);
    });

    it('onFinish should work', async () => {
        const formActionType = {
            viewMode: false,
        };
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    CompanyProfile: {
                        isLoaded: 'false',
                        data: { id: '123', value: 'test123' },
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const saveData = jest.fn();
        const res={ data: { name: 'Test' } };

        const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

        customRender(
            <Provider store={mockStore}>
                <CompanyProfileMaster resetViewData={jest.fn()} fetchCompanyProfileData={jest.fn()} listShowLoading={jest.fn()} resetData={jest.fn()} formActionType={formActionType} fetchDetailList={fetchDetailList} saveData={saveData} handleButtonClick={jest.fn()} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const save = screen.getAllByRole('button', { name: 'Save & Next' });
        fireEvent.click(save[0]);

        await waitFor(() => { expect(saveData).toHaveBeenCalled(); });
        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    });
});
