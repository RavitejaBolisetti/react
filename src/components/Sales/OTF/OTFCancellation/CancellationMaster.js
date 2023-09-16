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
import { cancellationDataActions } from 'store/actions/data/otf/otfCancellation';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { BASE_URL_OTF_CANCELLATION_DEALER_SEARCH as customURL } from 'constants/routingApi';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ProductHierarchy: { isLoading: isProductHierarchyLoading = false, data: productHierarchyData = [] },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading, data: supportingData },
            OTF: {
                OtfCancellation: { detailData: dealerDataList = [] },
            },
        },
    } = state;
    const moduleTitle = 'Cancel Booking';

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
            resetDealerList: cancellationDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const CancellationMasterBase = (props) => {
    const { otfData, selectedOrder } = props;
    const { userId, listShowLoading, uploadDocumentFile } = props;
    const { moduleTitle, setUploadedFile, uploadedFile } = props;
    const { fetchProductHierarchyList, productHierarchyData, onFinishOTFCancellation, fetchDealerList, dealerDataList, resetDealerList } = props;

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, cancelOTFBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [emptyList, setEmptyList] = useState(true);
    const [searchDealerValue, setSearchDealerValue] = useState('');

    const [uploadedFileName, setUploadedFileName] = useState('');
    const [parentAppCode, setparentAppCode] = useState();

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const handleButtonClick = ({ record = null, buttonAction }) => {};

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId) {
            fetchProductHierarchyList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (searchDealerValue?.length >= 3 && userId) {
            const extraParams = [
                {
                    key: 'searchType',
                    value: 'dealerName',
                },
                {
                    key: 'searchParam',
                    value: searchDealerValue,
                },
            ];
            fetchDealerList({ customURL, setIsLoading: listShowLoading, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDealerValue, userId]);

    const formProps = {
        ...props,
        titleOverride: moduleTitle,
        otfData,
        selectedOrder,
        buttonData,
        setButtonData,
        handleButtonClick,
        uploadDocumentFile,
        setUploadedFile,
        fieldNames,
        productHierarchyData,
        onFinishOTFCancellation,
        searchDealerValue,
        setSearchDealerValue,
        dealerDataList,
        emptyList,
        setEmptyList,
        uploadedFileName,
        setUploadedFileName,
        uploadedFile,
        parentAppCode,
        setparentAppCode,
        resetDealerList,
    };

    return <AddEditForm {...formProps} />;
};

export const CancellationMaster = connect(mapStateToProps, mapDispatchToProps)(CancellationMasterBase);
