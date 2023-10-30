import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import AnswerCard from 'components/Sales/VehicleChecklistMaster/AnswerModelForm/AnswerFormCard/AnswerCard';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [editForm] = Form.useForm();
    const [answerForm] = Form.useForm();
    const myMock = {
        ...editForm,
        ...answerForm,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn()
    };

    return <AnswerCard editForm={myMock} answerForm={myMock} {...props} />;
}; 

describe('Answer Card Component', () => {

    it('edit and delete button should work', async () => {
        const setAnswerData=jest.fn();
        customRender(<FormWrapper mainFomEdit={true} setAnswerData={setAnswerData} isVisible={true} setuniqueCardEdit={jest.fn()} setFormEdit={jest.fn()} setFormBtnActive={jest.fn()} setAnswerSwitch={jest.fn()} internalId={106} forceUpdate={jest.fn()} />);

        const editBtn=screen.getByTestId('edit');
        fireEvent.click(editBtn);

        const deleteBtn=screen.getByTestId('delete');
        fireEvent.click(deleteBtn);

        await waitFor(() => { expect(setAnswerData).toHaveBeenCalled() });

        setAnswerData.mock.calls[0][0]([{ internalId: 106 }]);
    });

    it('save and cancel should work', async () => {
        const answerData=[{ answerCode: 106, id: 106 }];
        const setAnswerData=jest.fn();
        customRender(<FormWrapper formEdit={true} answerData={answerData} mainFomEdit={true} id={106} uniqueCardEdit={106} setAnswerData={setAnswerData} isVisible={true} setuniqueCardEdit={jest.fn()} setFormEdit={jest.fn()} setFormBtnActive={jest.fn()} setAnswerSwitch={jest.fn()} internalId={106} forceUpdate={jest.fn()} />);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

});
