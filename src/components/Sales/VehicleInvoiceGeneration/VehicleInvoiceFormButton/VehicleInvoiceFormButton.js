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
import { DOCUMENT_CONSTANTS } from '../Constants';

export const VehicleInvoiceFormButton = ({ record, onCloseAction, onCancelInvoice, buttonData, setButtonData, saveButtonName = translateContent('global.buttons.saveAndNext'), handleButtonClick, isLoading, isLoadingOnSaveInvoice: isLoadingOnSave = false, isLastSection, onPrintInvoice, onPrintForm21, setReportDetail, onPrintDocument }) => {
    const disabled = isLoading || isLoadingOnSave;
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.buttonsGroupLeft}>
                    {buttonData?.closeBtn && (
                        <Button disabled={disabled} danger onClick={onCloseAction}>
                            {translateContent('global.buttons.close')}
                        </Button>
                    )}

                    {buttonData?.cancelBtn && (
                        <Button disabled={disabled} danger onClick={onCloseAction}>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    )}
                </Col>

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.buttonsGroupRight}>
                    {buttonData?.printForm21Btn && (
                        <Button
                            onClick={() => {
                                setReportDetail();
                                onPrintDocument({ ...record, reportType: DOCUMENT_CONSTANTS?.FORM_21?.key });
                            }}
                            disabled={disabled}
                            danger
                        >
                            {translateContent('global.buttons.printForm21')}
                        </Button>
                    )}

                    {buttonData?.printInvoiceBtn && (
                        <Button
                            onClick={() => {
                                setReportDetail();
                                onPrintDocument({ ...record, reportType: DOCUMENT_CONSTANTS?.INVOICE?.key });
                            }}
                            disabled={disabled}
                            danger
                        >
                            {translateContent('global.buttons.printInvoice')}
                        </Button>
                    )}

                    {buttonData?.cancelInvoiceBtn && (
                        <Button disabled={disabled} onClick={onCancelInvoice} danger>
                            {translateContent('global.buttons.cancelInvoice')}
                        </Button>
                    )}

                    {buttonData?.nextBtn && !isLastSection && (
                        <Button disabled={disabled} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.NEXT, record, isNextBtnClick: true })} type="primary">
                            {translateContent('global.buttons.next')}
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
