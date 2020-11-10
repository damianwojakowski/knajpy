import React, {Component} from 'react';
import './styles.css';
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import {unselectMarker, addMarker} from '../../common/actions/markerActions.js';
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

        this.initialState = {
            name: "",
            description: "",
            openFrom: "",
            openTo: "",
            lat: "",
            lng: "",
            id: ""
        };

        this.state = this.initialState;
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

        let newMarker = Object.assign({}, this.state, {
            lat: this.props.selectedMarker.lat,
            lng: this.props.selectedMarker.lng,
            id: this.props.selectedMarker.id
        });

        this.props.addMarker(newMarker);
        this.props.unselectMarker();

        this.setState(this.initialState);
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
                        <div className="form-group">
                            <label>Open From:</label><br />
                            <TimePicker
                                onChange={this.onChangeOpenFrom}
                                value={this.state.openFrom}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="open_to">Open To:</label><br />
                            <TimePicker
                                onChange={this.onChangeOpenTo}
                                value={this.state.openTo}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name_input">Name</label>
                            <input id="name_input" className="form-control" type="text" value={this.state.name} onChange={this.onChangeName} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" id="description" value={this.state.description} onChange={this.onChangeDescription} required />
                        </div>

                        <input className="btn btn-primary" type="submit" value="Add Marker" />
                    </form>
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
        unselectMarker: () => dispatch(unselectMarker()),
        addMarker: marker => dispatch(addMarker(marker)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailWindow);