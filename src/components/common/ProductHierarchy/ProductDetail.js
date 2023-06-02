import React, { Fragment, useEffect } from 'react';
import { Input, Form, Col, Row, Switch, Select, Button } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateAlphanumericWithSpaceHyphenPeriod } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';

const { Option } = Select;
const { TextArea } = Input;

const ProductDetail = (props) => {
    const { mainFrom, handleFormValueChange, handleFormFieldChange, onMainFormFinish, onFinishFailed, formData, handleAttributeChange, handleProductchange, isDataAttributeLoaded, disabledProps, attributeData, treeCodeId, treeSelectFieldProps, formActionType, onCloseAction, isFormBtnActive, isReadOnly } = props;

    return (
        // <Fragment>
            // <Form autoComplete="off" form={mainFrom} layout="vertical"   onFinish={onMainFormFinish} onFinishFailed={onFinishFailed}>
            <Form form={mainFrom} id="myForm" autoComplete="off" layout="vertical" onFinish={onMainFormFinish} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('attribute level')]}>
                            <Select onChange={handleAttributeChange} onClick={handleProductchange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('attribute level')} {...disabledProps} showSearch allowClear>
                                {attributeData?.map((item) => (
                                    <Option key={item?.id} value={item?.id}>{item?.hierarchyAttribueName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padRight18}>
                        <Form.Item initialValue={treeCodeId} label="Parent" name="parntProdctId">
                            <TreeSelectField {...treeSelectFieldProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Code" name="prodctCode" initialValue={formData?.prodctCode} rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                            <Input placeholder={preparePlaceholderText('code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name="prodctShrtName" label="Short Description" initialValue={formData?.prodctShrtName} rules={[validateRequiredInputField('short description'), validateAlphanumericWithSpaceHyphenPeriod('short description')]}>
                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('short description')} maxLength={50} disabled={formData?.id || isReadOnly}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name="prodctLongName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('long description'), validateAlphanumericWithSpaceHyphenPeriod('long description')]}>
                            <TextArea rows={2} placeholder={preparePlaceholderText('long description')} showCount maxLength={100} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                        <Form.Item initialValue={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active ? true : false} label="Status" name="active">
                            <Switch value={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active ? true : false} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active === true || null || undefined ? true : false} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20} className={styles.formFooter}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        <Button htmlType="submit" danger form="myForm" disabled={!isFormBtnActive} type="primary" >
                            Save
                        </Button>
                    </Col>
                </Row>
               
            </Form>
        // </Fragment>
    );
};

export default ProductDetail;