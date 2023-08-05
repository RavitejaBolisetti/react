/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { useState } from 'react';
import { Button } from 'antd';
import { QUERY_BUTTONS } from './QueryButtonsConstant';
import styles from 'components/common/Common.module.css';
export const QueryButtons = ({ handleButtonQuery, queryButtons, setqueryButtons }) => {
    const handleQuery = (name) => {
        handleButtonQuery(name);
        setqueryButtons({ pending: false, approved: false, rejected: false, [name]: true });
    };
    return (
        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
            <Button onClick={() => handleQuery(QUERY_BUTTONS?.PENDING?.key)} type={queryButtons?.pending ? 'primary' : 'link'}>
                {QUERY_BUTTONS?.PENDING?.title}
            </Button>
            <Button onClick={() => handleQuery(QUERY_BUTTONS?.APPROVED?.key)} type={queryButtons?.approved ? 'primary' : 'link'}>
                {QUERY_BUTTONS?.APPROVED?.title}
            </Button>
            <Button onClick={() => handleQuery(QUERY_BUTTONS?.REJECTED?.key)} type={queryButtons?.rejected ? 'primary' : 'link'}>
                {QUERY_BUTTONS?.REJECTED?.title}
            </Button>
        </div>
    );
};
