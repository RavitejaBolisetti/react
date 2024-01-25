/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form,  Checkbox, Card,  Collapse, Divider, Switch } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { expandIcon } from 'utils/accordianExpandIcon';
import { validateRequiredInputField, } from 'utils/validation';

const AddEditFormMain = (props) => {     
    const disabledProps = { disabled: true };
    const {handleOnChange } = props;
    
   

    return (
        <>
            <Card>
                <Row gutter={16}>
                            
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.mFGPlant'))} >
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.mFGPlant'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.otherMFGPlant'))} >
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.otherMFGPlant'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.plantLocation'))} >
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.plantLocation'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.plantBlock'))}>
                     <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.plantBlock'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
              
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>                  
                  <Form.Item name="activeInd" label={translateContent('partMaster.placeholder.activeInd')}  valuePropName="checked">  
                    <Checkbox onClick={handleOnChange}></Checkbox>
                    </Form.Item>
                  </Col>
                
                  </Row> 
                    </Card>

          
          
        </>
    );
};

export const AddEditForm = AddEditFormMain;


