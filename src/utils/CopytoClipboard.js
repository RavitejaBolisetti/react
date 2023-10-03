/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FiCopy } from 'react-icons/fi';
import { Button } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
        },
        dispatch
    ),
});

const CopytoClipboardMaster = (props) => {
    const { text, type = 'link', buttonText, showGlobalNotification } = props;

    const handleClick = () => {
        text && navigator.clipboard.writeText(text);
        showGlobalNotification({ notificationType: 'success', title: 'Copied', message: '' });
    };
    if (!text) return '';
    return (
        <Button type={type} onClick={handleClick} icon={<FiCopy className={type === 'link' ? styles.activeForm : ''} />} className={` ${styles.marL5}`}>
            {buttonText}
        </Button>
    );
};
export const CopytoClipboard = connect(null, mapDispatchToProps)(CopytoClipboardMaster);
