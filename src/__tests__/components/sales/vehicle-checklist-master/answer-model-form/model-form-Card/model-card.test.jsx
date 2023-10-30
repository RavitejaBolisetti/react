/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import ModelCard from '@components/Sales/VehicleChecklistMaster/AnswerModelForm/ModelFormCard/ModelCard';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [editForm] = Form.useForm();
    const myFormMock = {
        ...editForm,
        getFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <ModelCard editForm={myFormMock} {...props} />;
};

const props = {
    modelEdit: {
        IdType: 'test123',
        id: '123',
        internalId: 'test1',
    },
};

const modelData = [{ modelGroupCode: 'model123', status: 'activeTest', internalId: 'test123', id: '12' }];

describe('model form card component', () => {
    it('should render model card component', () => {
        customRender(<ModelCard />);
    });

    it('should render model card button', () => {
        customRender(<ModelCard {...props} isVisible={true} forceUpdate={jest.fn()} setModelData={jest.fn()} setModelEdit={jest.fn()} setModelSwitch={jest.fn()} modelData={modelData} setmodelData={jest.fn()} />);

        const modelGroupCode = screen.getByRole('combobox', { name: 'Model Group Code' });
        fireEvent.change(modelGroupCode, { target: { value: 'test12' } });
        const modelGroupStatus = screen.getByRole('switch', { name: 'Model Group Status' });
        fireEvent.click(modelGroupStatus);
        const plusBtn = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn);

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('Edit and delete Button should work', () => {
        customRender(<FormWrapper isVisible={true} formEdit={false} setModelData={jest.fn()} setModelEdit={jest.fn()} forceUpdate={jest.fn()} internalId={123} modelData={modelData} setModelSwitch={jest.fn()} setFormBtnActive={jest.fn()} setuniqueCardEdit={jest.fn()} />);

        const editBtn = screen.getByTestId('edit');
        fireEvent.click(editBtn);
        const deleteBtn = screen.getByTestId('delete');
        fireEvent.click(deleteBtn);
    });
});
