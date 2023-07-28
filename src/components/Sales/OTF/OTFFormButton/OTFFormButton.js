/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Popover } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from './OTFFormButton.module.css';

export const OTFFormButton = ({ record, handleChangeHistory, onCloseAction, buttonData, setButtonData, saveButtonName = 'Save & Next', handleButtonClick, isLoadingOnSave, isLastSection }) => {
    const content = <div>Coming Soon</div>;
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.footerBtnLeft}>
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

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.footerBtnRight}>
                    {buttonData?.editBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record, openDefaultSection: false })} type="primary">
                            Edit
                        </Button>
                    )}

                    {buttonData?.allotBtn && (
                        <Popover content={content} trigger="hover">
                            <Button onClick={() => {}} type="primary">
                                Allot
                            </Button>
                        </Popover>
                    )}

                    {buttonData?.unAllotBtn && (
                        <Popover content={content} trigger="hover">
                            <Button onClick={() => {}} type="primary">
                                Un-Allot
                            </Button>
                        </Popover>
                    )}

                    {buttonData?.invoiceBtn && (
                        <Popover content={content} trigger="hover">
                            <Button onClick={() => {}} type="primary">
                                Invoice
                            </Button>
                        </Popover>
                    )}

                    {buttonData?.deliveryNoteBtn && (
                        <Popover content={content} trigger="hover">
                            <Button onClick={() => {}} type="primary">
                                Delivery Note
                            </Button>
                        </Popover>
                    )}

                    {buttonData?.transferOTFBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.TRANSFER_OTF, record })} type="primary">
                            Transfer OTF
                        </Button>
                    )}

                    {buttonData?.cancelOTFBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.CANCEL_OTF, record })} type="primary">
                            Cancel OTF
                        </Button>
                    )}

                    {buttonData?.changeHistory && (
                        <Button onClick={handleChangeHistory} type="primary">
                            Change History
                        </Button>
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
                </Col>
            </Row>
        </div>
    );
};
