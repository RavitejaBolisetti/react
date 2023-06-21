/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from './CustomerFormButton.module.css';

export const CustomerFormButton = ({ formData, onCloseAction, buttonData, setButtonData, saveButtonName = 'Save & Next', handleButtonClick, isLoadingOnSave }) => {
    return (
        <Row gutter={20} className={styles.formFooter}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                {buttonData?.closeBtn && (
                    <Button danger onClick={onCloseAction}>
                        Close
                    </Button>
                )}

                {buttonData?.cancelBtn && (
                    <Button danger onClick={onCloseAction}>
                        Cancel
                    </Button>
                )}
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                {buttonData?.editBtn && (
                    <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record: formData, formVisible: true })} type="primary">
                        Edit
                    </Button>
                )}
                {buttonData?.nextBtn && (
                    <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.NEXT, record: formData })} type="primary">
                        Next
                    </Button>
                )}

                {buttonData?.saveBtn && (
                    <Button loading={isLoadingOnSave} disabled={!buttonData?.formBtnActive} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">
                        {saveButtonName}
                    </Button>
                )}
            </Col>
        </Row>
    );
};
