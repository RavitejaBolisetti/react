/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Space, Divider, Card } from 'antd';

import { validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { PARAM_MASTER } from 'constants/paramMaster';

const AddEditFormMain = (props) => {
    const { typeData, formData, form, corporateLovData, formActionType: { editMode } = undefined, validateParentCode, customerType, customerParentCompanyData } = props;
    const [corporateType, setCorporateType] = useState('');
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [mobileLoader, setmobileLoader] = useState(false);

    useEffect(() => {
        setCorporateType(formData?.corporateType);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.corporateType]);

    const handleCorporateChange = (value) => {
        setCorporateType(value);
        if (value === 'NON-LIS') {
            form.setFieldsValue({
                corporateName: null,
            });
        } else if (value === 'LIS') {
            form.setFieldsValue({
                corporateCode: null,
            });
        }
    };

    const onHandleSelect = (value) => {
        form.setFieldsValue({
            corporateCode: value,
        });
    };
    // const handleNumberValidation = (event) => {
    //     const Mno = event.target.value;
    //     const regex = new RegExp('^([5-9]){1}([0-9]){9}$');
    //     if (Mno?.length === 10 && regex.test(Mno)) {
    //         setmobileLoader(true);
    //         setTimeout(() => {
    //             setIsModalOpen(true);
    //         }, 1000);
    //     } else {
    //         setmobileLoader(false);
    //     }
    // };
    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     setmobileLoader(false);
    // };

    // const modalProps = {
    //     isVisible: isModalOpen,
    //     icon: <BiLockAlt />,
    //     titleOverride: 'Mobile Number Validation',
    //     closable: false,
    //     onCloseAction: handleCancel,
    // };
    return (
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <Card style={{ backgroundColor: '#F2F2F2' }}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        {/* {editMode ? (
                            // <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number')]}>
                            //     <Input
                            //         placeholder={preparePlaceholderText('mobile number')}
                            //         onChange={handleNumberValidation}
                            //         maxLength={10}
                            //         size="small"
                            //         suffix={
                            //             <>
                            //                 {false ? (
                            //                     <Button loading={mobileLoader} onClick={showModal} type="link">
                            //                         Validate
                            //                     </Button>
                            //                 ) : (
                            //                     <CheckOutlined style={{ color: '#70c922', fontSize: '16px', fotWeight: 'bold' }} />
                            //                 )}
                            //                 <ValidateMobileNumberModal {...modalProps} />
                            //             </>
                            //         }
                            //     />
                            // </Form.Item>
                        ) : (
                            <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number'), validateRequiredInputField('mobile number')]}>
                                <Input placeholder={preparePlaceholderText('mobile number')} maxLength={10} size="small" />
                            </Form.Item>
                        )} */}
                        <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number'), validateRequiredInputField('mobile number')]}>
                            <Input placeholder={preparePlaceholderText('mobile number')} maxLength={10} size="small" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={customerType} label="Customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} disabled={true} placeholder={preparePlaceholderSelect('customer type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.[PARAM_MASTER?.CUST_TYPE?.id]} allowClear></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.companyName} label="Company Name" name="companyName" data-testid="companyName" rules={[validateRequiredInputField('company name')]}>
                            <Input placeholder={preparePlaceholderText('company name')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.parentCompanyCode} label="Parent Company Code" name="parentCompanyCode" data-testid="parentCode" rules={[validateRequiredInputField('parent company code')]}>
                            <Input placeholder={preparePlaceholderText('parent company code')} onBlur={validateParentCode} disabled={editMode} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.parentCompanyName || (customerParentCompanyData && customerParentCompanyData.length > 0) ? customerParentCompanyData[0]?.parentCompanyName : ''} label="Parent Company Name" name="parentCompanyName" data-testid="parentName">
                            <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateType} label="Corporate Type" name="corporateType" data-testid="corporateType" rules={[validateRequiredSelectField('corporate type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('corporate type')} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_TYPE']} onChange={handleCorporateChange}></Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Corporate Name" initialValue={corporateType === 'NON-LIS' ? '' : formData?.corporateName} name="corporateName" data-testid="corporateName" rules={[validateRequiredSelectField('corporate name')]}>
                            {corporateType === 'NON-LIS' ? <Input placeholder={preparePlaceholderText('corporate name')} /> : <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} onSelect={onHandleSelect} disabled={false} loading={false} placeholder={preparePlaceholderSelect('corporate name')} fieldNames={{ label: 'value', value: 'key' }} options={corporateLovData} allowClear></Select>}
                        </Form.Item>
                    </Col>

                    {(corporateType === 'LIS' || corporateType === '') && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.corporateCode} label="Corporate Code" name="corporateCode" data-testid="corporate code" rules={[validateRequiredInputField('corporate name')]}>
                                <Input placeholder={preparePlaceholderText('corporate code')} disabled />
                            </Form.Item>
                        </Col>
                    )}
                    {/* {console.log('corporatecode', formData?.corporateCode)} */}
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateCategory} label="Corporate Category" name="corporateCategory" data-testid="corporateCategory">
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('corporate category')} disabled={editMode} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_CATE']}></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.membershipType} label="Membership Type" name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('membership type')} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['MEM_TYPE']}></Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Space>
    );
};

export const AddEditForm = AddEditFormMain;
