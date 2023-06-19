import React, { useState, useEffect } from 'react';
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
                IndividualProfile: { isLoaded: isIndiviualProfileLoaded = false, isLoading: isIndiviualLoading, data: indiviualData = [] },
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
    const { userId, fetchIndiviualList, listIndiviualShowLoading, isIndiviualProfileLoaded, indiviualData, saveData, showGlobalNotification } = props;
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
            <h2>Individual Profile</h2>
            <AddEditForm {...props} />
        </>
    );
};

export const IndividualProfileMaster = connect(mapStateToProps, mapDispatchToProps)(IndividualProfileBase);
