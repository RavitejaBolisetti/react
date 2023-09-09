import '@testing-library/jest-dom/extend-expect';
import AuthorityDetailCardItem from '@components/common/ManufacturerAdminstrativeHierarchy/HierarchyAuthorityDetail/AuthorityDetailCardItem';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
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
    const [actionForm] = Form.useForm();
    return <AuthorityDetailCardItem actionForm={actionForm} {...props} />;
};

const mockStore = createMockStore({
    data: {
        ManufacturerAdmin: {
            ManufactureAdminValidateToken: {
                data: [
                    { key: 1, value: 'test' },
                    { key: 2, value: 'test' },
                ],
                tokenValidationData: [
                    { key: 1, value: 'test' },
                    { key: 2, value: 'test' },
                ],
            },
        },
    },
});

describe('Authority Detail CardItem components', () => {
    it('Should render Authority Detail CardItem components', () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} viewMode={false} isEditing={false} onEdit={jest.fn()} handleDelete={jest.fn()} />
            </Provider>
        );

        const button = screen.getAllByRole('button');
        fireEvent.change(button[0]);
        fireEvent.change(button[1]);
    });
});
