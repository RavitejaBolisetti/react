import React from 'react';
import { MakeCheckResult, BindFormItems } from '@components/Sales/VehicleRecieptChecklist/CheckListDetails/CheckListUtils';
import customRender from '@utils/test-utils';
    import { Form } from 'antd';

    const FormWrapper = (props) => {
        const [aggregateForm] = Form.useForm();
        return <BindFormItems aggregateForm={aggregateForm} {...props} />
    }

describe('Check list master container', () => {
    it('Should render Check list master DATE components', () => {
        const props = {
            data: { answerFromDate: "09-09-2000", answerToDate: "09-09-2000" }
        }
        customRender(
            <MakeCheckResult {...props} type={"date"} />
        )
    })

    it('Should render Check list master DATE false components', () => {
        const props = {
            data: {}
        }
        customRender(
            <MakeCheckResult {...props} type={"date"} />
        )
    })

    it('Should render Check list master BOOLEAN true components', () => {
        const props = {
            data: { answerFromDate: "09-09-2000", answerToDate: "09-09-2000", answerBoolean: true }
        }
        customRender(
            <MakeCheckResult {...props} type={"boolean"} />
        )
    })

    it('Should render Check list master BOOLEAN false components', () => {
        const props = {
            data: { answerFromDate: "09-09-2000", answerToDate: "09-09-2000", answerBoolean: false }
        }
        customRender(
            <MakeCheckResult {...props} type={"boolean"} />
        )
    })

    it('Should render Check list master BOOLEAN false components', () => {
        const props = {
            data: { answerFromDate: "09-09-2000", answerToDate: "09-09-2000", answerBoolean: "" }
        }
        customRender(
            <MakeCheckResult {...props} type={"boolean"} />
        )
    })

    it('Should render Check list master NUMBER components', () => {
        const props = {
            data: { answerFromDate: "09-09-2000", answerToDate: "09-09-2000", answerFromNumber: "434", answerToNumber: '123' }
        }
        customRender(
            <MakeCheckResult {...props} type={"number"} />
        )
    })

    it('Should render Check list master INPUT components', () => {
        const props = {
            data: { answerFromDate: "09-09-2000", answerToDate: "09-09-2000" }
        }
        customRender(
            <MakeCheckResult {...props} answerType={"text"} />
        )
    })

    it('Should render Bind Form Items components', () => {
        const props = {
            AdvanceformData: { answerType: "text" }
        }
        customRender(
            <BindFormItems {...props} />
        )
    })

    it('Should render Bind Form Items NUMBER components', () => {
        const props = {
            AdvanceformData: { answerType: "number" }
        }
        customRender(
            <FormWrapper {...props} />
        )
    })

    it('Should render Bind Form Items BOOLEAN components', () => {
        const props = {
            AdvanceformData: { answerType: "boolean" }
        }
        customRender(
            <FormWrapper {...props} />
        )
    })

    it('Should render Bind Form Items DATE components', () => {
        const props = {
            AdvanceformData: { answerType: "date" }
        }
        customRender(
            <FormWrapper {...props} />
        )
    })
});