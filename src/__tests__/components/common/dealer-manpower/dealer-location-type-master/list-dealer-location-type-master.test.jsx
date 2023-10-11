/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { ListDealerLocationTypeMaster } from '@components/common/DealerManpower/DealerLocationTypeMaster/ListDealerLocationTypeMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

jest.mock('store/actions/data/dealerManpower/dealerLocationTypeMaster', () => ({
    dealerManpowerLocationTypeMasterDataActions: {},
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

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <ListDealerLocationTypeMaster form={form} {...props} />;
}

const dealerLocationData = [{ "locationCode": "678", "locationDescription": "ali", "status": true, "applicableTo": "Workshop" }, { "locationCode": "672", "locationDescription": "ali", "status": true, "applicableTo": "Workshop" }]

const mockStore = createMockStore({
    auth: { userId: 106 },
    data: {
        DealerManpower: {
            DealerLocationTypeMaster: { isLoaded: false, isLoading: false, data: dealerLocationData },
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
};


describe('List Dealer location type master components', () => {
    it('Should render Dealer location type master Applied Advance Filter components', () => {
        const props = {
            formActionType: { viewMode: false, editMode: false },
        }

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    {...props}
                    fetchList={jest.fn()}
                />
            </Provider>
        )

        const textBox = screen.getByRole('textbox', { name: 'Location Type Name' });
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const closeCircle = screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeCircle);

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);
    })


    it('refresh button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DealerLocationTypeMaster: {
                        isLoaded: true,
                        data: [{ locationCode: "678", locationDescription: "ali", status: true, applicableTo: "Workshop" }],
                    }
                },
            },
        });
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListDealerLocationTypeMaster fetchList={fetchList} tableData={dealerLocationData} />
            </Provider>
        );

        await waitFor(() => { expect(screen.getByText('ali')).toBeInTheDocument() });
        const refreshbutton = screen.getByRole('button', { name: '', exact: false });
        fireEvent.click(refreshbutton);

        fetchList.mock.calls[0][0].onSuccessAction();

    });

    it('Should render Dealer location type master components', async() => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DealerLocationTypeMaster: {
                        isLoaded: true,
                        data: [{ locationCode: "678", locationDescription: "ali", status: true, applicableTo: "Workshop" }],
                    }
                },
            },
        });

        const res = {
            data: [{
                departmentCode: "DC98",
                departmentName: "Employee",
                divisionCode: "C",
                divisionName: "COMMON",
                status: true
            }]
        };

        const saveData= jest.fn()
        customRender(
            <Provider store={mockStore}>
                <ListDealerLocationTypeMaster isVisible={true}
                    saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()}
                    saveButtonName={"Save"}
                />
            </Provider>
        )

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);

        const applicationTo = screen.getByRole('combobox', { name: "Applicable To", exact: false })
        fireEvent.change(applicationTo, { target: { value: 'kai' } });

        const locationType = screen.getByRole('textbox', { name: 'Location Type Code', exact: false });
        fireEvent.change(locationType, { target: { value: 'kai' } });

        const locationTypeName = screen.getByPlaceholderText('Enter location type name');
        fireEvent.change(locationTypeName, { target: { value: 'kai' } });

        const status = screen.getByRole('switch', { name: 'Status', exact: false })
        fireEvent.click(status);

        const saveBtn = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());
        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    })

    it('Should render Dealer location type master close components', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DealerLocationTypeMaster: {
                        isLoaded: true,
                        data: [{ locationCode: "678", locationDescription: "ali", status: true, applicableTo: "Workshop" }],
                    }
                },
            },
        });
        const saveData= jest.fn()
        customRender(
            <Provider store={mockStore}>
                <ListDealerLocationTypeMaster isVisible={true}
                    saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()}
                    saveButtonName={"Save"}
                />
            </Provider>
        )

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    })

    it('Should render Dealer location type master cancel components', () => {

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DealerLocationTypeMaster: {
                        isLoaded: true,
                        data: [{ locationCode: "678", locationDescription: "ali", status: true, applicableTo: "Workshop" }],
                    }
                },
            },
        });
        const saveData= jest.fn()
        customRender(
            <Provider store={mockStore}>
                <ListDealerLocationTypeMaster isVisible={true}
                    saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()}
                    saveButtonName={"Save"}
                />
            </Provider>
        )
        const plusAddBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAddBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    })

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerLocationTypeMaster: {
                        isLoaded: true,
                        data: [{ locationCode: "678", locationDescription: "ali", status: true, applicableTo: "Workshop" }],
                    }
                },
            },
        });

        const saveData = jest.fn();

        const res = {
            data: [{
                departmentCode: "DC98",
                departmentName: "Employee",
                divisionCode: "C",
                divisionName: "COMMON",
                status: true
            }]
        };

        customRender(
            <Provider store={mockStore}>
                <ListDealerLocationTypeMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const editBtn = screen.getByRole('button', { name: /fa-edit/i });
        fireEvent.click(editBtn);

        const status = screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const saveBtn = screen.getByRole('button', { name: /Save/i });
        fireEvent.click(saveBtn);
    });

});