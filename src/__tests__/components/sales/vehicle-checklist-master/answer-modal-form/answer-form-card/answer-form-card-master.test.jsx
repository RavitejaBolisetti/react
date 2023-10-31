import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { AnswerFormCardMaster } from 'components/Sales/VehicleChecklistMaster/AnswerModelForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const updateData={ answerCode: 106, answerTitle: 'Kai', answerStatus: 'Active', internalId: 106, id: 106 };

const FormWrapper = (props) => {
    const [answerForm] = Form.useForm();
    const myMock = {
        ...answerForm,
        validateFields: jest.fn().mockReturnValue(Promise.resolve('Kai')),
        getFieldsValue: jest.fn().mockReturnValue(Promise.resolve(updateData))
    };

    return <AnswerFormCardMaster answerForm={myMock} {...props} />;
}; 

describe('Answer Form Card Component', () => {

    it('should render answer form card component', () => {
        customRender(<AnswerFormCardMaster />);
    });

    it('add button should work', async () => {
        const answerData=[{ answerCode: 106, answerTitle: 'Kai', answerStatus: 'Active', internalId: 106, id: 106 }];
        const setAnswerData=jest.fn();

        customRender(<FormWrapper answerData={answerData} setAnswerData={setAnswerData} />);

        const answerStatus=screen.getByRole('switch', { name: 'Answer Status' });
        fireEvent.click(answerStatus);

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        await waitFor(() => { expect(setAnswerData).toHaveBeenCalled() })

        setAnswerData.mock.calls[0][0]('Kai');
    });

    it('should load answer card component', async () => {
        const answerData=[{ answerCode: 106, answerTitle: 'Kai', answerStatus: 'Active', internalId: 106, id: 106 }];
        const setAnswerData=jest.fn();

        customRender(<FormWrapper answerData={answerData} setAnswerData={setAnswerData} formEdit={true} id={106} isVisible={false}/>);
    }); 

});
