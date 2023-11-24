/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { DeliverableChecklistMaindataActions } from 'store/actions/data/vehicleDeliveryNote';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';

import { CoDealerFormButton } from '../CoDealerFormButton';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleDeliveryNote: {
                DeliverableChecklistMain: { isLoaded: isChecklistDataLoaded = false, isLoading: isChecklistDataLoading, data: ChecklistData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isChecklistDataLoaded,
        isChecklistDataLoading,
        ChecklistData,
        typeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: DeliverableChecklistMaindataActions.fetchList,
            saveData: DeliverableChecklistMaindataActions.saveData,
            listShowLoading: DeliverableChecklistMaindataActions.listShowLoading,
            resetData: DeliverableChecklistMaindataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMain = (props) => {
    const { CoDealerInvoiceStateMaster, form, handleFormValueChange, section, formActionType } = props;

    const [formData, setFormData] = useState();
    const [collapseActiveKey, setcollapseActiveKey] = useState([1]);

    useEffect(() => {
        if (CoDealerInvoiceStateMaster?.vehicleDetailRequest) {
            setFormData({ ...CoDealerInvoiceStateMaster?.vehicleDetailRequest });
        }
        return () => {
            setFormData();
        };
    }, [CoDealerInvoiceStateMaster?.vehicleDetailRequest, form, section?.id]);

    const formProps = {
        ...props,
        formData,
        collapseActiveKey,
        setcollapseActiveKey,
    };
    const viewProps = {
        ...formProps,
        formData,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CoDealerFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMain);
