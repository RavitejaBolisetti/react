/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import customRender from '@utils/test-utils';
import ModelCard from '@components/Sales/VehicleChecklistMaster/AnswerModelForm/ModelFormCard/ModelCard';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [modelEditForm] = Form.useForm();
    const [modelForm] = Form.useForm();
    const myMock = {
        ...modelEditForm,
        ...modelForm,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn(),
    };
    return <ModelCard modelEditForm={myMock} modelForm={myMock} {...props} />;
};

describe('model form card component', () => {
    it('should render model card component', () => {
        customRender(<ModelCard />);
    });

    it('save and cancel should work', () => {
        const modelData = [{ modelGroupCode: 'model123', status: 'activeTest', internalId: 'test123', id: '12' }];
        const setModelData = jest.fn();
        customRender(<ModelCard setModelData={setModelData} modelEdit={true} isVisible={true} setModelEdit={jest.fn()} setModelSwitch={jest.fn()} forceUpdate={jest.fn()} modelData={modelData} />);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('edit and delete button should work', async () => {
        const modelData = [{ modelGroupCode: 'model123', status: 'activeTest', id: '12' }];
        const setModelData = jest.fn();
        customRender(<FormWrapper isVisible={true} modelEdit={false} setModelData={setModelData} setModelEdit={jest.fn()} forceUpdate={jest.fn()} internalId={123} modelData={modelData} setModelSwitch={jest.fn()} setFormBtnActive={jest.fn()} setuniqueCardEdit={jest.fn()} />);
        const editBtn = screen.getByTestId('edit');
        fireEvent.click(editBtn);
        const deleteBtn = screen.getByTestId('delete');
        fireEvent.click(deleteBtn);

        await waitFor(() => {
            expect(setModelData).toHaveBeenCalled();
        });
        setModelData.mock.calls[0][0]([{ internalId: 123 }]);
    });
});
