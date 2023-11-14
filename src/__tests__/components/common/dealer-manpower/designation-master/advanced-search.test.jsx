/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/common/DealerManpower/DesignationMaster/AdvancedSearch';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
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
    it('Should render Applied Advance Filter click search button components', async () => {
        const data = [{ key: 106, value: 'Kai' }];
        const filterString={
            code: 'Kai',
            departmentCode: 106,
            roleCode: 106,
        }
        customRender(
            <FormWrapper isVisible={true} filterString={filterString} filteredRoleData={data} divisionData={data} filteredDepartmentData={data} isDivisionDataLoaded={true} handleFilterChange={jest.fn()}  />
        )

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    })
});