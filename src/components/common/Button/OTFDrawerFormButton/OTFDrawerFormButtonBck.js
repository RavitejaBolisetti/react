/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Row, Col } from 'antd';
import React from 'react';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const OTFFormButton = ({ buttonData, id = { edit: 'edit', transfer: 'transfer', cancel: 'cancelOTF', allot: 'allot', unallot: 'unallot', invoice: 'invoice', deliverynote: 'deliveryNote', Next: 'myform' }, onCloseAction, handleButtonClick, formData }) => {
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={2} md={2} lg={2} xl={2}>
                    <Button danger onClick={onCloseAction}>
                        {translateContent('global.buttons.close')}
                    </Button>
                </Col>

                <Col xs={24} sm={22} md={22} lg={22} xl={22} className={styles.buttonsGroupRight}>
                    {buttonData?.editBtn && (
                        <Button type="primary" form={id?.edit} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.EDIT, record: formData })}>
                            {translateContent('global.buttons.edit')}
                        </Button>
                    )}

                    {buttonData?.transferBtn && (
                        <Button type="primary" form={id?.edit} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.EDIT, record: formData })}>
                            {translateContent('global.buttons.transfer')}
                        </Button>
                    )}
                    {buttonData?.cancelBtn && (
                        <Button type="primary" onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.CANCEL, record: formData })}>
                            {translateContent('global.buttons.cancelBooking')}
                        </Button>
                    )}

                    {buttonData?.allotBtn && (
                        <Button type="primary" form={id?.allot} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.ALLOT, record: formData })}>
                            {translateContent('global.buttons.allot')}
                        </Button>
                    )}
                    {buttonData?.unallotBtn && (
                        <Button type="primary" form={id?.allot} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.ALLOT, record: formData })}>
                            {translateContent('global.buttons.unAllot')}
                        </Button>
                    )}

                    {buttonData?.invoiceBtn && (
                        <Button type="primary" form={id?.invoice} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.INVOICE, record: formData })}>
                            {translateContent('global.buttons.invoice')}
                        </Button>
                    )}

                    {buttonData?.deliverBtn && (
                        <Button type="primary" form={id?.deliverynote} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                            {translateContent('global.buttons.deliveryNote')}
                        </Button>
                    )}
                    {buttonData?.nextBtn && (
                        <Button type="primary" form={id?.Next} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                            {translateContent('global.buttons.next')}
                        </Button>
                    )}
                    {buttonData?.saveNext && (
                        <Button type="primary" htmlType="submit" form={id?.Next} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                            {translateContent('global.buttons.saveAndNext')}
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default OTFFormButton;
