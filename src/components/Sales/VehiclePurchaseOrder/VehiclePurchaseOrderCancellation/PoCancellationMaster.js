/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { ConfirmationModal } from './ConfirmationModal';


import { cancellationDataActions } from 'store/actions/data/otf/otfCancellation';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { BASE_URL_OTF_CANCELLATION_DEALER_SEARCH as customURL } from 'constants/routingApi';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ProductHierarchy: { isLoading: isProductHierarchyLoading = false, isLoaded: isProductHierarchyLoaded = false, data: productHierarchyData = [], attributeData: productHierarchyAttributeData = [] },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading, data: supportingData },
            OTF: {
                OtfCancellation: { detailData: dealerDataList },
            },
        },
    } = state;

    const moduleTitle = 'Cancel PO';

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
        productHierarchyData,
        dealerDataList,
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
            fetchDealerList: cancellationDataActions.fetchDetail,

            showGlobalNotification,
        },
        dispatch
    ),
});

const PoCancellationMasterBase = (props) => {
    const { otfData, selectedOrder,typeData,onFinishVPOCancellation,selectedRecord, setSelectedRecord,  } = props;
    const { userId, listShowLoading, onFinishFailed } = props;
    const { fetchProductHierarchyList, productHierarchyData, fetchDealerList, dealerDataList } = props;

    const defaultBtnVisiblity = { editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: true, cancelBtn:false, cancelOTFBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const handleButtonClick = ({ record = null, buttonAction }) => {};

    console.log('selectedRecord',selectedRecord); 
    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
   
    useEffect(() => {
        if (userId) {
            fetchProductHierarchyList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    
        
    const formProps = {
        ...props,
        //  titleOverride: moduleTitle,
        titleOverride: 'Vehicle Purchase Order Cancellation',
        otfData,
        selectedOrder,
        buttonData,
        setButtonData,
        handleButtonClick,
        typeData: typeData,
        productHierarchyData,                
        dealerDataList,  
        onFinishVPOCancellation,
        selectedRecord,
        setSelectedRecord,
        
        
    };


   

    return <ConfirmationModal {...formProps} />;
    
    // <AddEditForm {...formProps} />;
};

export const PoCancellationMaster = connect(mapStateToProps, mapDispatchToProps)(PoCancellationMasterBase);
