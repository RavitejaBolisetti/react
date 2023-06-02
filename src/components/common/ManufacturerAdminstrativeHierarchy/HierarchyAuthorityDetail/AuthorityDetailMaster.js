import React, { useState, useReducer } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import AuthorityDetailCardItem from './AuthorityDetailCardItem';
import { AddEditForm } from './AddEditForm';
import dayjs from 'dayjs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';


const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            errorTokenValidate: manufacturerAdminHierarchyDataActions.errorTokenValidate,
        },
        dispatch
    ),
});

const AuthorityDetailMain = ({handleFormValueChange, errorTokenValidate,  viewMode, documentTypesList, setDocumentTypesList, formActionType, tokenValidate, setTokenValidate, forceUpdate}) => {
    console.log('🚀 ~ file: AuthorityDetailMaster.js:8 ~ AuthorityDetailMaster ~ viewMode:', viewMode);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    // const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [actionForm] = Form.useForm();

    const onActionFormFinish = (val) => {
        console.log('onActionFormFinish val',val)
        console.log("date ==> ",dayjs(val?.effectiveFrom).format('YYYY-MM-DD'), moment(dayjs(val?.effectiveTo)).format('YYYY-MM-DD'))
        // const { key } = val.authorityTypeCode;
        setDocumentTypesList((prev) => [...prev, { ...val, effectiveFrom: dayjs(val?.effectiveFrom).format('YYYY-MM-DD'), effectiveTo: dayjs(val?.effectiveTo).format('YYYY-MM-DD'), isModified: val?.isModified ?? false }]);
        // setDocumentTypesList((prev) => [...prev, { id: val?.id, authorityEmployeeTokenNo: val?.authorityEmployeeTokenNo, authorityTypeCode: authorityTypeCode, employeeName: val?.employeeName, effectiveFrom: moment(val?.effectiveFrom).format('YYYY-MM-DD'), effectiveTo: moment(val?.effectiveTo).format('YYYY-MM-DD'), isModified: val?.isModified ?? false}]);
        actionForm.resetFields();
        errorTokenValidate('')
        forceUpdate();
    };

    return (
        <>
            {!viewMode && <AddEditForm handleFormValueChange={handleFormValueChange} onFinish={onActionFormFinish} tokenValidate={tokenValidate} setTokenValidate={setTokenValidate} form={actionForm} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setDocumentTypesList={setDocumentTypesList} />}

            {documentTypesList?.length > 0 &&
                documentTypesList?.map((record) => {
                    return <AuthorityDetailCardItem handleFormValueChange={handleFormValueChange} record={record} formActionType={formActionType} setTokenValidate={setTokenValidate} viewMode={viewMode} form={actionForm} onFinish={onActionFormFinish} setDocumentTypesList={setDocumentTypesList} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} documentTypesList={documentTypesList} />;
                })}
        </>
    );
};
const AuthorityDetailMaster =  connect(null , mapDispatchToProps)(AuthorityDetailMain);

export default AuthorityDetailMaster;
