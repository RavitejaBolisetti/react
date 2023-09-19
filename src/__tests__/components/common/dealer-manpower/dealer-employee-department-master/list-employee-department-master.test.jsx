/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { ListEmployeeDepartmentMaster } from '@components/common/DealerManpower/DealerEmployeeDepartmentMaster/ListEmployeeDepartmentMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

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
    return <ListEmployeeDepartmentMaster form={form} {...props} />;
}

// const mockStore = createMockStore({
//     auth: { userId: 106 },
//     data: {
//         DealerManpower: {
//             DealerDivisionMaster: { isLoaded: false, isLoading: false, data: [{ key: 1, value: 'test' }, { key: 2, value: 'test' }] },
//             DealerEmployeeDepartmentMaster: { isLoaded: false, isDataLoaded: false, isLoading: false, data: [{ key: 1, value: 'test' }, { key: 2, value: 'test' }] },
//         },
//     },
// });

const buttonData = {
    closeBtn: false,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: false,
    formBtnActive: false,
};


describe('List Employee Department Master components', () => {
    it.only('Should render Applied Advance Filter click search button components', () => {

        const formActionType = { viewMode: false, editMode: false }
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true, data: [{
                            departmentCode: "DC98",
                            departmentName: "Employee",
                            divisionCode: "C",
                            divisionName: "COMMON",
                            status: true
                        }]
                    },
                    DealerDivisionMaster: { isFilteredListLoaded: true, divisionData: [{ code: "234567", name: "sdfghjkwertyu", status: true }] }
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ListEmployeeDepartmentMaster
                    isVisible={true}
                    formActionType={formActionType}
                />
            </Provider>
        )

        const filter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filter);

        // const divisionName = screen.getByRole('combobox', { name: "Division Name" })
        // fireEvent.change(divisionName, { target: { value: "testing" } })

        // const departmentName = screen.getByRole('textbox', { name: "Department Name" })
        // fireEvent.change(departmentName, { target: { value: "testing" } })

        // const searchBtn = screen.getByRole('button', { name: 'Search' });
        // fireEvent.click(searchBtn);

        screen.debug()
        screen.getByRole('')

    })


    it('Should render Applied Advance Filter click reset button components', () => {

        const formActionType = { viewMode: false, editMode: false }
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true, data: [{
                            departmentCode: "DC98",
                            departmentName: "Employee",
                            divisionCode: "C",
                            divisionName: "COMMON",
                            status: true
                        }]
                    },
                    DealerDivisionMaster: { isFilteredListLoaded: true, divisionData: [{ code: "234567", name: "sdfghjkwertyu", status: true }] }
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ListEmployeeDepartmentMaster
                    isVisible={true}
                    formActionType={formActionType}
                />
            </Provider>
        )

        const filter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filter);

        // const divisionName = screen.getByRole('combobox', { name: "Division Name" })
        // fireEvent.change(divisionName, { target: { value: "testing" } })

        // const resetBtn = screen.getByRole('button', { name: 'Reset' });
        // fireEvent.click(resetBtn);


        // screen.debug()
        // screen.getByRole('')


        // const textBox = screen.getByRole('textbox', { name: 'Department Name' });
        // fireEvent.change(textBox, { target: { value: 'kai' } });

        // const searchImg = screen.getByRole('img', { name: 'search' });
        // fireEvent.click(searchImg);

        // const filter = screen.getByRole('button', { name: 'Advanced Filters' });
        // fireEvent.click(filter);

        // const clear = screen.getByRole('button', { name: 'Clear' });
        // fireEvent.click(clear);

        // const plusImg = screen.getByRole('img', { name: 'plus' });
        // fireEvent.click(plusImg);
    })

    // it('Should render Employee Department Master components', () => {
    //     const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
    //     const props = {
    //         formActionType: { viewMode: false, editMode: true },
    //         setButtonData: jest.fn(),
    //         formData: { status: true, name: "test" }
    //     }
    //     customRender(
    //         <Provider store={mockStore}>
    //             <FormWrapper isVisible={true}
    //                 tableData={tableData}
    //                 handleButtonClick={jest.fn()}
    //                 showAddButton={true}
    //                 filterString={filterString}
    //                 buttonData={buttonData}
    //                 fetchList={jest.fn()}
    //                 saveButtonName={"Save"}
    //                 {...props}
    //             />
    //         </Provider>
    //     )

    //     const plusImg = screen.getByRole('img', { name: 'plus' });
    //     fireEvent.click(plusImg);

    //     const divisionName = screen.getByRole('combobox', { name: 'Division Name' });
    //     fireEvent.change(divisionName, { target: { value: 'kai' } });

    // })

    // it('Should render Employee Department Master submit components', () => {
    //     const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
    //     const props = {
    //         formActionType: { viewMode: false, editMode: true },
    //         setButtonData: jest.fn(),
    //         formData: { status: true, name: "test" }
    //     }
    //     customRender(
    //         <Provider store={mockStore}>
    //             <FormWrapper isVisible={true}
    //                 tableData={tableData}
    //                 handleButtonClick={jest.fn()}
    //                 showAddButton={true}
    //                 filterString={filterString}
    //                 buttonData={buttonData}
    //                 fetchList={jest.fn()}
    //                 saveButtonName={"Save"}
    //                 {...props}
    //             />
    //         </Provider>
    //     )

    //     const plusImg = screen.getByRole('img', { name: 'plus' });
    //     fireEvent.click(plusImg);

    //     const saveBtn = screen.getByRole('button', { name: 'Save' });
    //     fireEvent.click(saveBtn);

    //     const saveNewBtn = screen.getByRole('button', { name: 'Save & Add New' });
    //     fireEvent.click(saveNewBtn);
    // })

    // it('Should render Employee Department Master cancel components', () => {
    //     const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
    //     const props = {
    //         formActionType: { viewMode: false, editMode: true },
    //         setButtonData: jest.fn(),
    //         formData: { status: true }
    //     }
    //     customRender(
    //         <Provider store={mockStore}>
    //             <FormWrapper isVisible={true}
    //                 tableData={tableData}
    //                 handleButtonClick={jest.fn()}
    //                 showAddButton={true}
    //                 filterString={filterString}
    //                 buttonData={buttonData}
    //                 fetchList={jest.fn()}
    //                 saveButtonName={"Save"}
    //                 {...props}
    //             />
    //         </Provider>
    //     )

    //     const plusImg = screen.getByRole('img', { name: 'plus' });
    //     fireEvent.click(plusImg);

    //     const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    //     fireEvent.click(cancelBtn);

    // })

    // it('Should render Employee Department Master close components', () => {
    //     const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
    //     const props = {
    //         formActionType: { viewMode: false, editMode: true },
    //         setButtonData: jest.fn(),
    //         formData: { status: true }
    //     }
    //     customRender(
    //         <Provider store={mockStore}>
    //             <FormWrapper isVisible={true}
    //                 tableData={tableData}
    //                 handleButtonClick={jest.fn()}
    //                 showAddButton={true}
    //                 filterString={filterString}
    //                 buttonData={buttonData}
    //                 fetchList={jest.fn()}
    //                 saveButtonName={"Save"}
    //                 {...props}
    //             />
    //         </Provider>
    //     )

    //     const plusImg = screen.getByRole('img', { name: 'plus' });
    //     fireEvent.click(plusImg);

    //     const closeBtn = screen.getByRole('button', { name: 'Close' });
    //     fireEvent.click(closeBtn);
    // })
});