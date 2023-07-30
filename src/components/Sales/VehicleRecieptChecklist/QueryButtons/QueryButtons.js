/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { useState } from 'react';
import { Button } from 'antd';
import { QUERY_BUTTONS } from './QueryButtonConstants';
import styles from 'components/common/Common.module.css';
export const QueryButtons = ({ handleButtonQuery }) => {
    const MapKeys = (value = false) => {
        if (!value) {
            let QueryResult = {};
            for (const key in QUERY_BUTTONS) {
                QueryResult = { ...QueryResult, [QUERY_BUTTONS?.[key]?.intialValue[0]]: QUERY_BUTTONS?.[key]?.intialValue[1] };
            }
            return QueryResult;
        } else {
            for (const key in value) {
                value[key] = false;
            }
            return value;
        }
    };

    const queryButtonVisibility = MapKeys();
    const [queryButtons, setqueryButtons] = useState({ ...queryButtonVisibility });
    const handleQuery = (name) => {
        handleButtonQuery(name);
        setqueryButtons({ ...MapKeys(queryButtons), [name]: true });
    };
    return (
        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
            <Button onClick={() => handleQuery(QUERY_BUTTONS?.ALL?.key)} type={queryButtons?.all ? 'primary' : 'link'}>
                {QUERY_BUTTONS?.ALL?.title}
            </Button>
            <Button onClick={() => handleQuery(QUERY_BUTTONS?.PENDING?.key)} type={queryButtons?.pending ? 'primary' : 'link'}>
                {QUERY_BUTTONS?.PENDING?.title}
            </Button>
            <Button onClick={() => handleQuery(QUERY_BUTTONS?.PARTIALLY_COMPLETED?.key)} type={queryButtons?.partially ? 'primary' : 'link'}>
                {QUERY_BUTTONS?.PARTIALLY_COMPLETED?.title}
            </Button>
            <Button onClick={() => handleQuery(QUERY_BUTTONS?.COMPLETED?.key)} type={queryButtons?.completed ? 'primary' : 'link'}>
                {QUERY_BUTTONS?.COMPLETED?.title}
            </Button>
        </div>
    );
};
