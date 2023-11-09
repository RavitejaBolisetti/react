/* eslint-disable jest/no-mocks-import */
/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { BayTypeMaster } from '@components/common/DealerManpower/BayTypeMaster/BayTypeMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

jest.mock('store/actions/data/dealerManpower/bayMasterType', () => ({
    dealerManpowerBayTypeMasterDataActions: {},
}));

afterEach(() => {
    jest.restoreAllMocks();
});

let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };


const FormWrapper = (props) => {
    const [form, listFilterForm] = Form.useForm();
    return <BayTypeMaster form={form} listFilterForm={listFilterForm} {...props} />;
}

const mockStore = createMockStore({
    auth: { userId: 106 },
    data: {
        DealerManpower: {
            BayTypeMaster: { isLoaded: false, isLoading: false, data: [{ key: 1, value: 'test' }, { key: 2, value: 'test' }] },
        },
    },
});

const buttonData = {
    closeBtn: false,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: false,
    formBtnActive: false,
    saveAndNewBtnClicked: true
};
const filterString = {
    keyword: 'test'
}

describe('Bay type master components', () => {
    it('Should render Bay type master Applied Advance Filter components', () => {
        const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]

        const props = {
            formActionType: { viewMode: false, editMode: false },
        }

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    {...props}
                    tableData={tableData}
                    handleButtonClick={jest.fn()}
                    showAddButton={true}
                    showChangeHistoryButton={true}
                    filterString={filterString}
                    handleReferesh={jest.fn()}
                    advanceFilter={true}
                    fetchList={jest.fn()}
                />
            </Provider>
        )

        const textBox = screen.getByPlaceholderText('Search');
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

       
        const closeImg = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeImg);

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);
    })

    it('refresh button should work', async () => {

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    BayTypeMaster: {
                        isLoaded: true,
                        data: [{ id: 1, name: 'test', code: 'Alice', status: true }],
                    }
                },
            },
        });

        const fetchList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <BayTypeMaster fetchList={fetchList} />
            </Provider>
        );

        const refreshbutton = screen.getByRole('button', { name: '', exact: false });
        fireEvent.click(refreshbutton);
        fetchList.mock.calls[0][0].onSuccessAction();

    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    BayTypeMaster: {
                        isLoaded: true, data: [{ code: "234567", name: "sdfghjkwertyu", status: true }]
                    },
                },
            },
        });

        const saveData = jest.fn();

        const res = { data: [{ code: "234567", name: "sdfghjkwertyu", status: true }] };

        customRender(
            <Provider store={mockStore}>
                <BayTypeMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData}/>
            </Provider>
        );
        const editBtn = screen.getByRole('button', { name: /fa-edit/i });
        fireEvent.click(editBtn);

        const status = screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const saveBtn = screen.getByTestId('save');
        fireEvent.click(saveBtn);

        const saveNewBtn = screen.getByTestId('save-and-new');
        fireEvent.click(saveNewBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());
        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    });


    it('Should render onError', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    BayTypeMaster: {
                        isLoaded: true, data: [{ code: "234567", name: "sdfghjkwertyu", status: true }]
                    },
                },
            },
        });

        const saveData = jest.fn();

        const res = { data: [{ code: "234567", name: "sdfghjkwertyu", status: true }] };

        const formActionType = { viewMode: false }

        customRender(
            <Provider store={mockStore}>
                <BayTypeMaster saveData={saveData} formActionType={formActionType} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} />
            </Provider>
        );

        const addBtn = screen.getByRole('button', { name: "plus Add"});
        fireEvent.click(addBtn);

        const textBox = screen.getByPlaceholderText('Enter bay type code');
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const typeName = screen.getByRole('textbox', { name: 'Bay Type Name' });
        fireEvent.change(typeName, { target: { value: 'kai' } });

        const status = screen.getByRole('switch', { name: 'Status', exact: false })
        fireEvent.click(status);

        const saveBtn = screen.getByTestId('save');
        fireEvent.click(saveBtn);

        const saveNewBtn = screen.getByTestId('save-and-new');
        fireEvent.click(saveNewBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());
        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    });

    it('add and cancel button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    BayTypeMaster: {
                        isLoaded: true, data: [{ code: "234567", name: "sdfghjkwertyu", status: true }]
                    },
                },
            },
        });
        const saveData = jest.fn();
        const formActionType = { viewMode: false }
        customRender(
            <Provider store={mockStore}>
                <BayTypeMaster saveData={saveData} formActionType={formActionType} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} />
            </Provider>
        );

        const plusAdd=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });
});