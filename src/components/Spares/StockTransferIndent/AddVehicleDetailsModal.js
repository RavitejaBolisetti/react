/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { withModal } from 'components/withModal';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validationNumber } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;

export const AddVehicleDetailsModalFrom = (props) => {
    const { formData, addVehicleDetailsForm, onFinishAddVehicleDetails, productHierarchyData, onCloseAction, tableDataItem } = props;
    const [productHierarchyDataList, setProductHierarchyDataList] = useState(productHierarchyData);
    const handleChangeModel = (value, valueObj) => {
        addVehicleDetailsForm?.setFieldsValue({ modelCode: value });
        addVehicleDetailsForm?.setFieldsValue({ modelDescriptionName: valueObj?.prodctShrtName });
    };

    const handlePartSearch = () => {};
    const resetApportionForm = () => {};

    useEffect(() => {
        setProductHierarchyDataList(
            productHierarchyData?.map((element) => {
                if (tableDataItem?.find((i) => i.modelCode === element?.prodctCode)) {
                    return { ...element, disabled: true };
                } else {
                    return { ...element, disabled: false };
                }
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableDataItem]);

    return (
        <Form autoComplete="off" layout="vertical" form={addVehicleDetailsForm} onFinish={onFinishAddVehicleDetails}>
            <Row gutter={24}>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Part No')} name="partNo" initialValue={formData?.partNo}>
                        {/* <Input placeholder={preparePlaceholderText(translateContent('Part No'))} ></Input> */}
                        <Search loading={false} allowClear placeholder={preparePlaceholderText(translateContent('Part No'))} onSearch={handlePartSearch} onChange={resetApportionForm} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Indent Quantity')} name="indentQuantity" initialValue={formData?.indentQuantity}>
                        <Input placeholder={preparePlaceholderText(translateContent('Indent Quantity'))} ></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Part Description')} name="partDescription" initialValue={formData?.partDescription}>
                        <Input placeholder={preparePlaceholderText(translateContent('Part Description'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('UOM')} name="uom" initialValue={formData?.uom}>
                        <Input placeholder={preparePlaceholderText(translateContent('UOM'))} disabled={true}></Input>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Inventory Classification Group')} name="inventoryClassificationGroup" initialValue={formData?.inventoryClassificationGroup} rules={[validateRequiredInputField('Inventory Classification Group')]}>
                        <Input placeholder={preparePlaceholderText(translateContent('Inventory Classification Group'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Current Stock')} name="currentStock" initialValue={formData?.currentStock}>
                        <Input placeholder={preparePlaceholderText(translateContent('Current Stock'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Min Order Level')} name="minOrderLevel" initialValue={formData?.minOrderLevel}>
                        <Input placeholder={preparePlaceholderText(translateContent('Min Order Level'))} disabled={true}></Input>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Max Order Level')} name="maxOrderLevel" initialValue={formData?.maxOrderLevel}>
                        <Input placeholder={preparePlaceholderText(translateContent('Max Order Level'))} disabled={true}></Input>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Re-Order Level')} name="reOrderLevel" initialValue={formData?.reOrderLevel}>
                        <Input placeholder={preparePlaceholderText(translateContent('Re-Order Level'))} disabled={true}></Input>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Safety Stock')} name="maxOrderLevel" initialValue={formData?.safetyStock}>
                        <Input placeholder={preparePlaceholderText(translateContent('Safety Stock'))} disabled={true}></Input>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('NDP')} name="ndp" initialValue={formData?.ndp}>
                        <Input placeholder={preparePlaceholderText(translateContent('NDP'))} disabled={true}></Input>
                    </Form.Item>
                </Col>

               
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('Value')} name="value" initialValue={formData?.maxOrderLevel}>
                        <Input placeholder={preparePlaceholderText(translateContent('Value'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.alignRight}>
                    <Button onClick={onCloseAction} danger>
                        {translateContent('global.buttons.cancel')}
                    </Button>
                    <Button htmlType="submit" type="primary" className={styles.marL10}>
                        {translateContent('global.buttons.save')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AddVehicleDetailsModal = withModal(AddVehicleDetailsModalFrom, { width: 800 });
