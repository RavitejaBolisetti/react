import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Card } from 'antd';

import { showGlobalNotification } from 'store/actions/notification';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';

import AddEditForm from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { isLoaded: isDocumentDataLoaded = false, isDocumentDataLoading, data: configData = [], paramdata: typeData = [] },
        },
    } = state;

    console.log('state', state);

    let returnValue = {
        userId,
        accessToken,
        token,
        configData,
        typeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            configFetchList: configParamEditActions.fetchList,
            configListShowLoading: configParamEditActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const SupportingDocumentBase = (props) => {
    const { userId, accessToken, token, configData, typeData, configFetchList, configListShowLoading } = props;

    useEffect(() => {
        if (userId) {
            configFetchList({ setIsLoading: configListShowLoading, userId, parameterType: 'CUST_FILES' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const formProps = {
        typeData,
        userId,
        accessToken,
        token,
    };

    return (
        <Card style={{ backgroundColor: '#f2f2f2' }}>
            <AddEditForm {...formProps} />
        </Card>
    );
};

export const SupportingDocument = connect(mapStateToProps, mapDispatchToProps)(SupportingDocumentBase);
