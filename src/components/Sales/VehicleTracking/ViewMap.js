/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { Col, Row } from 'antd';

export const ViewTimelineMain = (props) => {
    const { styles } = props;
    const { buttonData, setButtonData, handleButtonClick, formData, onCloseAction, modifiedArray } = props;

    const [googleMapKey, setGoogleMapKey] = useState();
    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    useEffect(() => {
        setGoogleMapKey({
            bootstrapURLKeys: { key: process.env.REACT_APP_GOOGLE_MAP_KEY },
            center: {
                lat: +formData?.currentLatitude,
                lng: +formData?.currentLongitude,
            },
            zoom: 11,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const renderMarkers = (map, maps) => {
        const markers = [];
        modifiedArray.map((data) => {
            markers.push(new maps.Marker({ position: data, map }));
            return undefined;
        });
        return markers;
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {googleMapKey && <GoogleMapReact {...googleMapKey} yesIWantToUseGoogleMapApiInternals onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)} />}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </>
    );
};

export const ViewMap = withDrawer(ViewTimelineMain, { width: '90%' });
