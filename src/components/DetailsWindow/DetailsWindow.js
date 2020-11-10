import React, {Component} from 'react';
import './styles.css';
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import {unselectNewMarker, saveMarker, exitPreview} from '../../common/actions/markerActions.js';
import TimePicker from 'react-time-picker';
import {Icon} from 'react-icons-kit'
import {cross} from 'react-icons-kit/icomoon/cross'

class DetailWindow extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeOpenFrom = this.onChangeOpenFrom.bind(this);
        this.onChangeOpenTo = this.onChangeOpenTo.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        // TODO: Create a model for Markers
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
        if (this.props.isBeingPrepared) {
            this.props.unselectNewMarker();
        } else {
            this.props.exitPreview();
        }
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
            lat: this.props.newMarkerPosition.lat,
            lng: this.props.newMarkerPosition.lng,
            id: this.props.newMarkerPosition.id,
            draft: false
        });

        this.props.saveMarker(newMarker);
        this.props.unselectNewMarker();

        this.setState(this.initialState);
    }

    render() {
        return (
            <CSSTransition
                in={(this.props.isBeingPrepared || this.props.isViewed)}
                unmountOnExit
                timeout={1000}
                classNames="menu-primary"
            >
                <div className="menu">
                    <Icon style={{cursor: "pointer", float: "right"}} onClick={this.close} icon={cross}/>
                    <h3>Details</h3>

                    {this.props.isBeingPrepared === true && <form onSubmit={this.handleSubmit}>
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
                            <input id="name_input" className="form-control" type="text" value={this.state.name}
                                   onChange={this.onChangeName} required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" id="description" value={this.state.description}
                                      onChange={this.onChangeDescription} required/>
                        </div>

                        <input className="btn btn-primary" type="submit" value="Add Marker"/>
                    </form>
                    }

                    {this.props.isViewed === true && <div>
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">{this.props.previewMarker.name}</h5>
                                <p className="card-text">{this.props.previewMarker.description}</p>
                                <p>Open From: {this.props.previewMarker.openFrom}</p>
                                <p>Open To: {this.props.previewMarker.openTo}</p>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </CSSTransition>
        )
    }
}

const mapStateToProps = state => {
    return {
        isBeingPrepared: state.markers.isBeingPrepared,
        newMarkerPosition: state.markers.newMarkerPosition,
        isViewed: state.markers.isViewed,
        previewMarker: state.markers.previewMarker
    };
};

const mapDispatchToProps = dispatch => {
    return {
        unselectNewMarker: () => dispatch(unselectNewMarker()),
        saveMarker: marker => dispatch(saveMarker(marker)),
        exitPreview: () => dispatch(exitPreview()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailWindow);