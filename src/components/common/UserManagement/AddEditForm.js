/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Button, Space, Collapse } from 'antd';
import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';
import style3 from './UserManagement.module.css';

import AssignUserRole from './AssignUserRole';
import BranchMapping from './BranchMapping';
import ProductMapping from './ProductMapping';
import { ViewUserManagementDealer } from './ViewUserManagementDealer';
import { MinusBorderedIcon, PlusBorderedIcon } from 'Icons';
import CommonCard from './CommonCard';
import MacIdCard from './MacIdCard';

const { Panel } = Collapse;
const expandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);

const AddEditFormMain = (props) => {
    const { onCloseAction, productHierarchyData, DealerSearchvalue, showSaveBtn, setSaveAndAddNewBtnClicked, onFinishFailed, onFinish, form, footerEdit, DealerData } = props;
    const { isFormBtnActive, setFormBtnActive, isViewModeVisible, setClosePanels, AccessMacid, setAccessMacid, hanndleEditData } = props;
    const { finalFormdata, setfinalFormdata } = props;
    const [Macid, setMacid] = useState();

    const [openAccordian, setOpenAccordian] = useState(1);
    const [disableadd, setdisableadd] = useState(false);

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };
    useEffect(() => {
        setfinalFormdata({ ...finalFormdata, Macid: AccessMacid });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AccessMacid]);

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleDelete = (event, key) => {
        const newAccessid = AccessMacid.filter((el) => {
            return el?.key !== key;
        });
        setAccessMacid(newAccessid);
    };
    const handleAddMacid = (event, key) => {
        form.validateFields();
        form.resetFields();
        const CardData = {
            macid: Macid,
            key: AccessMacid?.length,
        };
        setAccessMacid([...AccessMacid, CardData]);
    };

    const Checkduplicate = (value) => {
        const index = AccessMacid?.findIndex((el) => el?.macid === value);

        if (index !== -1) {
            setdisableadd(true);
            return Promise.reject('Their are duplicate Macid');
        } else {
            setdisableadd(false);

            return Promise.resolve('');
        }
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        handleCollapse,
        openAccordian,
        setClosePanels,
        finalFormdata,
        DealerData,
        setfinalFormdata,
        styles,
        isViewModeVisible,
        AccessMacid,
        DealerSearchvalue,
        productHierarchyData,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: 'flex',
                        marginBottom: '30px',
                    }}
                >
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <CommonCard DealerData={DealerData} />
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item
                                label="MAC ID"
                                name="macid"
                                rules={[
                                    validateRequiredInputField('MAC id'),
                                    validationFieldLetterAndNumber('MAC id'),
                                    {
                                        validator: (_, value) => Checkduplicate(value),
                                    },
                                ]}
                            >
                                <Input onChange={(event) => setMacid(event.target.value)} minLength={14} maxLength={14} placeholder={preparePlaceholderText('MAC id')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Button onClick={(event, key) => handleAddMacid(event, key)} form="myForm" key="Add" type="primary" disabled={disableadd}>
                                Add
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <MacIdCard AccessMacid={AccessMacid} handleDelete={handleDelete} isViewModeVisible={isViewModeVisible} />
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={style3.manageAccessHeader}>
                                <p>
                                    Access Management<span>*</span>
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} activeKey={openAccordian}>
                                    <Panel header="Assign User Roles" key="1">
                                        <AssignUserRole userRoleOptions={DealerData?.roles} DealerSearchvalue={DealerSearchvalue} finalFormdata={finalFormdata} setfinalFormdata={setfinalFormdata} />
                                    </Panel>
                                </Collapse>
                                <Collapse onChange={() => handleCollapse(2)} expandIcon={expandIcon} activeKey={openAccordian}>
                                    <Panel header="Branch Mapping" key="2">
                                        <BranchMapping BranchMappingData={DealerData?.branches} finalFormdata={finalFormdata} setfinalFormdata={setfinalFormdata} />
                                    </Panel>
                                </Collapse>
                                <Collapse onChange={() => handleCollapse(3)} expandIcon={expandIcon} activeKey={openAccordian}>
                                    <Panel header="Product Mapping" key="3">
                                        <ProductMapping ProductMappingData={DealerData?.products} productHierarchyData={productHierarchyData} finalFormdata={finalFormdata} setfinalFormdata={setfinalFormdata} />
                                    </Panel>
                                </Collapse>
                            </Space>
                        </Col>
                    </Row>
                </Space>
            ) : (
                <ViewUserManagementDealer {...viewProps} />
            )}

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                    <Button danger onClick={onCloseAction}>
                        {footerEdit ? 'Close' : 'Cancel'}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                    {!footerEdit && showSaveBtn && (
                        <Button disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                            Save
                        </Button>
                    )}

                    {footerEdit && (
                        <Button onClick={hanndleEditData} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                            Edit
                        </Button>
                    )}
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
