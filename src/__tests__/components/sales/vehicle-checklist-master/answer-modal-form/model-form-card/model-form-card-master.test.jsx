/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { ModelFormCardMaster } from '@components/Sales/VehicleChecklistMaster/AnswerModelForm/ModelFormCard/ModelFormCardMaster';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const updateData = { modelGroupCode: 'test1', answerStatus: 'Active', internalId: 106, id: 106 };

const FormWrapper = (props) => {
    const [modelForm] = Form.useForm();
    const myMock = {
        ...modelForm,
        validateFields: jest.fn().mockReturnValue(Promise.resolve('test1')),
        getFieldsValue: jest.fn().mockReturnValue(Promise.resolve(updateData)),
    };

    return <ModelFormCardMaster modelForm={myMock} {...props} />;
};

const modelData = [{ modelGroupCode: '123', status: 'ok', internalId: 'test123', id: '12' }];

describe('model form card component', () => {
    it('should render model form card master component', () => {
        customRender(<ModelFormCardMaster />);
    });

    it('should render model form card master button', () => {
        customRender(<FormWrapper modelData={modelData} />);

        const modelGroupCode = screen.getByRole('combobox', { name: 'Model Group Code' });
        fireEvent.change(modelGroupCode, { target: { value: 'test12' } });
        const modelGroupStatus = screen.getByRole('switch', { name: 'Model Group Status' });
        fireEvent.click(modelGroupStatus);
        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
        const plusBtn = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn);
    });
});
