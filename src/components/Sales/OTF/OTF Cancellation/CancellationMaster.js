/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { PARAM_MASTER } from 'constants/paramMaster';

import { Form } from 'antd';

import { cancellationDataActions } from 'store/actions/data/otf/otfCancellation';
import { btnVisiblity } from 'utils/btnVisiblity';

import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading, data: supportingData },
            OTF: {
                OtfCancellation: { isLoaded: isCancellationLoaded = false, isLoading: isCancellationLoading, data: cancellationData },
            },
        },
    } = state;
    const moduleTitle = 'Cancel OTF';

    let returnValue = {
        userId,
        accessToken,
        token,
        typeData: typeData && typeData[PARAM_MASTER.CUST_FILES.id],
        isDataLoaded,
        isLoading,
        supportingData,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const CancellationMasterBase = (props) => {
    const { accessToken, token, onFinishFailed, form, otfData, selectedOrder } = props;
    const { userId, showGlobalNotification, section, listShowLoading, uploadDocumentFile, typeData, saveData, fetchList, supportingData, fetchViewDocument } = props;
    const { formActionType, handleFormValueChange } = props;
    const { selectedCustomerId, moduleTitle } = props;

    const [uploadedFile, setUploadedFile] = useState();
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, cancelOtfBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [formData, setFormData] = useState([]);
    const [emptyList, setEmptyList] = useState(true);



    const handleButtonClick = ({ record = null, buttonAction }) => {
        
    };
    
    const formProps = {
        ...props,
        titleOverride: moduleTitle,
        otfData,
        selectedOrder,
        buttonData,
        setButtonData,
        handleButtonClick,
        uploadDocumentFile,
        setEmptyList,
        setUploadedFile
    };

    return (
            <AddEditForm {...formProps} />
    );
};

export const CancellationMaster = connect(mapStateToProps, mapDispatchToProps)(CancellationMasterBase);
