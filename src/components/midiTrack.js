import React, { Component } from 'react';
import MidiSelector from './midiSelector.js';

class MidiTrack extends Component {

  constructor(props) {
    super(props);
    this.selectMidiInputPort = this.selectMidiInputPort.bind(this);
    this.selectMidiOutputPort = this.selectMidiOutputPort.bind(this);
    this.state = {
      selectedMidiInputPort: null,
      selectedMidiOutputPort: null
    };
  }

  selectMidiInputPort(event) {
    console.log('selectMidiInputPort', event.target.value);
    const selectedMidiInputPort = this.props.midiInputPorts.find(midiPort => {
      return midiPort.id === event.target.value;
    })
    this.setState({ selectedMidiInputPort: selectedMidiInputPort });
  }

  selectMidiOutputPort(event) {
    console.log('selectMidiOutputPort', event.target.value);
    const selectMidiOutputPort = this.props.midiOutputPorts.find(midiPort => {
      return midiPort.id === event.target.value;
    })
    this.setState({ selectMidiOutputPort: selectMidiOutputPort });
  }

  handleChange(event) {
    const selectedMidiPort = this.props.midiPorts.find(midiPort => {
      return midiPort.id === event.target.value;
    })
    this.setState({ selectedMidiPort: selectedMidiPort });
  }

  render() {
    return (
      <div className="MidiTrack row">
        <div className="col">
          <div className="row">
            <div className="col">
              Track {this.props.id}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p><span className="badge badge-secondary">Input</span></p>
              <MidiSelector
                selectMidiPort={this.selectMidiInputPort}
                midiPorts={this.props.midiInputPorts} />
            </div>
            <div className="col">
              <p><span className="badge badge-secondary">Output</span></p>
              <MidiSelector
                selectMidiPort={this.selectMidiOutputPort}
                midiPorts={this.props.midiOutputPorts} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MidiTrack;