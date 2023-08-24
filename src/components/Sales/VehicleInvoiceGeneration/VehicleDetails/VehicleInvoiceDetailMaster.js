/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { productDetailsDataActions } from 'store/actions/data/vehicle/productDetails';

import { showGlobalNotification } from 'store/actions/notification';

import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetails';
import { VehicleInvoiceFormButton } from '../VehicleInvoiceFormButton';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Vehicle: {
                ProductDetails: { isLoaded: isDataLoaded = false, isLoading, data: ProductDetailsData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Product Details';

    let returnValue = {
        userId,
        isDataLoaded,
        typeData,
        ProductDetailsData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: productDetailsDataActions.fetchList,
            saveData: productDetailsDataActions.saveData,
            listShowLoading: productDetailsDataActions.listShowLoading,
            resetData: productDetailsDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleInvoiceDetailMasterMain = (props) => {
    const { isLoading } = props;
    const { showGlobalNotification, typeData } = props;
    const { form, selectedRecordId, section, formActionType, handleFormValueChange } = props;

    const [formData, setformData] = useState({});
    const [optionsServiceModified, setoptionsServiceModified] = useState([]);
    const [openAccordian, setOpenAccordian] = useState([]);
    const [tooltTipText, settooltTipText] = useState();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [itemOptions, setitemOptions] = useState();
    const [makeOptions, setmakeOptions] = useState();
    const MakefieldNames = { label: 'value', value: 'key' };
    const ItemFieldNames = { label: 'value', value: 'key' };
    const collapseProps = { collapsible: 'icon' };
    const disabledProps = { disabled: true };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };
    const makeExtraParams = ({ key, title, value, name }) => {
        const params = [
            {
                key: key,
                title: title,
                value: value,
                name: name,
            },
        ];
        return params;
    };
    const bindCodeValue = (value, item) => {
        switch (item) {
            case 'item': {
                const codeVal = itemOptions?.find((element, index) => {
                    if (element?.value === value || element?.key === value) {
                        return element;
                    }
                    return false;
                });
                if (codeVal) return codeVal?.value;
                return 'NA';
            }
            case 'make': {
                const codeVal = makeOptions?.find((element, index) => {
                    if (element?.value === value || element?.key === value) {
                        return element;
                    }
                    return false;
                });

                if (codeVal) return codeVal?.value;
                return 'NA';
            }
            default: {
                return;
            }
        }
    };
    const bindStatus = (element, key, statusActive) => {
        if (element && key && element[key]) {
            if (element[key]) {
                return statusActive?.active;
            } else {
                return statusActive?.inActive;
            }
        } else {
            return 'NA ';
        }
    };

    // useEffect(() => {
    //     if (userId && selectedRecordId) {
    //         fetchList({ setIsLoading: listShowLoading, userId, extraParams: makeExtraParams({ key: 'vin', title: 'vin', value: selectedRecordId, name: 'vin Number' }), onErrorAction, onSuccessAction });
    //     }
    //     return () => {
    //         resetData();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, selectedRecordId]);

    // useEffect(() => {
    //     if (isDataLoaded && ProductDetailsData) {
    //         setformData(ProductDetailsData);
    //         ProductDetailsData?.aggregates && setoptionsServiceModified(ProductDetailsData?.aggregates);
    //         settooltTipText(
    //             <div>
    //                 <p>
    //                     Color - <span>{ProductDetailsData?.productAttributeDetail?.color ?? 'Na'}</span>
    //                 </p>
    //                 <p>
    //                     Trim Level - <span>{ProductDetailsData?.productAttributeDetail?.trimLevel ?? 'Na'}</span>
    //                 </p>
    //                 <p>
    //                     Engine Type - <span>{ProductDetailsData?.productAttributeDetail?.engineType ?? 'Na'}</span>
    //                 </p>
    //                 <p>
    //                     Drive Train - <span>{ProductDetailsData?.productAttributeDetail?.driveTrain ?? 'Na'}</span>
    //                 </p>
    //                 <p>
    //                     Transmission - <span>{ProductDetailsData?.productAttributeDetail?.transmission ?? 'Na'}</span>
    //                 </p>
    //                 <p>
    //                     Wheel Size - <span>{ProductDetailsData?.productAttributeDetail?.wheelSize ?? 'Na'}</span>
    //                 </p>
    //                 <p>
    //                     Interior Uphoistery - <span>{ProductDetailsData?.productAttributeDetail?.interiorUpholstery ?? 'Na'}</span>
    //                 </p>
    //             </div>
    //         );
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isDataLoaded, ProductDetailsData]);
    // useEffect(() => {
    //     if (typeData) {
    //         if (typeData[PARAM_MASTER?.VEH_MAKE?.id]) {
    //             setmakeOptions(typeData[PARAM_MASTER?.VEH_MAKE?.id]);
    //         }
    //         if (typeData[PARAM_MASTER?.VEH_ITEM?.id]) setitemOptions(typeData[PARAM_MASTER?.VEH_ITEM?.id]);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [typeData]);

    const handleCollapse = (key) => {
        if (key !== 'Services' && isReadOnly) {
            setIsReadOnly(false);
        }
        if (openAccordian?.includes('Services') && isReadOnly) {
            return;
        }
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onFinish = (values) => {
        const data = { ...formData, vehicleIdentificationNumber: selectedRecordId, aggregates: optionsServiceModified };
    };

    const onFinishFailed = () => {
        form.validateFields()
            .then(() => {})
            .catch(() => {});
    };

    const formProps = {
        ...props,
        formData,
        formActionType,
        handleCollapse,
        showGlobalNotification,
        selectedRecordId,
        form,
        openAccordian,
        setOpenAccordian,
        optionsServiceModified,
        setoptionsServiceModified,
        handleFormValueChange,
        tooltTipText,
        isReadOnly,
        setIsReadOnly,
        itemOptions,
        setitemOptions,
        makeOptions,
        setmakeOptions,
        MakefieldNames,
        ItemFieldNames,
        bindCodeValue,
        collapseProps,
        disabledProps,
        bindStatus,
    };

    const viewProps = {
        openAccordian,
        setOpenAccordian,
        handleCollapse,
        styles,
        formData,
        tooltTipText,
        settooltTipText,
        isLoading,
        optionsServiceModified,
        formActionType,
        typeData,
        bindCodeValue,
        collapseProps,
        disabledProps,
        bindStatus,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>
                                Vehicle Details
                                {/* {section?.title} */}
                            </h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleInvoiceFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const VehicleInvoiceDetailMaster = connect(null, null)(VehicleInvoiceDetailMasterMain);
