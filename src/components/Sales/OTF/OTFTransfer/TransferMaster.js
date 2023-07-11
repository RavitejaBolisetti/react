/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { PARAM_MASTER } from 'constants/paramMaster';

import { Form } from 'antd';

import { cancellationDataActions } from 'store/actions/data/otf/otfCancellation';
import { btnVisiblity } from 'utils/btnVisiblity';

import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { salesConsultantActions } from 'store/actions/data/otf/salesConsultant';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ApplicationMaster: { dealerLocations = [] },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading, data: supportingData },
            OTF: {
                OtfCancellation: { isLoaded: isCancellationLoaded = false, isLoading: isCancellationLoading, data: cancellationData },
                salesConsultantLov: { isLoaded: isSalesConsultantDataLoaded, data: salesConsultantLov = [] },
            },
        },
    } = state;
    const moduleTitle = 'Transfer OTF';

    let returnValue = {
        userId,
        accessToken,
        token,
        typeData: typeData && typeData[PARAM_MASTER.TRNSFER_REASON.id],
        isDataLoaded,
        isLoading,
        supportingData,
        moduleTitle,
        salesConsultantLov,
        dealerLocations,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDealerLocations: applicationMasterDataActions.fetchDealerLocations,
            locationDataLoding: applicationMasterDataActions.locationDataLoding,

            fetchSalesConsultant: salesConsultantActions.fetchList,
            listConsultantShowLoading: salesConsultantActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const TransferMasterBase = (props) => {
    const { accessToken, token, onFinishFailed, form, otfData, selectedOrder, fetchSalesConsultant, listConsultantShowLoading, fetchDealerLocations, dealerLocations, locationDataLoding } = props;
    const { userId, showGlobalNotification, section, typeData, salesConsultantLov  } = props;
    const { formActionType, handleFormValueChange } = props;
    const { selectedCustomerId, moduleTitle } = props;

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, cancelOtfBtn: false, transferOtfBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const handleButtonClick = ({ record = null, buttonAction }) => {
    };
    
    useEffect(() => {
        if (userId) {
            fetchSalesConsultant({ setIsLoading: listConsultantShowLoading, userId });
            fetchDealerLocations({ setIsLoading: locationDataLoding, userId });
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
        salesConsultantLov,
        dealerLocations,
    };

    return (
            <AddEditForm {...formProps} />
    );
};

export const TransferMaster = connect(mapStateToProps, mapDispatchToProps)(TransferMasterBase);
