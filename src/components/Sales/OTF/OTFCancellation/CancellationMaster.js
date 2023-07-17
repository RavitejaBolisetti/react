/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'antd';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { PARAM_MASTER } from 'constants/paramMaster';
import { cancellationDataActions } from 'store/actions/data/otf/otfCancellation';
import { btnVisiblity } from 'utils/btnVisiblity';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ProductHierarchy: { isLoading: isProductHierarchyLoading = false, isLoaded: isProductHierarchyLoaded = false, data: productHierarchyData = [], attributeData: productHierarchyAttributeData = [] },
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
        typeData: typeData,
        isDataLoaded,
        isLoading,
        supportingData,
        moduleTitle,
        isProductHierarchyLoading,
        productHierarchyData

    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,
            fetchProductHierarchyList: productHierarchyDataActions.fetchList,

            showGlobalNotification,
        },
        dispatch
    ),
});

const CancellationMasterBase = (props) => {
    const { accessToken, token, onFinishFailed, form, otfData, selectedOrder } = props;
    const { userId, showGlobalNotification, section, listShowLoading, uploadDocumentFile, typeData, saveData, fetchList, supportingData, fetchViewDocument } = props;
    const { formActionType, handleFormValueChange, selectedCustomerId, moduleTitle } = props;
    const { fetchProductHierarchyList, productHierarchyData, onFinishOTFCancellation } = props;

    const [uploadedFile, setUploadedFile] = useState();
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, cancelOtfBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [formData, setFormData] = useState([]);
    const [emptyList, setEmptyList] = useState(true);


    const fieldNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };
    const handleButtonClick = ({ record = null, buttonAction }) => {
        
    };

    useEffect(() => {
        if (userId) {
            fetchProductHierarchyList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    
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
        setUploadedFile,
        fieldNames,
        productHierarchyData,
        onFinishOTFCancellation
    };

    return (
            <AddEditForm {...formProps} />
    );
};

export const CancellationMaster = connect(mapStateToProps, mapDispatchToProps)(CancellationMasterBase);
