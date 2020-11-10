import React, {Component} from 'react';
import './styles.css';
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import {unselectMarker} from '../../common/actions/markerActions.js';
import TimePicker from 'react-time-picker';

class DetailWindow extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeOpenFrom = this.onChangeOpenFrom.bind(this);
        this.onChangeOpenTo = this.onChangeOpenTo.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.state = {
            name: "",
            description: "",
            openFrom: "",
            openTo: "",
            lat: "",
            lng: "",
            id: ""
        };
    }

    close() {
        this.props.unselectMarker();
    }

    onChangeOpenFrom(openFrom) {
        this.setState({
            openFrom: openFrom
        });
    }

    onChangeOpenTo(openTo) {
        this.setState({
            openTo: openTo
        });
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        this.setState({
            lat: this.props.selectedMarker.lat,
            lng: this.props.selectedMarker.lng,
            id: this.props.selectedMarker.id
        });
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

                    <form onSubmit={this.handleSubmit}>
                        <p>Open from:</p>
                        <TimePicker
                            onChange={this.onChangeOpenFrom}
                            value={this.state.openFrom}
                            required
                        />
                        <br />
                        <p>Open to:</p>
                        <TimePicker
                            onChange={this.onChangeOpenTo}
                            value={this.state.openTo}
                            required
                        />
                        <br />
                        <p>Bar Name:</p>
                        <input type="text" value={this.state.name} onChange={this.onChangeName} required />
                        <br />
                        <p>Bar Description:</p>
                        <textarea value={this.state.description} onChange={this.onChangeDescription} required />
                        <br />
                        <input type="submit" value="Add Marker" />
                    </form>

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