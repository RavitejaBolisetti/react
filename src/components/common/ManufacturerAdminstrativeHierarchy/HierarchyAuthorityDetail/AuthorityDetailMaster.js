import React, { Fragment, useState, useReducer } from 'react';
import { Form } from 'antd';
import moment from 'moment';

import AuthorityDetailCardItem from './AuthorityDetailCardItem';
import { AddEditForm } from './AddEditForm';

const AuthorityDetailMaster = ({ documentTypesList, setDocumentTypesList, selectedTreeData, viewMode }) => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [actionForm] = Form.useForm();

    const onActionFormFinish = (val) => {
        const { key } = val.authorityTypeCode;
        setDocumentTypesList((prev) => [...prev, { id: val.id, authorityEmployeeTokenNo: val.authorityEmployeeTokenNo, authorityTypeCode: key, employeeName: val.EmployeeName, effectiveFrom: moment(val?.effectiveFrom).format('YYYY-MM-DD'), effectiveTo: moment(val?.effectiveTo).format('YYYY-MM-DD'), isModified: val.isModified }]);
        actionForm.resetFields();
        forceUpdate();
    };

    return (
        <>
            {!viewMode && <AddEditForm onFinish={onActionFormFinish} form={actionForm} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setDocumentTypesList={setDocumentTypesList} />}

            {documentTypesList?.length > 0 &&
                documentTypesList?.map((action) => {
                    return <AuthorityDetailCardItem {...action} viewMode={viewMode} form={actionForm} onFinish={onActionFormFinish} setDocumentTypesList={setDocumentTypesList} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} documentTypesList={documentTypesList} authData={action} />;
                })}
        </>
    );
};

export default AuthorityDetailMaster;
