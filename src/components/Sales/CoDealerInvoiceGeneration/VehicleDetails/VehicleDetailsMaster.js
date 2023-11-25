/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useDeferredValue } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';

import { CoDealerFormButton } from '../CoDealerFormButton';
import { BASE_URL_TAX_CALCULATION } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';
import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';

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
            fetchData: otfvehicleDetailsDataActions.fetchData,
            listShowLoading: otfvehicleDetailsDataActions.listShowLoading,
            resetData: otfvehicleDetailsDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMain = (props) => {
    const { CoDealerInvoiceStateMaster, form, handleFormValueChange, section, formActionType, setButtonData } = props;
    const { fetchData, listShowLoading, userId } = props;
    const [formData, setFormData] = useState();
    const [collapseActiveKey, setcollapseActiveKey] = useState([1]);
    const [dealerDiscount, setDealerDicountValue] = useState();
    const trueDealerDiscount = useDeferredValue(dealerDiscount);

    const handleVehicleDetailChange = ({ modelCode, discountAmount, saleType, priceType }) => {
        if (modelCode && discountAmount && saleType && priceType) {
            const extraParams = [
                {
                    key: 'modelCode',
                    value: 'X700M028817182190',
                },
                {
                    key: 'discountAmount',
                    value: discountAmount,
                },

                {
                    key: 'saleType',
                    value: saleType,
                },

                {
                    key: 'priceType',
                    value: priceType,
                },
            ];

            const onSuccessAction = (res) => {
                setFormData({ ...res?.data });
                form.setFieldsValue({ ...res?.data });
            };

            const onErrorAction = (message) => {
                showGlobalNotification({ message });
                setButtonData((prev) => ({ ...prev, formBtnActive: false }));
            };

            fetchData({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction, customURL: BASE_URL_TAX_CALCULATION });
        }
    };

    useEffect(() => {
        if (CoDealerInvoiceStateMaster?.vehicleDetailRequest) {
            setFormData({ ...CoDealerInvoiceStateMaster?.vehicleDetailRequest });
        }
        return () => {
            setFormData();
        };
    }, [CoDealerInvoiceStateMaster?.vehicleDetailRequest, form, section?.id]);

    useEffect(() => {
        if (trueDealerDiscount) {
            handleVehicleDetailChange({ modelCode: form.getFieldValue('modelCode'), discountAmount: form.getFieldValue('discountAmount'), saleType: form.getFieldValue('saleType'), priceType: form.getFieldValue('priceType') });
        }
    }, [trueDealerDiscount]);

    const formProps = {
        ...props,
        formData,
        collapseActiveKey,
        setcollapseActiveKey,
        setDealerDicountValue,
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
