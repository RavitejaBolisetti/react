/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/common/DealerManpower/DesignationMaster/AdvancedSearch';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
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
    const [advanceFilterForm] = Form.useForm();
    const myFormMock = {
        ...advanceFilterForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AdvancedSearch advanceFilterForm={myFormMock} {...props} />;
}


describe('List Employee Department Master components', () => {
    it('Should render Applied Advance Filter click search button components', () => {
        const applicableToData = [{ key: 1, value: 'test' }, { key: 2, value: 'test1' }]
        customRender(
            <FormWrapper
                isVisible={true}
                filteredDepartmentData={applicableToData}
                divisionData={applicableToData}
                filteredRoleData={applicableToData}
                handleFilterChange={jest.fn()}
            />
        )
        const departmentName = screen.getByRole('combobox', { name: 'Department Name' });
        fireEvent.change(departmentName, { target: { value: 'kai' } });

        const divisionName = screen.getByRole('combobox', { name: 'Division Name' });
        fireEvent.change(divisionName, { target: { value: 'kai' } });

        const designationName = screen.getByRole('textbox', { name: 'Designation Name' });
        fireEvent.change(designationName, { target: { value: 'kai' } });

        const roleName = screen.getByRole('combobox', { name: 'Role Name' });
        fireEvent.change(roleName, { target: { value: 'kai' } });

        const searchBtn = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchBtn);
    })
});