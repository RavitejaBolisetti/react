/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AnswerFormCardMaster } from '@components/Sales/VehicleChecklistMaster/AnswerModelForm/AnswerFormCard/AnswerFormCardMaster';
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
        validateFields: jest.fn(),
    };
    return <AnswerFormCardMaster editForm={myFormMock} {...props} />;
};

const answerData = [{ answerCode: '123', answerTitle: 'test', answerStatus: 'activeTest', internalId: 'test123', id: '12' }];

describe('answer form card component', () => {
    it('should render answer form card master component', () => {
        customRender(<AnswerFormCardMaster />);
    });

    it('should render answer form card master button', () => {
        customRender(<FormWrapper answerData={answerData} />);

        const answerCode = screen.getByRole('textbox', { name: 'Answer Code' });
        fireEvent.change(answerCode, { target: { value: 'test12' } });
        const answerDescription = screen.getByRole('textbox', { name: 'Answer Description' });
        fireEvent.change(answerDescription, { target: { value: 'test12' } });

        const answerStatus = screen.getByRole('switch', { name: 'Answer Status' });
        fireEvent.click(answerStatus);
        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
        const plusBtn = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn);
    });
});
