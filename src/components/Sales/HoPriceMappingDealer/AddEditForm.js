/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, Select, Switch } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { DataTable } from 'utils/dataTable';
import { tableColumnAddEdit } from './tableColumnAddEdit';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, buttonData, setButtonData, handleButtonClick, onCloseAction, formActionType: { viewMode } = undefined, onFinish, onFinishFailed } = props;
    const { isLoading } = props;
    // useEffect(() => {
    //     partyDetailForm.setFieldsValue({
    //         ...formData,
    //     });
    //     partyDetailForm.setFieldsValue({
    //         partyName: formData?.partyName ?? formData?.customerName,
    //         address: formData?.address,
    //         city: formData?.city,
    //         state: formData?.state,
    //         mobileNumber: formData?.mobileNumber,
    //         mitraType: formData?.mitraType,
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [formData]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const tableData = [
        {
            productHierarchy: 'product01',
            dealerFlag: 'Flag01',
        },
    ];

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <h2>Dealer List</h2>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.areaOffice} label="Area Office" name="areaOffice">
                                            <Input placeholder={preparePlaceholderText('Area Office')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.state} label="State" name="state">
                                            <Input placeholder={preparePlaceholderText('State Code')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.pricingCityCode} label="Pricing City Code" name="pricingCityCode">
                                            <Input placeholder={preparePlaceholderText('Pricing City Code')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerName} label="Dealer Name" name="dealerName">
                                            <Input placeholder={preparePlaceholderText('Dealer Name')} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerBranch} label="Dealer Branch" name="dealerBranch">
                                            <Input placeholder={preparePlaceholderText('Dealer Branch')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerName} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="statusDealerSelected" label="Dealer Selected for On Road Price?">
                                            <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <h2>Model Details</h2>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        {/* <Form.Item initialValue={formData?.areaOffice} label="Area Office" name="areaOffice"> */}
                                        <DataTable tableColumn={tableColumnAddEdit({ handleButtonClick })} tableData={tableData} pagination={false} />
                                        {/* </Form.Item> */}
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Col>
                </Row>

                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
