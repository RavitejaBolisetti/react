/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Collapse, Divider } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import EnrolmentAdd from './EnrolmentAdd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { CustomerAndVehicleView } from './CustomerAndVehicleView';
import { EnrolmentView } from './EnrolmentView';
import { EnrolmentNumberGenerated } from '../EnrolmentNumberGenerated';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const AddViewFormMain = (props) => {
    const { form, formData, buttonData, setButtonData, handleButtonClick, onCloseAction, formActionType, onFinish, isEnrolmentGenerated, activeKey, onChange } = props;

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
        saveButtonName: formActionType?.addMode ? 'Save & Next' : 'Next',
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                {isEnrolmentGenerated ? (
                    <Row gutter={20} className={styles.drawerBodyRight} justify="center" align="center">
                        <EnrolmentNumberGenerated />
                    </Row>
                ) : (
                    <Row gutter={20} className={styles.drawerBodyRight}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Collapse activeKey={activeKey} onChange={() => onChange(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon">
                                <Panel header={translateContent('crmSchemeEnrolment.label.enrolmentDetails')} key="1">
                                    <Divider />
                                    {formActionType?.viewMode ? <EnrolmentView {...props} /> : <EnrolmentAdd {...props} />}
                                </Panel>
                            </Collapse>
                            <Collapse activeKey={activeKey} onChange={() => onChange(2)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon">
                                <Panel header={translateContent('crmSchemeEnrolment.label.customerVehicleDetails')} key="2">
                                    <Divider />
                                    <CustomerAndVehicleView {...props} />
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                )}

                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddViewFormMaster = withDrawer(AddViewFormMain, { width: '90%' });
