import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { VehicleRecieptCheckListMaster } from '@components/Sales/VehicleRecieptChecklist/CheckListDetails/CheckListMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { Provider } from 'react-redux';


export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });
    return mockStore;
};

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    }
    return <VehicleRecieptCheckListMaster form={myFormMock} {...props} />
}


describe('Check list master container', () => {
    it('Should render Check list master view mode components', () => {
        const formActionType = { viewMode: true }
        const props = { chassisNumber: "", selectedRecord: "" }

        customRender(
            <FormWrapper {...props} formActionType={formActionType} isVisible={true} />
        )
    })

    it('Should render Check list master view add edit form components', () => {
        const formActionType = { viewMode: false }
        const data = [{key: 1, id: 1, value: 'testing'}, {key: 2, id: 2, value: 'testing'}]
        const props = { chassisNumber: "", selectedRecord: "", isEditing: true, tableData: [{key: 1, value: "test"}], checkListDataModified: data }

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleReceiptChecklist: {
                    VehicleReceiptMaster: {
                        isLoaded: false, isChecklistDataLoaded: false, isLoading: false, isChecklistDataLoading: true, data: [{ key: 1, value: 'test' }], ChecklistData: [{ key: 1, value: 'test' }]
                    },
                },
            }
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} formActionType={formActionType} isVisible={true} />
            </Provider>
        );
    })
});