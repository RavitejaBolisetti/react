/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect } from 'react';
import { Card, Descriptions } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';
import { partyMasterDataActions } from 'store/actions/data/partyMaster';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';
import { convertDateTimedayjs, dateFormatView } from 'utils/formatDateTime';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
            PartyMaster: { isFilteredListLoaded: isInsuranceCompanyDataLoaded = false, filteredListData: insuranceCompanies },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        insuranceData,
        isLoading,
        isInsuranceCompanyDataLoaded,
        insuranceCompanies,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchInsuranceCompanyList: partyMasterDataActions.fetchFilteredList,
            listInsuranceShowLoading: partyMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const { userId, isInsuranceCompanyDataLoaded, listInsuranceShowLoading, fetchInsuranceCompanyList, insuranceCompanies } = props;

    useEffect(() => {
        const extraParams = [
            {
                key: 'partyType',
                title: 'partyType',
                value: 'IN',
                name: 'Party Type',
            },
        ];

        if (userId && !isInsuranceCompanyDataLoaded) {
            fetchInsuranceCompanyList({ setIsLoading: listInsuranceShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isInsuranceCompanyDataLoaded]);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('commonModules.label.insuranceDetails.insuranceCompany')}>{checkAndSetDefaultValue(getCodeValue(insuranceCompanies, formData?.insuranceCompany), isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.insuranceDetails.insuranceCoverNote')}>{checkAndSetDefaultValue(formData?.insuranceCoverNote, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.insuranceDetails.insuranceAmount')}>{checkAndSetDefaultValue(formData?.insuranceAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.insuranceDetails.insuranceCoverNoteDate')}>{formData?.insuranceDate ? checkAndSetDefaultValue(convertDateTimedayjs(formData?.insuranceDate.slice(0, 10), dateFormatView)) : '-'}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.insuranceDetails.registrationNumber')}>{checkAndSetDefaultValue(formData?.registrationNumber, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain);
