/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const CoDealerFormButton = ({ handleInvoicePrint, record, onCloseAction, onCancelDeliveryNote, buttonData, setButtonData, saveButtonName = 'Save & Next', handleButtonClick, isLoading, isLoadingOnSave, isLastSection, cancelInvoiceBtnName = translateContent('coDealer.button.cancelInvoice'), PrintButtonName = 'Print Delivery Note', nextBtnName = translateContent('global.buttons.continue') }) => {
    const disabled = isLoading || isLoadingOnSave;
    const disabledProps = { disabled };
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.buttonsGroupLeft}>
                    {buttonData?.closeBtn && (
                        <Button {...disabledProps} danger onClick={onCloseAction}>
                            {translateContent('global.buttons.close')}
                        </Button>
                    )}

                    {buttonData?.cancelBtn && (
                        <Button {...disabledProps} danger onClick={onCloseAction}>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    )}
                </Col>

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.buttonsGroupRight}>
                    {buttonData?.printInvoiceBtn && (
                        <Button {...disabledProps} loading={isLoadingOnSave} onClick={() => handleInvoicePrint({ buttonAction: FROM_ACTION_TYPE.PRINT_INVOICE, record })} danger>
                            Print Invoice
                        </Button>
                    )}
                    {buttonData?.editBtn && (
                        <Button {...disabledProps} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record, openDefaultSection: false })} type="primary">
                            {translateContent('global.buttons.edit')}
                        </Button>
                    )}

                    {buttonData?.cancelInvoice && (
                        <Button {...disabledProps} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.CANCEL_INVOICE, record })} danger>
                            {cancelInvoiceBtnName}
                        </Button>
                    )}

                    {buttonData?.nextBtn && !isLastSection && (
                        <Button {...disabledProps} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.NEXT, record })} type="primary">
                            {nextBtnName}
                        </Button>
                    )}

                    {buttonData?.saveBtn && (
                        <Button loading={isLoadingOnSave} disabled={!buttonData?.formBtnActive || disabled} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">
                            {saveButtonName}
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};
