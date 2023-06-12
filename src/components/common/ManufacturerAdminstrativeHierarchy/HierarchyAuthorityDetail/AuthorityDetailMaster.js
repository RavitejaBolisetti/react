import React, { useState } from 'react';
import { Form, Divider } from 'antd';
import AuthorityDetailCardItem from './AuthorityDetailCardItem';
import { AddEditForm } from './AddEditForm';
import dayjs from 'dayjs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';

const mapStateToProps = (state) => {
    const {
        data: {
            ManufacturerAdminHierarchy: { authorityVisible, tokenNumber = [], errorMessage, isUpdating },
        },
    } = state;

    let returnValue = {
        authorityVisible,
        tokenNumber,
        errorMessage,
        isUpdating,
    };
    return returnValue;
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            errorTokenValidate: manufacturerAdminHierarchyDataActions.errorTokenValidate,
        },
        dispatch
    ),
});

const AuthorityDetailMain = ({ tokenNumber, handleFormValueChange, errorTokenValidate, viewMode, documentTypesList, setDocumentTypesList, formActionType, tokenValidate, setTokenValidate, forceUpdate }) => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [actionForm] = Form.useForm();

    const onActionFormFinish = (val) => {
        setDocumentTypesList((prev) => [...prev, { ...val, effectiveFrom: dayjs(val?.effectiveFrom).format('YYYY-MM-DD'), effectiveTo: dayjs(val?.effectiveTo).format('YYYY-MM-DD'), isModified: val?.isModified ?? false, employeeName: tokenNumber?.employeeName }]);
        actionForm.resetFields();
        errorTokenValidate('');
        forceUpdate();
    };

    return (
        <>
            <Divider />
            {!viewMode && <AddEditForm isMainForm={true} handleFormValueChange={handleFormValueChange} onFinish={onActionFormFinish} tokenValidate={tokenValidate} setTokenValidate={setTokenValidate} form={actionForm} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setDocumentTypesList={setDocumentTypesList} documentTypesList={documentTypesList} />}
            {documentTypesList?.length > 0 &&
                documentTypesList?.map((record) => {
                    return <AuthorityDetailCardItem handleFormValueChange={handleFormValueChange} record={record} formActionType={formActionType} setTokenValidate={setTokenValidate} viewMode={viewMode} form={actionForm} onFinish={onActionFormFinish} setDocumentTypesList={setDocumentTypesList} documentTypesList={documentTypesList} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} />;
                })}
        </>
    );
};
const AuthorityDetailMaster = connect(mapStateToProps, mapDispatchToProps)(AuthorityDetailMain);

export default AuthorityDetailMaster;
