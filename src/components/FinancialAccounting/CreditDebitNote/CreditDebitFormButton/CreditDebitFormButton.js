/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const CreditDebitNoteFormButton = ({ record, onCloseAction, buttonData, setButtonData, saveButtonName = translateContent('global.buttons.saveAndNext'), handleButtonClick, isLoadingOnSave, isLastSection, handlePrintDownload }) => {
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.footerBtnLeft}>
                    {buttonData?.closeBtn && (
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.close')}
                        </Button>
                    )}

                    {buttonData?.cancelBtn && (
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    )}
                </Col>

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.footerBtnRight}>
                    {buttonData?.printBtn && (
                        <Button onClick={() => handlePrintDownload(record)} type="primary">
                            {translateContent('global.buttons.printReceipt')}
                        </Button>
                    )}

                    {buttonData?.editBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record, openDefaultSection: false })} type="primary">
                            {translateContent('global.buttons.edit')}
                        </Button>
                    )}

                    {buttonData?.cancelVoucher && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.CANCEL_VOUCHER, record })} type="primary">
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    )}

                    {buttonData?.nextBtn && !isLastSection && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.NEXT, record })} type="primary">
                            {translateContent('global.buttons.next')}
                        </Button>
                    )}

                    {buttonData?.saveBtn && (
                        <Button loading={isLoadingOnSave} disabled={!buttonData?.formBtnActive} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary" data-testid="save_next_btn">
                            {saveButtonName}
                        </Button>
                    )}

                    {buttonData?.continueBtn && (
                        <Button loading={isLoadingOnSave} disabled={!buttonData?.formBtnActive} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">
                            {isLastSection ? translateContent('global.buttons.submit') : translateContent('global.buttons.continue')}
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};
