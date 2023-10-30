/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AnswerCard from '@components/Sales/VehicleChecklistMaster/AnswerModelForm/AnswerFormCard/AnswerCard';
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
    return <AnswerCard editForm={myFormMock} {...props} />;
};

const props = {
    formEdit: {
        IdType: 'test123',
        id: '123',
        internalId: 'test1',
        answerStatus: 'testOk',
        answerTitle: 'test',
        answerCode: '321',
    },
};

const answerData = [{ answerCode: '123', answerTitle: 'test', answerStatus: 'activeTest', internalId: 'test123', id: '12' }];

describe('answer form card component', () => {
    it('should render answer form card component', () => {
        customRender(<AnswerCard />);
    });

    it('should render answer card button', () => {
        customRender(<AnswerCard {...props} isVisible={true} forceUpdate={jest.fn()} answerData={answerData} setAnswerData={jest.fn()} setAnswerSwitch={jest.fn()} setFormEdit={jest.fn()} />);

        const answerCode = screen.getByRole('textbox', { name: 'Answer Code' });
        fireEvent.change(answerCode, { target: { value: 'test12' } });
        const answerStatus = screen.getByRole('switch', { name: 'Answer Status' });
        fireEvent.click(answerStatus);

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('Edit and delete Button should work', () => {
        customRender(<FormWrapper isVisible={true} formEdit={false} forceUpdate={jest.fn()} answerData={answerData} internalId={123} setAnswerData={jest.fn()} setAnswerSwitch={jest.fn()} setFormBtnActive={jest.fn()} setFormEdit={jest.fn()} setuniqueCardEdit={jest.fn()} />);

        const editBtn = screen.getByTestId('edit');
        fireEvent.click(editBtn);

        const deleteBtn = screen.getByTestId('delete');
        fireEvent.click(deleteBtn);
    });
});
