/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, Button, Collapse } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { DataTable } from 'utils/dataTable';
import { tableColumnAddEdit } from './tableColumnAddEdit';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';

import { ViewDetail } from './ViewDetail';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { form, formData, buttonData, setButtonData, typeData, handleButtonClick, onCloseAction, formActionType, onFinish, handleSave } = props;

    const tableData = [
        {
            branch: 'Baroda',
            accessible: 'Y',
        },
        {
            branch: 'Bodeli',
            accessible: 'N',
        },
    ];

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
        isVisible: formActionType?.viewMode,
        formData,
        styles,
        typeData,
        tableData,
        formActionType,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {formActionType?.viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerName} label={translateContent('digitalSignature.label.dealerName')} name="dealerName">
                                            <Input placeholder={preparePlaceholderText(translateContent('digitalSignature.label.dealerName'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.employeeName} label={translateContent('digitalSignature.label.employeeName')} name="employeeName">
                                            <Input placeholder={preparePlaceholderText(translateContent('digitalSignature.label.employeeName'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div className={styles.innerCollapse}>
                                    <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} expandIconPosition="end">
                                        <Panel key="1" header={translateContent('digitalSignature.heading.branchesAccessible')}>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    {/* <Form.Item initialValue={formData?.areaOffice} label="Area Office" name="areaOffice"> */}
                                                    <DataTable tableColumn={tableColumnAddEdit({ handleButtonClick, typeData, formActionType })} tableData={tableData} pagination={false} />
                                                    {/* </Form.Item> */}
                                                </Col>
                                            </Row>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    <Button data-testid="save" className={styles.marR20} onClick={() => handleSave()} type="primary">
                                                        {translateContent('global.buttons.save')}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Panel>
                                    </Collapse>
                                </div>
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
