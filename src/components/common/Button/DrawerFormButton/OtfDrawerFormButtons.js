import { Button, Row, Col } from 'antd';
import React from 'react';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';
import styles from './DrawerFormButton.module.css';

const otfDrawerButtons = ({ buttonData, id = { edit: 'edit', allot: 'allot', invoice: 'invoice', Transfer: 'Transfer', Next: 'Next' }, loader, onCloseAction, handleButtonClick, formData }) => {
    return (
        <Row gutter={20} className={styles.formFooter}>
            <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                {buttonData?.closeBtn && (
                    <Button danger onClick={onCloseAction}>
                        Close
                    </Button>
                )}
            </Col>
            <Col xs={24} sm={20} md={20} lg={20} xl={20} className={styles.footerBtnRight}>
                {buttonData?.editBtn && (
                    <Button type="primary" form={id?.edit} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.EDIT, record: formData })}>
                        Edit
                    </Button>
                )}
                {buttonData?.cancelBtn && (
                    <Button type="primary" onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.CANCEL, record: formData })}>
                        Cancel
                    </Button>
                )}
                {buttonData?.allotbtn && (
                    <Button type="primary" form={id?.allot} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.ALLOT, record: formData })}>
                        Allot
                    </Button>
                )}
                {buttonData?.invoiceBtn && (
                    <Button type="primary" form={id?.invoice} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.INVOICE, record: formData })}>
                        Invoice
                    </Button>
                )}
                {buttonData?.transferBtn && (
                    <Button type="primary" form={id?.Transfer} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.TRANSFER, record: formData })}>
                        Transfer
                    </Button>
                )}
                {buttonData?.nextBtn && (
                    <Button type="primary" form={id?.Next} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                        Next
                    </Button>
                )}
            </Col>
        </Row>
    );
};
export const Otfbuttons = otfDrawerButtons;