import React from 'react';
import { Input, Form, Col, Row, Button, Select, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';

function FormProductAttribute(props) {
    const { attributeForm, isVisible, productHierarchyAttributeData, onAttributeFormFinish, formDecider, editForm, finalFormdata } = props;

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const fieldNames = { label: 'attributeCode', value: 'id' };

    console.log(finalFormdata, 'checkDta');

    // let forDuplicateAlertData = [];
    // finalFormdata?.map((item) => forDuplicateAlertData?.push({ attributeName: item?.attributeName?.label, attributeValue: item?.attributeValue }));
  
    const duplicateValidator = (value, dataList) => {
        if (!value) {
            return Promise.reject('Please Select Attribute Name');
        } else {

            let status = false;
            for(let i = 0; i < dataList.length ; i++){
                if( dataList[i].attributeName.label === value ){
                    status = true;
                    return Promise.reject('Duplicate found');
                }
            }

            if(!status){
                return Promise.resolve('');
            }
            
        }
    };

    //validateRequiredSelectField('Attribute Name'),

    return (
        <Form form={formDecider ? editForm : attributeForm} id="myForm" autoComplete="off" layout="vertical" onFinish={onAttributeFormFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Attribute Name" name="attributeName" initialValue={props?.attributeName} rules={[ { validator: (value) => duplicateValidator(value, finalFormdata) }]}>
                        <Select
                            getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            placeholder={preparePlaceholderSelect('attribute name')}
                            style={{
                                width: '100%',
                            }}
                            options={productHierarchyAttributeData}
                            fieldNames={fieldNames}
                            allowClear
                            labelInValue
                        ></Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item labelAlign="left" name="attributeValue" label="Attribute Value" rules={[validateRequiredInputField('Attribute Value')]} initialValue={props?.attributeValue}>
                        <Input placeholder={preparePlaceholderText('Attribute Value')} className={styles.inputBox} />
                    </Form.Item>
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item labelAlign="left" name="fromApi" initialValue={props?.fromApi}>
                        <Checkbox value={false} />
                    </Form.Item>
                </Col>

                {isVisible && (
                    <Button icon={<PlusOutlined />} type="primary" danger htmlType="submit" style={{ margin: '0 0 0 12px' }}>
                        Add
                    </Button>
                )}
            </Row>
        </Form>
    );
}

export default FormProductAttribute;
