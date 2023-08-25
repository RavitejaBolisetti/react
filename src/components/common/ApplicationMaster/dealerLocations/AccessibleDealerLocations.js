/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { Col, Row, Input, AutoComplete } from 'antd';
import LocationCard from './LocationCard';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { debounce } from 'utils/debounce';
import { LANGUAGE_EN } from 'language/en';
import styles from 'components/common/Common.module.css';

const locationDeleteTitle = LANGUAGE_EN.GENERAL.REMOVE_DEALER_LOCATION.TITLE;
const locationDeleteMessage = LANGUAGE_EN.GENERAL.REMOVE_DEALER_LOCATION.MESSAGE.replace('{NAME}', 'Location');
const addDealerLocation = LANGUAGE_EN.GENERAL.ADD_DEALER_LOCATION.MESSAGE;
const addDealerLocationTitle = LANGUAGE_EN.GENERAL.ADD_DEALER_LOCATION.TITLE;
const addDuplicateDealerLocation = LANGUAGE_EN.GENERAL.ADD_DUPLICATE_DEALER_LOCATION.MESSAGE;
const addDuplicateDealerLocationTitle = LANGUAGE_EN.GENERAL.ADD_DUPLICATE_DEALER_LOCATION.TITLE;

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
                                {/* {searchString} */}
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
        if (!searchValue?.length > 2) {
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
            showGlobalNotification({ notificationType: 'error', title: addDuplicateDealerLocationTitle, message: addDuplicateDealerLocation, placement: 'bottomRight' });
            return;
        }
        setFinalFormdata((prev) => ({ ...prev, accessibleLocation: [...finalFormdata?.accessibleLocation, { dealerMasterLocationId: locationDetails?.id, locationName: value, id: '' }] }));
        showGlobalNotification({ notificationType: 'success', title: addDealerLocationTitle, message: addDealerLocation, placement: 'bottomRight' });
        setCanFormSave(true);
    };

    const onSearchLocation = debounce(function (text) {
        setSearchValue(text?.trim());
    }, 300);

    const handleDeleteLocation = (values) => {
        setFinalFormdata((prev) => {
            const prevData = prev;
            const index = prev?.accessibleLocation?.findIndex((el) => el?.locationName === values?.locationName);
            prevData?.accessibleLocation?.splice(index, 1);
            return prevData;
        });
        showGlobalNotification({ notificationType: 'success', title: locationDeleteTitle, message: locationDeleteMessage, placement: 'bottomRight' });
        forceUpdate();
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.marB20}>
                    <AutoComplete options={dealerLocationsList} backfill={false} onSelect={handleSelect} onSearch={onSearchLocation} allowSearch notFoundContent="No location found">
                        <Input.Search size="large" allowClear placeholder={preparePlaceholderAutoComplete('')} />
                    </AutoComplete>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {finalFormdata?.accessibleLocation?.length > 0
                        ? finalFormdata?.accessibleLocation?.map((location) => {
                              return <LocationCard key={location?.id} {...location} handleDeleteLocation={handleDeleteLocation} />;
                          })
                        : ''}
                </Col>
            </Row>
        </>
    );
};

export const AccessibleDealerLocations = connect(mapStateToProps, mapDispatchToProps)(AccessibleDealerLocationMain);
