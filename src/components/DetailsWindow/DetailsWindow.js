import React, {Component} from 'react';
import './styles.css';
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import {unselectMarker} from '../../common/actions/markerActions.js';

class DetailWindow extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.unselectMarker();
    }

    render() {
        return (
            <CSSTransition
                in={this.props.isSelected}
                unmountOnExit
                timeout={1000}
                classNames="menu-primary"
            >
                <div className="menu">
                    <h1 onClick={this.close}>Details Window</h1>
                    <div>id: {this.props.selectedMarker.id}</div>
                    <div>lat: {this.props.selectedMarker.id}</div>
                    <div>lng: {this.props.selectedMarker.id}</div>
                </div>
            </CSSTransition>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSelected: state.markers.isSelected,
        selectedMarker: state.markers.selectedMarker
    };
};

const mapDispatchToProps = dispatch => {
    return {
        unselectMarker: () => dispatch(unselectMarker())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailWindow);