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

import { salesConsultantActions } from 'store/actions/data/otf/salesConsultant';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { BASE_URL_APPLICATION_DEALER_LOCATION as customURL } from 'constants/routingApi';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        common: {
            Header: {
                data: { parentGroupCode, dealerLocations: dealerLocation = [] },
            },
        },
        data: {
            ApplicationMaster: { dealerLocations = [] },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                salesConsultantLov: { isLoaded: isSalesConsultantDataLoaded, isLoading: isSalesConsultantLoading, detailData: salesConsultantLov = [] },
            },
        },
    } = state;
    const moduleTitle = translateContent('global.buttons.transferBooking');

    let returnValue = {
        userId,
        accessToken,
        token,
        typeData: typeData && typeData[PARAM_MASTER.TRNSFER_REASON.id],
        moduleTitle,
        isSalesConsultantDataLoaded,
        salesConsultantLov,
        isSalesConsultantLoading,
        dealerLocations,
        dealerLocation,
        parentGroupCode,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDealerLocations: applicationMasterDataActions.fetchDealerLocations,
            locationDataLoding: applicationMasterDataActions.locationDataLoding,

            fetchSalesConsultant: salesConsultantActions.fetchDetail,
            reset: salesConsultantActions.reset,
            listConsultantShowLoading: salesConsultantActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const TransferMasterBase = (props) => {
    const { otfData, selectedOrder, fetchSalesConsultant, listConsultantShowLoading, fetchDealerLocations, dealerLocations, dealerLocation, locationDataLoding, parentGroupCode } = props;
    const { userId, salesConsultantLov, reset } = props;
    const { moduleTitle, otfTransferForm } = props;

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, transferOTFBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultDealerLocationCode = dealerLocation?.find((i) => i?.isDefault)?.locationCode;
    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId && selectedOrder?.modelCode) {
            reset();
            fetchDealerLocations({ customURL: customURL + '?locationType=S&modelCode=' + selectedOrder?.modelCode + '&parentGroupCode=' + parentGroupCode, setIsLoading: locationDataLoding, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrder]);

    const handleOtfTransferLocationChange = (value) => {
        if (!value) {
            otfTransferForm.resetFields(['salesConsultant']);
            reset();
        } else {
            const extraParams = [
                {
                    key: 'locationCode',
                    value: value ? value : 'No Data',
                },
            ];
            fetchSalesConsultant({ setIsLoading: listConsultantShowLoading, extraParams, userId, onErrorAction });
        }
    };

    const formProps = {
        ...props,
        titleOverride: moduleTitle,
        otfData,
        selectedOrder,
        buttonData,
        setButtonData,
        salesConsultantLov,
        dealerLocations,
        handleOtfTransferLocationChange,
        defaultDealerLocationCode,
    };

    return <AddEditForm {...formProps} />;
};

export const TransferMaster = connect(mapStateToProps, mapDispatchToProps)(TransferMasterBase);
