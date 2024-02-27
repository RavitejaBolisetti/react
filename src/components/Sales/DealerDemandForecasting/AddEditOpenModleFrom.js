/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Input, Form, Row, Button } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from 'assets/sass/app.module.scss';
import { PARAM_MASTER } from 'constants/paramMaster';
import { withModal } from 'components/withModal';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';
import { ProductModelHierarchy } from 'components/utils/ProductModelHierarchy';

export const AdvanceForm = (props) => {
    const { AdvanceformData, setAdvanceformData, productHierarchyData } = props;
    const { onCloseAction, handleFormValueChange, optionalServices, typeData, setOptionalServices, demandModleForm, demandDetailsModal } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing, isEditing } = props;

    const { itemOptions, setitemOptions, setPage } = props;
    const [setfilteredMakeoptions] = useState([]);
    const [saveBtnDisabled, setsaveBtnDisabled] = useState(true);
    const disabledProps = { disabled: true };

    // useEffect(() => {
    //     if (AdvanceformData && isVisible) {
    //         aggregateForm.setFieldsValue({
    //             item: AdvanceformData?.item ?? '',
    //             make: AdvanceformData?.make ?? '',
    //             serialNo: AdvanceformData?.serialNo ?? '',
    //             id: AdvanceformData?.id ?? '',
    //         });
    //         if (AdvanceformData?.item) {
    //             handleItemChange(AdvanceformData?.item, { type: AdvanceformData?.type }, false);
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [AdvanceformData, isVisible]);

    useEffect(() => {
        return () => {
            setfilteredMakeoptions([]);
            setsaveBtnDisabled(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const arr = [];
        if (itemOptions && itemOptions?.length) {
            optionalServices?.map((element) => {
                arr.push(element?.item);
                return false;
            });
            setitemOptions(
                itemOptions?.map((element) => {
                    if (arr?.includes(element?.value) || arr?.includes(element?.key)) {
                        return { ...element, disabled: true };
                    } else {
                        return { ...element, disabled: false };
                    }
                })
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionalServices]);

    const onFinish = () => {
        demandModleForm
            .validateFields()
            .then(() => {
                const values = demandModleForm.getFieldsValue();
                if (!isEditing) {
                    const data = { ...values, id: '' };
                    setOptionalServices([data, ...optionalServices]?.map((item, indexVal) => ({ ...item, uniqueId: indexVal }))); //Adding data to table
                    demandModleForm.resetFields();
                    setAdvanceSearchVisible(false);
                    setPage((prev) => ({ ...prev, current: 1 }));
                } else {
                    const data = { ...values };
                    const newarr = [...optionalServices];
                    newarr[AdvanceformData?.index] = data;
                    setOptionalServices(newarr);
                    setAdvanceSearchVisible(false);
                    setisEditing(false);
                    setPage((prev) => ({ ...prev, current: prev?.current }));
                }
                setAdvanceformData();
                handleFormValueChange();
                setsaveBtnDisabled(true);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const handleItemChange = (selectedKey, selectedObj, reset = true) => {
        if (!selectedKey) {
            setfilteredMakeoptions([]);
        } else {
            if (selectedObj?.type) {
                demandModleForm.setFieldValue('type', selectedObj?.type);
                const optionsSet = typeData?.[PARAM_MASTER?.[selectedObj?.type]?.id] || typeData?.[selectedObj?.type];
                setfilteredMakeoptions([...optionsSet]);
            } else {
                const findVehItem = typeData?.[PARAM_MASTER?.VEH_ITEM?.id]?.find((item) => item?.key === selectedKey)?.type;
                if (findVehItem) {
                    setfilteredMakeoptions(typeData?.[PARAM_MASTER?.[findVehItem]?.id]);
                } else {
                    setfilteredMakeoptions([]);
                }
            }
        }
        reset && demandModleForm.resetFields(['make']);
    };

    const handleFormBtn = () => {
        setsaveBtnDisabled(false);
    };
    const treeSelectFieldProps = {
        treeFieldNames: { label: 'prodctShrtName', value: 'prodctCode', children: 'subProdct' },
        treeData: productHierarchyData,
        defaultParent: false,
        handleSelectTreeClick: () => {},
        defaultValue: null,
        placeholder: preparePlaceholderSelect('Model Group'),
        name: 'model',
        labelName: false,
    };
    const modelDataLabel = useMemo(() => {
        if (isVisible) {
            if (demandDetailsModal?.groupAdd) {
               
                return { label: translateContent('demandForecasting.label.modelGroup'), data: [] };
            } else {
                return { label: translateContent('demandForecasting.label.modelVariant'), data: [] };
            }
        }
    }, [isVisible, demandDetailsModal]);
    return (
        <Form autoComplete="off" layout="vertical" form={demandModleForm} onValuesChange={handleFormBtn}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label={modelDataLabel?.label} rules={[validateRequiredSelectField(modelDataLabel?.label)]}>
                                <ProductModelHierarchy {...treeSelectFieldProps} />
                            </Form.Item>
                            {/* <Form.Item name="id" hidden />
                            <Form.Item name="type" hidden /> */}
                        </Col>

                        {!demandDetailsModal?.groupAdd && (
                            <>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item label={translateContent('demandForecasting.label.currentMonth')} rules={[validateRequiredInputField(translateContent('demandForecasting.validation.currentMonth'))]}>
                                        <Input value={'March'} placeholder={preparePlaceholderText(translateContent('demandForecasting.placeholder.currentMonth'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item label={translateContent('demandForecasting.label.currentMonth1')}>
                                        <Input placeholder={preparePlaceholderText('')} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item label={translateContent('demandForecasting.label.currentMonth2')}>
                                        <Input placeholder={preparePlaceholderText('')} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item label={translateContent('demandForecasting.label.currentMonth2')}>
                                        <Input placeholder={preparePlaceholderText('')} maxLength={50} />
                                    </Form.Item>
                                </Col>
                            </>
                        )}
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                            <Button onClick={onCloseAction} danger>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                            <Button disabled={saveBtnDisabled} onClick={onFinish} type="primary">
                                {translateContent('global.buttons.save')}
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditOpenModleForm = withModal(AdvanceForm, {});
