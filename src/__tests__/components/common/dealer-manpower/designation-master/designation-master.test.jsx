/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { DesignationMaster } from '@components/common/DealerManpower/DesignationMaster/DesignationMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, act } from '@testing-library/react';
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
    return <DesignationMaster form={form} {...props} />;
}

const mockStore = createMockStore({
    auth: { userId: 106 },
    data: {
        DealerManpower: {
            DesignationMaster: { isLoaded: false, isLoading: false, data: [{ key: 1, value: 'test' }, { key: 2, value: 'test' }] },
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

const filterString = {
    keyword: 'test',
    advanceFilter: true
}

describe('Designation Master components', () => {
    it('Should render Designation Master Applied Advance Filter components', () => {
        const props = {
            formActionType: { viewMode: false, editMode: false },
        }
        const divisionData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    {...props}
                    showAddButton={true}
                    divisionData={divisionData}
                />
            </Provider>
        )

        const textBox = screen.getByRole('textbox', { name: 'Designation Name' });
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const leftImg = screen.getByRole('img', { name: 'left' });
        fireEvent.click(leftImg);

        const rightImg = screen.getByRole('img', { name: 'right' });
        fireEvent.click(rightImg);

        const closeCircle = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(closeCircle);
    })

    it('Should render Designation Master components', () => {
        const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
        const props = {
            formActionType: { viewMode: false, editMode: true },
            setButtonData: jest.fn(),
            formData: { status: true, name: "test" }
        }
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    tableData={tableData}
                    handleButtonClick={jest.fn()}
                    showAddButton={true}
                    filterString={filterString}
                    buttonData={buttonData}
                    fetchList={jest.fn()}
                    saveButtonName={"Save"}
                    {...props}
                />
            </Provider>
        )

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);
    })
});