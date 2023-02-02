import { connect } from 'react-redux';
import { Col, Row } from 'antd';

import { withLayoutMaster } from 'components/withLayoutMaster';
import styles from './TrainingPage.module.css';

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };

    return returnValue;
};

const TrainingPageBase = (props) => {
    return (
        <Row>
            <Col>Coming Soon! </Col>
        </Row>
    );
};

export const TrainingPage = connect(mapStateToProps, null)(withLayoutMaster(TrainingPageBase));
