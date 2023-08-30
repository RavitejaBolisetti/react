import React from 'react';
import { Drawer, Button } from 'antd';
import { connect } from 'react-redux';

import styles from "./crudViewPage.module.scss";
//import styles from "./crudViewPage.module.css";

import { IS_THEME_1 } from "constants/config";


// import styles from './withFullDrawer.module.css'


export const crudViewPage = ({ mapStateToProps, viewAction, ViewDetailsPage, ViewCRFDetailsPage = undefined, title }) => {
    const mapDispatchToProps = {
        hideModal: viewAction.hideModal,
    }
    const ViewPage = ({ isVisible, data, hideModal }) => (
        <Drawer
            title={title}
            width="100%"
            onClose={hideModal}
            visible={isVisible}
            placement='top'
            height="100%"
            className={IS_THEME_1 ? styles.crudViewPage1 : styles.crudViewPage}
            keyboard={false}
            maskClosable={false}
        >
            {isVisible && (<ViewDetailsPage data={data} />)}
            {isVisible && ViewCRFDetailsPage && (<ViewCRFDetailsPage data={data} />)}
            <div className={styles.footerSection}>
                <Button onClick={hideModal} type="primary">
                    OK
            </Button>
            </div>


        </Drawer>
    );
    return connect(mapStateToProps, mapDispatchToProps)(ViewPage);
};
