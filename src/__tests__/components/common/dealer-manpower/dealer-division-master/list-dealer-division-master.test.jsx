/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { ListDealerDivisionMaster } from '@components/common/DealerManpower/DealerDivisionMaster/ListDealerDivisionMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

jest.mock('store/actions/data/dealerManpower/dealerDivisionMaster', () => ({
    dealerManpowerDivisionMasterDataActions: {},
}));

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });
    return mockStore;
};

afterEach(() => {
    jest.restoreAllMocks();
});

let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

afterEach(() => {
    assignMock.mockClear();
});

const buttonData = {
    closeBtn: false,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: false,
    formBtnActive: false,
};

describe('Dealer division master components', () => {
    it('Should render Dealer division Applied Advance Filter components', () => {
        const formActionType = { viewMode: false, editMode: false }
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerDivisionMaster: {
                        isLoaded: true, data: [{ code: "234567", name: "sdfghjkwertyu", status: true }]
                    },
                },
            },
        })

        customRender(
            <Provider store={mockStore}>
                <ListDealerDivisionMaster
                    isVisible={true}
                    fetchList={jest.fn()}
                    formActionType={formActionType}
                />
            </Provider>
        )

        const textBox = screen.getByRole('textbox', { name: 'Division Name' });
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const closeImg = screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeImg);

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);
    })

    it('refresh button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DealerDivisionMaster: {
                        isLoaded: true,
                        data: [{ code: "234567", name: "sdfghjkwertyu", status: true }],
                    }
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListDealerDivisionMaster fetchList={fetchList} />
            </Provider>
        );

        const refreshbutton = screen.getByRole('button', { name: '', exact: false });
        fireEvent.click(refreshbutton);

        fetchList.mock.calls[0][0].onSuccessAction();
    });

    it('Should render dealer division add edit form components', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerDivisionMaster: {
                        isLoaded: true, data: [{ code: "234567", name: "sdfghjkwertyu", status: true }]
                    },
                },
            },
        });

        const saveData = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <ListDealerDivisionMaster
                    isVisible={true}
                    saveData={saveData}
                    setIsFormVisible={jest.fn()}
                    handleButtonClick={jest.fn()}
                    fetchList={jest.fn()}
                    resetData={jest.fn()}
                    buttonData={buttonData}
                    setButtonData={jest.fn()}
                    isDataLoaded={false}
                />
            </Provider>
        )

        const plusAddBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAddBtn);

        const textBox = screen.getByPlaceholderText('Enter division code');
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const typeName = screen.getByRole('textbox', { name: 'Division Name' });
        fireEvent.change(typeName, { target: { value: 'kai' } });

        const status = screen.getByRole('switch', { name: 'Status', exact: false })
        fireEvent.click(status);

        const saveBtn = screen.getByTestId('save');
        fireEvent.click(saveBtn);

        const saveNewBtn = screen.getByTestId('save-and-new');
        fireEvent.click(saveNewBtn);
    })

    it('Should render dealer division add edit form close components', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerDivisionMaster: {
                        isLoaded: true, data: [{ code: "234567", name: "sdfghjkwertyu", status: true }]
                    },
                },
            },
        });

        const saveData = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <ListDealerDivisionMaster
                    isVisible={true}
                    saveData={saveData}
                    setIsFormVisible={jest.fn()}
                    handleButtonClick={jest.fn()}
                    fetchList={jest.fn()}
                    resetData={jest.fn()}
                    buttonData={buttonData}
                    setButtonData={jest.fn()}
                    isDataLoaded={false}
                />
            </Provider>
        )

        const plusAddBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAddBtn);

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false });
        fireEvent.click(closeBtn);
    })

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerDivisionMaster: {
                        isLoaded: true, data: [{ code: "234567", divisionName: "sdfghjkwertyu", status: true }]
                    },
                },
            },
        });

        const saveData = jest.fn();

        const res = { data: [{ code: "234567", divisionName: "sdfghjkwertyu", status: true }] };

        customRender(
            <Provider store={mockStore}>
                <ListDealerDivisionMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const editBtn = screen.getByRole('button', { name: /fa-edit/i });
        fireEvent.click(editBtn);

        const status = screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const saveBtn = screen.getByRole('button', { name: /Save/i });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());
        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    });
});