import React, { Fragment, useState, useReducer } from 'react';
import { Form, } from 'antd';
import AuthorityCard from './AuthorityCard';
import { AuthorityForm } from './AuthorityForm';
import moment from 'moment';

const AuthorityDetail = ({documentTypesList, setDocumentTypesList}) => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [actionForm] = Form.useForm();

    const onActionFormFinish = (val) => {
        const { key} = val.authorityTypeCode;
        setDocumentTypesList((prev) => [...prev, { authorityEmployeeTokenNo: val.authorityEmployeeTokenNo, authorityTypeCode: key, employeeName : val.EmployeeName, effectiveFrom: moment(val?.effectiveFrom).format('DD/MM/YYYY'), effectiveTo: moment(val?.effectiveTo).format('DD/MM/YYYY') }]);
        actionForm.resetFields();
        forceUpdate();
    };

    return (
        <>
            {/* main form(top form) */}
            <AuthorityForm onFinish={onActionFormFinish} form={actionForm} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setDocumentTypesList={setDocumentTypesList} />

            {/* card with form */}
            {documentTypesList.length > 0 &&
                documentTypesList.map((action) => {
                    return <AuthorityCard {...action} form={actionForm} onFinish={onActionFormFinish} setDocumentTypesList={setDocumentTypesList} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled}
                    documentTypesList={documentTypesList}
                    />;
                })}
        </>
    );
};

export default AuthorityDetail;
