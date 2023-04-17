import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { addToolTip } from 'utils/customMenuLink';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';

import { Col, Row, Select, Modal, AutoComplete } from 'antd';

import { Fragment } from 'react';
import LocationCard from './LocationCard';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';


const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ApplicationMaster: { dealerLocations },
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
            applicationMasterDataShowLoading: applicationMasterDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const AccessibleDealerLocationMain = ({ userId, dealerLocations, setFinalFormdata, finalFormdata, fetchDealerLocations, applicationMasterDataShowLoading, showGlobalNotification }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const fieldNames = { label: 'dealerLocationName', value: 'id' };

    function debounce(func, timeout = 400) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    const handleSelect = (value) => {

        if(finalFormdata?.accessibleLocation.findIndex(el => el?.id === value?.key ) !== -1){
            console.log('same locatioln selected')
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'This location is already added.' });
            return;
        }

        setFinalFormdata((prev) => ({ ...prev, accessibleLocation: [...finalFormdata?.accessibleLocation, { id: value?.key, dealerLocationName: value?.label }] }));
    };

    const onSearchLocation = debounce((text) => {
        if (text?.length < 3 || !userId) return;
        fetchDealerLocations({ setIsLoading: applicationMasterDataShowLoading, searchParam: text });
    });

    const handleDeleteLocation = (values) => {
        setFinalFormdata((prev) => {
            const prevData = prev;
            const index = prev?.accessibleLocation?.findIndex((el) => el?.dealerLocationName === values?.dealerLocationName);
            prevData?.accessibleLocation?.splice(index, 1);
            return prevData;
        });
        forceUpdate();
    };

    return (
        <Fragment>
            <Row gap={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <AutoComplete
                        // value={value}
                        labelInValue
                        options={dealerLocations}
                        style={{
                            width: '100%',
                        }}
                        allowClear
                        fieldNames={fieldNames}
                        onSelect={handleSelect}
                        onSearch={onSearchLocation}
                        // onChange={onChange}
                        placeholder="control mode"
                    />

                    {/* <Select
                        // defaultValue={record[dataIndex]}
                        getPopupContainer={(triggerNode) => triggerNode.parentElement}
                        labelInValue
                        showSearch
                        placeholder="Select accesable location"
                        optionFilterProp="children"
                        fieldNames={fieldNames}
                        style={{
                            width: '100%',
                        }}
                        onSelect={handleSelect}
                        onSearch={onSearchLocation}
                        filterOption={(input, option) => (option?.dealerLocationName ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={dealerLocations}
                    /> */}
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {finalFormdata?.accessibleLocation?.length > 0
                        ? finalFormdata?.accessibleLocation?.map((location) => {
                              return <LocationCard {...location} handleDeleteLocation={handleDeleteLocation} />;
                          })
                        : ''}
                </Col>
            </Row>
        </Fragment>
    );
};

export const AccessibleDealerLocations = connect(mapStateToProps, mapDispatchToProps)(AccessibleDealerLocationMain);
