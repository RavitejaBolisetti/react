/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline, Button, Row,Col } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';
import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';



import { DEMANDFORECASTING_SECTION } from 'constants/modules/demandForecasting/demandForecastingSections';

const MenuNav = (props) => {
    const { customerType, currentSection, setCurrentSection, formActionType, buttonData, setNextCurrentSection } = props;
    const profileOptions = Object.values(DEMANDFORECASTING_SECTION );
    const { previousSection } = props;

    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const onHandle = (key) => {
        setCurrentSection(key);
        // if (buttonData?.formBtnActive) {
        //     //setIsUnsavedDataPopup(true);
        //     setNextCurrentSection(key);
        // } else {
        //     setCurrentSection(key);
        // }
    };

    const items = profileOptions
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            // dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
            children: (
                // <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection) ? onHandle(item?.id) : '')}>
                //     {item.title}
                // </div>
                <div>
                    <Row gutter={20} >
                        <Col  xs={24} sm={20} md={20} lg={20} xl={20}>

                        <Button type="primary">Upload Forecasting Data</Button>
                        </Col>                        
                    </Row>
                    <Row gutter={20} className={styles.marT5}>
                    <Col  xs={24} sm={20} md={20} lg={20} xl={20}>
                        
                        <Button type="primary">Download Template</Button>
                        </Col>
                    </Row>                  

                </div>
            ),
           
            // className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
        }))
        .filter((i) => i);

    return items && <Timeline items={items} />;
};

export default MenuNav;