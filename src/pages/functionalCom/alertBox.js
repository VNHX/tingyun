import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import './alertBox.css';

class AlertBox extends Component {
    componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }

    render() {
        let {
            alertText = '提示文字'
        } = this.props;
        return (
            <div className='alertBox'>
                <div className='alertText'>{alertText}</div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        alertText: state.vars.alertText
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        willMount: () => {

        },
        init: () => {

        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox);