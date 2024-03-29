import '@testing-library/jest-dom/extend-expect';
import { TermConditionDealerMaster } from '@components/common/TermsAndConditions/DealerTermCondition';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/termsConditions/tncDealerSave', () => ({
    tncDealerSaveActions: {},
}));

jest.mock('components/common/TermsAndConditions/DealerTermCondition/AddEditForm', () => {
    const values = {
        termConditionDescription: 'Hello',
    };
    const AddEditForm = ({ onCloseAction, onFinish }) => (
        <>
            <div>
                <button onClick={onFinish(values)}>Save</button>
            </div>
            <div>
                <button onClick={onCloseAction}>Cancel</button>
            </div>
        </>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

describe('Term Condition Dealer Master components', () => {
    it('should render Term Condition Dealer Master components', () => {
        customRender(<TermConditionDealerMaster saveData={jest.fn()} />);
    });
    it('should validate fields', async () => {
        const defaultBtnVisiblity = { editBtn: true, saveBtn: true, saveAndNewBtn: true, saveAndNewBtnClicked: false, closeBtn: true, cancelBtn: true, formBtnActive: true };

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                TermCondition: {
                    ProductHierarchyData: { isLoaded: true },
                    DocumentTypeData: { isLoaded: true },
                    LanguageData: { isLoaded: true },
                    DealerTermsConditions: { isLoaded: true, data: [{ id: '1', productName: 'Sample Product', documentTypeCode: 'Doc Type 1', language: 'English', effectiveFrom: '2023-08-15', effectiveTo: '2023-08-31', version: '1.0', termConditionDescription: 'Sample' }] },

                    ManufacturerTermsConditions: { isLoaded: true, data: [{ id: '1' }, { id: '2', name: 'kaii' }] },
                    ChangeHistoryManufacturerTermsConditions: { isLoaded: true, data: [{ id: '1' }, { id: '2', name: 'kaii' }] },
                },
            },
        });
        const fetchTermCondition = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <TermConditionDealerMaster saveData={jest.fn()} buttonData={defaultBtnVisiblity} onSuccessAction={jest.fn()} isVisible={true} onCloseAction={jest.fn()} isHistoryVisible={true} setIsHistoryVisible={true} showChangeHistoryList={jest.fn()} showAddButton={true} onSuccess={jest.fn()} setRefershData={jest.fn()} showDataLoading={false} handleButtonClick={jest.fn()} setIsFormVisible={true} setIsViewModeVisible={true} fetchTermCondition={fetchTermCondition} />
            </Provider>
        );
        const searchBox = screen.getByRole('textbox', { name: 'Term & Condition' });
        fireEvent.change(searchBox, { target: { value: 'front tyre' } });
        const serchBtn = screen.getByRole('img', { name: /search/i });
        fireEvent.click(serchBtn);

        const rightImg = screen.getByRole('img', { name: /right/i });
        fireEvent.click(rightImg);

        const leftImg = screen.getByRole('img', { name: /left/i });
        fireEvent.click(leftImg);

        const productHierarchy = screen.getByRole('columnheader', { name: /Product Hierarchy/i });
        fireEvent.click(productHierarchy);

        const docType = screen.getByRole('columnheader', { name: /Document Type/i });
        fireEvent.click(docType);

        const language = screen.getByRole('columnheader', { name: /Language/i });
        fireEvent.click(language);

        const effFrom = screen.getByRole('columnheader', { name: /Effective From/i });
        fireEvent.click(effFrom);

        const effTo = screen.getByRole('columnheader', { name: /Effective To/i });
        fireEvent.click(effTo);

        const version = screen.getByRole('columnheader', { name: /Version/i });
        fireEvent.click(version);

        const searchBox1 = screen.getByRole('textbox', { name: 'Term & Condition' });
        fireEvent.change(searchBox1, { target: { value: 'front tyre' } });
        const closeBtn = screen.getByRole('img', { name: /close-circle/i });
        fireEvent.click(closeBtn);

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const historyBtn = screen.getByRole('button', { name: 'Change History' });
        fireEvent.click(historyBtn);

        const closeyBtn = screen.getAllByRole('img', { name: 'close' });
        fireEvent.click(closeyBtn[0]);

        await waitFor(() => {
            expect(screen.getByText('Sample Product')).toBeInTheDocument();
        });

        const refreshBtn = screen.getByTestId('refreshBtn');
        fireEvent.click(refreshBtn);
        fetchTermCondition.mock.calls[0][0].onSuccessAction();
        fetchTermCondition.mock.calls[0][0].onErrorAction();
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                TermCondition: {
                    DealerTermsConditions: { isLoaded: true, data: [{ id: '1', productName: 'Sample Product', documentTypeCode: 'Doc Type 1', language: 'English', effectiveFrom: '2023-08-15', effectiveTo: '2023-08-31', version: '1.0', termConditionDescription: 'Sample' }] },
                },
            },
        });
        const saveData = jest.fn();
        const fetchTermCondition = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <TermConditionDealerMaster saveData={saveData} fetchTermCondition={fetchTermCondition} />
            </Provider>
        );

        fetchTermCondition.mock.calls[0][0].onSuccessAction();
        fetchTermCondition.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText('Sample Product')).toBeInTheDocument();
        });

        const editBtn = screen.getByTestId('edit');
        fireEvent.click(editBtn);

        const closeBtn = screen.getByRole('button', { name: 'Cancel' });

        fireEvent.click(closeBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });
});
