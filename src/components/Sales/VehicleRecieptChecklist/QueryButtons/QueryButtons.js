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
            {Object.keys(QUERY_BUTTONS)?.map((element, index) => {
                return (
                    <Button onClick={() => handleQuery(QUERY_BUTTONS[element]?.key)} type={queryButtons[QUERY_BUTTONS[element]?.key] ? 'primary' : 'link'}>
                        {QUERY_BUTTONS[element]?.title}
                    </Button>
                );
            })}
        </div>
    );
};
