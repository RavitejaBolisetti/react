import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';

import { Col, Row, Input, AutoComplete } from 'antd';
import styles from '../../common/Common.module.css'
import { Fragment } from 'react';
import LocationCard from './LocationCard';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { debounce } from 'utils/debounce';


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
    const fieldNames = { value: 'dealerLocationName', key: 'id' };

    const handleSelect = (value) => {
        let locationDetails = dealerLocations?.find(location => location.dealerLocationName === value);
        
        if (finalFormdata?.accessibleLocation?.findIndex(el => el?.dealerMasterLocationId === locationDetails?.id) !== -1) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'This location is already added.' });
            return;
        }

        setFinalFormdata((prev) => ({ ...prev, accessibleLocation: [...finalFormdata?.accessibleLocation, { dealerMasterLocationId: locationDetails.id, dealerLocationName: value, id: '' }] }));
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Location added successfully'});
        
    };

    const onSearchLocation = debounce((text) => {
        if (text?.length < 3 || !userId) return;
        fetchDealerLocations({ setIsLoading: applicationMasterDataShowLoading, searchParam: text });
    }, 300);

    const handleDeleteLocation = (values) => {
        setFinalFormdata((prev) => {
            const prevData = prev;
            const index = prev?.accessibleLocation?.findIndex((el) => el?.dealerLocationName === values?.dealerLocationName);
            prevData?.accessibleLocation?.splice(index, 1);
            return prevData;
        });
        showGlobalNotification({ notificationType: 'success', title: 'Delete', message: 'Location deleted sucessfully.' });
        forceUpdate();
    };

    return (
        <Fragment>
            <Row gap={20}>
                <Col className={styles.autoCompleteContent} xs={24} sm={24} md={24} lg={24} xl={24}>
                    <AutoComplete
                        // value={value}
                        // labelInValue
                        options={dealerLocations}
                        style={{
                            width: '100%',
                          
                        }}
                        allowClear
                        fieldNames={fieldNames} 
                        onSelect={handleSelect}
                        onSearch={onSearchLocation}
                        // onChange={onChange}
                        // placeholder="control mode"
                        allowSearch
                    >  
                    <Input.Search size="large" placeholder={preparePlaceholderAutoComplete('Location name')} />
                    </AutoComplete>
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
