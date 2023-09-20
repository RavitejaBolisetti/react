/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'assets/sass/app.module.scss';

export const VehicleInvoiceFormButton = ({ formActionType, record, onCloseAction, onCancelInvoice, onApproveCancel, buttonData, setButtonData, saveButtonName = 'Save & Next', handleButtonClick, isLoadingOnSave, isLastSection, onPrintInvoice }) => {
    //console.log('formActionType', formActionType);
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
                    {buttonData?.printInvoiceBtn && (
                        <Button onClick={() => onPrintInvoice(record)} type="primary">
                            Print Invoice
                        </Button>
                    )}
                    {buttonData?.cancelInvoiceBtn && (
                        <Button onClick={onCancelInvoice} type="primary">
                            Cancel Invoice
                        </Button>
                    )}
                    {buttonData?.approveCancelBtn && (
                        <Button onClick={onApproveCancel} type="primary">
                            Approve
                        </Button>
                    )}
                    {/* {buttonData?.editBtn && (
                    <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record, openDefaultSection: false })} type="primary">
                        Edit
                    </Button>
                )} */}
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
