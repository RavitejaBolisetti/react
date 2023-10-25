/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Form } from 'antd';
import AuthorityDetailCardItem from './AuthorityDetailCardItem';
import { AddEditForm } from './AddEditForm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ManufactureAdminValidateToken } from 'store/actions/data/manufacturerAdminHierarchy/manufactureAdminValidateToken';

const mapStateToProps = (state) => {
    const {
        data: {
            ManufacturerAdmin: {
                ManufactureAdminValidateToken: { data: tokenValidationData },
            },
        },
    } = state;

    let returnValue = {
        tokenValidationData: tokenValidationData?.userSearchResponse?.userDetails?.[0],
    };
    return returnValue;
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            resetData: ManufactureAdminValidateToken.reset,
        },
        dispatch
    ),
});

const AuthorityDetailMain = ({ tokenValidationData, handleFormValueChange, viewMode, documentTypesList, setDocumentTypesList, formActionType, tokenValidate, setTokenValidate, forceUpdate, resetData, authTypeDropdownData }) => {
    const [actionForm] = Form.useForm();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [selectedValueOnUpdate, setselectedValueOnUpdate] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [formType, setFormType] = useState('');

    const onActionFormFinish = () => {
        actionForm
            .validateFields()
            .then((val) => {
                setDocumentTypesList((prev) => [...prev, { ...val, effectiveFrom: val?.effectiveFrom, effectiveTo: val?.effectiveTo, isModified: val?.isModified ?? false, employeeName: tokenValidationData?.manufacturerUserName }]);
                actionForm.resetFields();
                forceUpdate();
                resetData();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            {!viewMode && <AddEditForm isMainForm={true} handleFormValueChange={handleFormValueChange} onFinish={onActionFormFinish} tokenValidate={tokenValidate} setTokenValidate={setTokenValidate} form={actionForm} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setDocumentTypesList={setDocumentTypesList} documentTypesList={documentTypesList} selectedValueOnUpdate={selectedValueOnUpdate} setselectedValueOnUpdate={setselectedValueOnUpdate} errorMessage={errorMessage} setErrorMessage={setErrorMessage} formType={formType} setFormType={setFormType} />}
            {documentTypesList?.length > 0 &&
                documentTypesList?.map((record, i) => {
                    return (
                        <AuthorityDetailCardItem
                            key={i}
                            handleFormValueChange={handleFormValueChange}
                            record={record}
                            formActionType={formActionType}
                            setTokenValidate={setTokenValidate}
                            viewMode={viewMode}
                            form={actionForm}
                            onFinish={onActionFormFinish}
                            setDocumentTypesList={setDocumentTypesList}
                            documentTypesList={documentTypesList}
                            forceUpdate={forceUpdate}
                            setIsBtnDisabled={setIsBtnDisabled}
                            isBtnDisabled={isBtnDisabled}
                            selectedValueOnUpdate={selectedValueOnUpdate}
                            setselectedValueOnUpdate={setselectedValueOnUpdate}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                            formType={formType}
                            setFormType={setFormType}
                            resetData={resetData}
                            isMainForm={false}
                            authTypeDropdownData={authTypeDropdownData}
                        />
                    );
                })}
        </>
    );
};
const AuthorityDetailMaster = connect(mapStateToProps, mapDispatchToProps)(AuthorityDetailMain);

export default AuthorityDetailMaster;
