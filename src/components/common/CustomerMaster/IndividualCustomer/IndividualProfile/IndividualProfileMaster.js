/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import AddEditForm from './AddEditForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showGlobalNotification } from 'store/actions/notification';
import { indiviualProfileDataActions } from 'store/actions/data/customerMaster/individual/individualProfile/indiviualProfile';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                IndiviualProfile: { isLoaded: isIndiviualProfileLoaded = false, isLoading: isIndiviualLoading, data: indiviualData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isIndiviualProfileLoaded,
        isIndiviualLoading,

        indiviualData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchIndiviualList: indiviualProfileDataActions.fetchList,
            listIndiviualShowLoading: indiviualProfileDataActions.listShowLoading,
            saveData: indiviualProfileDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});
const IndividualProfileBase = (props) => {
    const { userId, fetchIndiviualList, listIndiviualShowLoading, isIndiviualProfileLoaded } = props;
    useEffect(() => {
        if (userId && !isIndiviualProfileLoaded) {
            fetchIndiviualList({ setIsLoading: listIndiviualShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isIndiviualProfileLoaded]);

    const extraParams = [
        {
            key: 'customerId',
            title: 'Customer',
            value: 'CUS1686811036620',
            name: 'customerId',
        },
    ];
    return (
        <>
            <AddEditForm {...props} />
        </>
    );
};

export const IndividualProfileMaster = connect(mapStateToProps, mapDispatchToProps)(IndividualProfileBase);
