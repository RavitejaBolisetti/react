/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/DealerManpower/RoleMaster/AddEditForm';
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

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
}

describe('List Role Master add edit form components', () => {
    it('Should render role master view components', () => {
        const props = {
            formActionType: { viewMode: true, editMode: false }
        }
        customRender(<FormWrapper {...props} isVisible={true} />)

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false })
        fireEvent.click(closeBtn)

    })

    it('Should render role master add edit form components', () => {
        const props = {
            formActionType: { viewMode: false, editMode: true }
        }

        const roleData = [
            {
                departmentCode
                    : "DC98",
                departmentName
                    : "Employee",
                divisionCode
                    : "C",
                divisionName
                    : "COMMON",
                roleCode
                    : "RL0011",
                roleDescription
                    : "dealer roless",
                status
                    : true
            }
        ]

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: { isLoaded: false, data: roleData },
                    DealerDivisionMaster: { divisionData: [{ code: "234567", name: "sdfghjkwertyu", status: true }] },
                    DealerEmployeeDepartmentMaster: { filteredDepartmentData: [] },
                },
            },
        });

        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()
        const fetchDepartmentLovList = jest.fn()

        const formData = { status: true, divisionCode: "test" }
        const divisionData = [{ key: 1, value: 'test', parentKey: "test" }, { key: 2, value: 'test1', parentKey: "test" }]
        const filteredDepartmentData= [{ key: 1, value: 'test' }, { key: 2, value: 'test1' }]

        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props}
                    isVisible={true}
                    divisionData={divisionData}
                    filteredDepartmentData={filteredDepartmentData}
                    fetchList={fetchList}
                    fetchDivisionLovList={fetchDivisionLovList}
                    fetchDepartmentLovList={fetchDepartmentLovList}
                    formData={formData}
                    />
            </Provider>
        )

        const divisionName = screen.getByRole('combobox', { name: "Division Name" });
        fireEvent.change(divisionName, { target: { value: 'hello testing for search1' } });

        const clearBtn = screen.getByRole('button', { name: 'Close', exact: false });
        fireEvent.click(clearBtn);
    })

});