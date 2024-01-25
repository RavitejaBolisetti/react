/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';

import { withDrawer } from 'components/withDrawer';
import { withSpinner } from 'components/withSpinner';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                VehicleDetails: { isLoaded: isDataLoaded = false, isLoading, data: vehicleDetailData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        vehicleDetailData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
        },
        dispatch
    ),
});

const ChangeModelVariantMasterBase = (props) => {
    const {
        formActionType: { viewMode },
        vehicleDetailData,
    } = props;

    const [formData, setFormData] = useState();
    useEffect(() => {
        if (vehicleDetailData) {
            // setFormData(vehicleDetailData);
            setFormData({
                ...vehicleDetailData,
                // sapStatusResponseCode: 'PD',
                // revisedModel: 'X700MM89615721919',
                // revisedOemModelCode: 'AW62BCZF7T801A00RA',
                // revisedModelDescription: 'XUV700 AX7 L PET AT 7 SEATER RED',
                // revisedSoNumber: '0100031188',
                // sapResonseRemarks: 'EDCM : Error : Pl. check Material AS22APEU5T101A00WP  - Group :  is not active for ordering',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleDetailData]);

    const myProps = {
        ...props,
        formData,
        setFormData,
    };

    return <div>{viewMode ? null : <AddEditForm {...myProps} />}</div>;
};

export const ChangeModelVariantMaster = connect(mapStateToProps, mapDispatchToProps)(withDrawer(withSpinner(ChangeModelVariantMasterBase), { width: '90%', title: 'Model Change', footer: null }));
