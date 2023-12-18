/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';
import { ConfirmationModal } from './ConfirmationModal';

import { cancellationDataActions } from 'store/actions/data/otf/otfCancellation';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = translateContent('vehiclePurchaseOrder.vehiclePurchaseOrderCancellation.heading.moduleTitle');

    let returnValue = {
        userId,
        accessToken,
        token,
        typeData: typeData,
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
            fetchProductHierarchyList: productHierarchyDataActions.fetchList,
            fetchDealerList: cancellationDataActions.fetchDetail,

            showGlobalNotification,
        },
        dispatch
    ),
});

const PoCancellationMasterBase = (props) => {
    const { otfData, selectedOrder, typeData, onFinishVPOCancellation, selectedRecord, setSelectedRecord } = props;
    const { productHierarchyData } = props;

    const defaultBtnVisiblity = { editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: true, cancelBtn: false, cancelOTFBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const handleButtonClick = ({ record = null, buttonAction }) => {};

    const formProps = {
        ...props,
        titleOverride: translateContent('vehiclePurchaseOrder.vehiclePurchaseOrderCancellation.heading.titleOverride'),
        otfData,
        selectedOrder,
        buttonData,
        setButtonData,
        handleButtonClick,
        typeData: typeData,
        productHierarchyData,
        onFinishVPOCancellation,
        selectedRecord,
        setSelectedRecord,
    };

    return <ConfirmationModal {...formProps} />;
};

export const PoCancellationMaster = connect(mapStateToProps, mapDispatchToProps)(PoCancellationMasterBase);
