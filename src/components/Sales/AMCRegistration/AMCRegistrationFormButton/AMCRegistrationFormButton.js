/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Popover } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'assets/sass/app.module.scss';

export const AMCRegistrationFormButton = ({ formActionType, record, onCloseAction, onCancelAMC, onApproveCancel, buttonData, setButtonData, saveButtonName = 'Save & Next', handleButtonClick, isLoadingOnSave, isLastSection, onPrintInvoice, onPrintForm21 }) => {
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.buttonsGroupLeft}>
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

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.buttonsGroupRight}>
                    {buttonData?.cancelInvoiceBtn && (
                        <Button onClick={onCancelAMC} danger>
                            Cancel AMC
                        </Button>
                    )}

                    {buttonData?.rejectCancelBtn && (
                        <Popover content={'Coming Soon'} trigger="hover">
                            <Button onClick={onApproveCancel} type="primary">
                                Reject
                            </Button>
                        </Popover>
                    )}

                    {buttonData?.approveCancelBtn && (
                        <Popover content={'Coming Soon'} trigger="hover">
                            <Button onClick={onApproveCancel} type="primary">
                                Approve
                            </Button>
                        </Popover>
                    )}

                    {buttonData?.nextBtn && !isLastSection && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.NEXT, record })} type="primary">
                            Next
                        </Button>
                    )}
                    {buttonData?.saveBtn && (
                        <Button loading={isLoadingOnSave} disabled={!buttonData?.formBtnActive} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">
                            {saveButtonName}
                        </Button>
                    )}
                    {}
                </Col>
            </Row>
        </div>
    );
};
