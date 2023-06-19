import React, { useEffect, useState } from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { Form } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import { otfLoyaltySchemeDataActions } from 'store/actions/data/otf/loyaltyAndScheme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                LoyaltyScheme: { isLoaded: isLoyaltySchemeDataLoaded = false, isLoading, data: LoyaltySchemeData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Loyalty And Scheme';

    let returnValue = {
        userId,
        isLoyaltySchemeDataLoaded,
        moduleTitle,
        isLoading,
        LoyaltySchemeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfLoyaltySchemeDataActions.fetchList,
            resetData: otfLoyaltySchemeDataActions.reset,
            listShowLoading: otfLoyaltySchemeDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const LoyaltySchemeMasterMain = (props) => {
    const { isLoyaltySchemeDataLoaded, resetData, listShowLoading, fetchList, LoyaltySchemeData, userId, showGlobalNotification } = props;
    const [form] = Form.useForm();
    const [formdata, setformdata] = useState();

    const onSuccessAction = (res) => {};

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
    };
    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: 'OTF001',
            name: 'otfNumber',
        },
    ];
    const onFinish = (values) => {};
    const onFinishFailed = (values) => {
        form.validateFields()
            .then(() => {})
            .catch((err) => {
                console.log('err');
            });
    };
    useEffect(() => {
        if (!isLoyaltySchemeDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId, onErrorAction, onSuccessAction, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoyaltySchemeDataLoaded, userId]);
    useEffect(() => {
        if (LoyaltySchemeData) {
            setformdata(LoyaltySchemeData['0']);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [LoyaltySchemeData]);
    const LoyaltySchemeMasterProps = {
        ...props,
        form,
        onFinishFailed,
        onFinish,
        LoyaltySchemeData,
        formdata,
        setformdata,
    };
    return (
        <div className={styles.drawerCustomerMaster}>
            <AddEditForm {...LoyaltySchemeMasterProps} />
        </div>
    );
};
export const LoyaltySchemeMaster = connect(mapStateToProps, mapDispatchToProps)(LoyaltySchemeMasterMain);
