import '@testing-library/jest-dom/extend-expect';
import AuthorityDetailMaster from '@components/common/ManufacturerAdminstrativeHierarchy/HierarchyAuthorityDetail/AuthorityDetailMaster';
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

const mockStore = createMockStore({
    data: {
        ManufacturerAdmin: {
            ManufactureAdminValidateToken: {
                data: [
                    { key: 1, value: 'test' },
                    { key: 2, value: 'test' },
                ],
            },
        },
    },
});

const FormWrapper = (props) => {
    const [actionForm] = Form.useForm();
    return <AuthorityDetailMaster actionForm={actionForm} {...props} />;
};

describe('Authority detail master components', () => {
    it('Should render authority detail master components', () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} viewMode={false} />
            </Provider>
        );

        const authorityType = screen.getByRole('combobox', { name: 'Authority Type' });
        fireEvent.change(authorityType, { target: { value: 'kai' } });

        const token = screen.getByRole('textbox', { name: 'Token' });
        fireEvent.change(token, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);
    });

    it('Should render authority detail card item components', () => {
        const data = [
            { key: 1, value: 'test', id: 1 },
            { key: 2, value: 'test', id: 2 },
        ];
        const formActionType = { viewMode: false, isEditing: false };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} formActionType={formActionType} documentTypesList={data} viewMode={false} isEditing={true} isBtnDisabled={false} record={[{ key: 1, value: 'test' }]} setDocumentTypesList={jest.fn()} setIsBtnDisabled={jest.fn()} handleFormValueChange={jest.fn()} selectedValueOnUpdate={jest.fn()} />
            </Provider>
        );

        const button = screen.getAllByRole('button');
        fireEvent.change(button[0]);
    });
});
