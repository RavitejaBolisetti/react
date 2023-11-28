/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { Col, Row, Input, AutoComplete } from 'antd';
import LocationCard from './LocationCard';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { debounce } from 'utils/debounce';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';


const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ApplicationMaster: { dealerLocations = [] },
        },
    } = state;

    let returnValue = {
        userId,
        dealerLocations,
    };
    return returnValue;
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDealerLocations: applicationMasterDataActions.fetchDealerLocations,
            locationDataLoding: applicationMasterDataActions.locationDataLoding,
            showGlobalNotification,
        },
        dispatch
    ),
});

const AccessibleDealerLocationMain = ({ setCanFormSave, userId, dealerLocations, setFinalFormdata, finalFormdata, fetchDealerLocations, locationDataLoding, showGlobalNotification }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [searchValue, setSearchValue] = useState('');
    const [dealerLocationsList, setDealerLocationList] = useState([]);

    const fetchLocation = () => {
        if (searchValue?.length > 2) {
            fetchDealerLocations({ setIsLoading: locationDataLoding, searchParam: searchValue });
        }
    };

    const highlightFinalLocatonList = useMemo(
        () => (data) => {
            if (data?.length < 1) return [];
            let finalLocations = data?.map((item) => {
                const index = item?.dealerLocationName?.toLowerCase().indexOf(searchValue);
                const beforeStr = item?.dealerLocationName?.substring(0, index);
                const afterStr = item?.dealerLocationName?.slice(index + searchValue?.length);
                let locatonName =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value" style={{ color: 'red' }}>
                                {item?.dealerLocationName?.substring(index, index + searchValue?.length)}
                            </span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{item?.dealerLocationName}</span>
                    );
                return {
                    value: item?.dealerLocationName,
                    label: locatonName,
                };
            });
            return finalLocations;
        },
        [searchValue]
    );

    useEffect(() => {
        if (!searchValue || searchValue?.length < 3) {
            setDealerLocationList([]);
        } else {
            setDealerLocationList(highlightFinalLocatonList(dealerLocations) || []);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealerLocations, searchValue]);

    useEffect(() => {
        if (searchValue?.length >= 3 && userId) fetchLocation();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, userId]);

    const handleSelect = (value) => {
        let locationDetails = dealerLocations?.find((location) => location?.dealerLocationName === value);
        if (finalFormdata?.accessibleLocation?.findIndex((el) => el?.dealerMasterLocationId === locationDetails?.id) !== -1) {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('global.generalMessage.duplicateLocationMessage'), placement: 'bottomRight' });
            return;
        }
        setFinalFormdata((prev) => ({ ...prev, accessibleLocation: [...finalFormdata?.accessibleLocation, { dealerMasterLocationId: locationDetails?.id, locationName: value, id: '', status: true }] }));
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: translateContent('global.generalMessage.locationAddedSuccessfully'), placement: 'bottomRight' });
        setCanFormSave(true);
    };

    const onSearchLocation = debounce(function (text) {
        setSearchValue(text?.trim());
    }, 400);

    const handleDeleteLocation = (locationName, id, dealerMasterLocationId) => {
        setFinalFormdata((prev) => {
            const prevData = prev;
            const index = prev?.accessibleLocation?.findIndex((el) => el?.locationName === locationName);
            if (id) {
                prevData?.accessibleLocation?.splice(index, 1, { locationName, id, dealerMasterLocationId, status: false });
                return prevData;
            } else {
                prevData?.accessibleLocation?.splice(index, 1);
                return prevData;
            }
        });
        forceUpdate();
    };

    const handleClearInput = (val) => {
        if (val.target?.value) return;
        setSearchValue('');
        setDealerLocationList([]);
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.marB20}>
                    <AutoComplete options={dealerLocationsList} backfill={false} onSelect={handleSelect} onSearch={onSearchLocation} allowSearch notFoundContent={searchValue ? 'No location found' : ''}>
                        <Input.Search onChange={handleClearInput} size="large" allowClear placeholder={preparePlaceholderAutoComplete('')} />
                    </AutoComplete>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {finalFormdata?.accessibleLocation?.length > 0 &&
                        finalFormdata?.accessibleLocation?.filter(i=>i?.status).map((location) => location?.status && <LocationCard key={location?.id} {...location} handleDeleteLocation={handleDeleteLocation} />)}
                </Col>
            </Row>
        </>
    );
};

export const AccessibleDealerLocations = connect(mapStateToProps, mapDispatchToProps)(AccessibleDealerLocationMain);
