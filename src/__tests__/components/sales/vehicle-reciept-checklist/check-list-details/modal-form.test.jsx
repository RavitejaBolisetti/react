import React from 'react';
import customRender from '@utils/test-utils';
import { ModalForm } from '@components/Sales/VehicleRecieptChecklist/CheckListDetails/ModalForm';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [aggregateForm] = Form.useForm();
    return <ModalForm aggregateForm={aggregateForm} {...props} />
}

describe('Modal form container', () => {
    const props = {
        AdvanceformData: { answerType: "boolean" },
        data: {answerFromDate: "09-09-2000", answerToDate: "09-09-2000", answerFromNumber: "434", answerToNumber: '123', answerBoolean: true}
    }
    it('Should render modal form components', () => {
        customRender(<FormWrapper isVisible={true} {...props} />)
    })
});