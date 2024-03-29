/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';
import { BASE_URL_CUSTOMER_MASTER_VEHICLE_LIST as customURL } from 'constants/routingApi';
import { otfReferralsDataActions } from 'store/actions/data/otf/referrals';

import { CustomerListModal } from './CustomerListModal';
import { PARAM_MASTER } from 'constants/paramMaster';
import { SearchBox } from 'components/utils/SearchBox';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                Referrals: { isLoaded: isDataLoaded = false, isLoading, filter: filterString },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        filterString,
        typeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCustomerList: otfReferralsDataActions.fetchData,
            setFilterString: otfReferralsDataActions.setFilter,
            listShowLoading: otfReferralsDataActions.listShowLoading,
            resetData: otfReferralsDataActions.reset,
            saveData: otfReferralsDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

const CustomerListBase = (props) => {
    const { listShowLoading, userId, referralData, fnSetData = undefined, disabled = false, buttonData, setButtonData } = props;
    const { handleFormValueChange, fetchCustomerList, typeData, showGlobalNotification } = props;

    const [searchForm] = Form.useForm();
    const [selectedRowData, setSelectedRowData] = useState();
    const [filterString, setFilterString] = useState();

    const [isCusomerSearchVisible, setCusomerSearchVisible] = useState(false);
    const [customerList, setCustomerList] = useState();

    useEffect(() => {
        setFilterString();
        fnSetData && fnSetData(referralData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [referralData]);

    useEffect(() => {
        if (userId && filterString?.searchType && filterString?.searchParam) {
            const searchParams = [
                {
                    key: 'searchType',
                    title: 'Type',
                    value: filterString?.searchType,
                    canRemove: false,
                    filter: true,
                },
                {
                    key: 'searchParam',
                    title: 'Value',
                    value: filterString?.searchParam,
                    canRemove: true,
                    filter: true,
                },
                {
                    key: 'pageNumber',
                    title: 'Value',
                    value: 1,
                    canRemove: true,
                    filter: false,
                },
                {
                    key: 'pageSize',
                    title: 'Value',
                    value: 1000,
                    canRemove: true,
                    filter: false,
                },
            ];

            fetchCustomerList({
                customURL,
                setIsLoading: listShowLoading,
                extraParams: searchParams,
                onSuccessAction: (res) => {
                    if (res?.data?.customerMasterDetails?.length > 1) {
                        setCusomerSearchVisible(true);
                        setCustomerList(res?.data?.customerMasterDetails);
                    } else {
                        res?.data?.customerMasterDetails && fnSetData(res?.data?.customerMasterDetails?.[0]);
                    }
                },
                onErrorAction: (message) => {
                    fnSetData(null);
                    showGlobalNotification({ message });
                },
                userId,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const handleResetFilter = (e) => {
        setCusomerSearchVisible(false);
    };

    const handleSelectedData = (e) => {
        fnSetData({ ...selectedRowData });
        setSelectedRowData();
        handleResetFilter();
        setCusomerSearchVisible(false);
        setFilterString();
    };

    const customerListProps = {
        isVisible: isCusomerSearchVisible,
        titleOverride: 'Search Result',
        handleResetFilter,
        onCloseAction: () => {
            setCusomerSearchVisible(false);
            setFilterString();
        },
        setCusomerSearchVisible,
        data: customerList,
        fnSetData,
        handleFormValueChange,
        setSelectedRowData,
        filterString,
        setFilterString,
        handleSelectedData,
    };

    const searchBoxProps = {
        searchForm,
        filterString,
        optionType: typeData[PARAM_MASTER?.CUST_VEH_SEARCH?.id],
        setFilterString,
        selectWide: true,
        disabled,
        defaultOption: 'customerName',
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <SearchBox {...searchBoxProps} />
                </Col>
            </Row>
            <CustomerListModal {...customerListProps} buttonData={buttonData} setButtonData={setButtonData} />
        </>
    );
};
export const CustomerListMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerListBase);
