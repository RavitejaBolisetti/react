/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Row, Col } from 'antd';
import React from 'react';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const OTFFormButton = ({ buttonData, id = { edit: 'edit', transfer: 'transfer', cancel: 'cancelOTF', allot: 'allot', unallot: 'unallot', invoice: 'invoice', deliverynote: 'deliveryNote', Next: 'myform' }, loader, onCloseAction, handleButtonClick, formData }) => {
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={2} md={2} lg={2} xl={2}>
                    <Button danger onClick={onCloseAction}>
                        Close
                    </Button>
                </Col>

                <Col xs={24} sm={22} md={22} lg={22} xl={22} className={styles.buttonsGroupRight}>
                    {buttonData?.editBtn && (
                        <Button type="primary" form={id?.edit} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.EDIT, record: formData })}>
                            Edit
                        </Button>
                    )}

                    {buttonData?.transferBtn && (
                        <Button type="primary" form={id?.edit} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.EDIT, record: formData })}>
                            Transfer
                        </Button>
                    )}
                    {buttonData?.cancelBtn && (
                        <Button type="primary" onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.CANCEL, record: formData })}>
                            Cancel OTF
                        </Button>
                    )}

                    {buttonData?.allotBtn && (
                        <Button type="primary" form={id?.allot} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.ALLOT, record: formData })}>
                            Allot
                        </Button>
                    )}
                    {buttonData?.unallotBtn && (
                        <Button type="primary" form={id?.allot} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.ALLOT, record: formData })}>
                            Un-Allot
                        </Button>
                    )}

                    {buttonData?.invoiceBtn && (
                        <Button type="primary" form={id?.invoice} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.INVOICE, record: formData })}>
                            Invoice
                        </Button>
                    )}

                    {buttonData?.deliverBtn && (
                        <Button type="primary" form={id?.deliverynote} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                            Delivery Note
                        </Button>
                    )}
                    {buttonData?.nextBtn && (
                        <Button type="primary" form={id?.Next} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                            Next
                        </Button>
                    )}
                    {buttonData?.saveNext && (
                        <Button type="primary" htmlType="submit" form={id?.Next} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                            Save & Next
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default OTFFormButton;
