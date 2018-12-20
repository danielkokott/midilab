import React, { Component } from 'react';
import MidiSelector from './midiSelector.js';
import MidiTrackControls from './midiTrackControls';

import StepSequencer from './stepSequencer.js';
import Arpeggiator from './arpeggiator.js';

class MidiTrack extends Component {

  constructor(props) {
    super(props);
    this.selectMidiInputPort = this.selectMidiInputPort.bind(this);
    this.selectMidiOutputPort = this.selectMidiOutputPort.bind(this);
    this.onMIDIMessage = this.onMIDIMessage.bind(this);
    this.state = {
      selectedMidiInputPort: null,
      selectedMidiOutputPort: null
    };
  }

  onMIDIMessage(event) {
    if(this.state.selectedMidiOutputPort) {
      console.log('event', this.state.selectedMidiOutputPort, event.data);
      this.state.selectedMidiOutputPort.send(event.data);
    }
  }

  selectMidiInputPort(event) {
    const selectedMidiInputPort = this.props.midiInputPorts.find(midiPort => {
      return midiPort.id === event.target.value;
    });

    if(selectedMidiInputPort) {
      // We close the old port
      if (this.state.selectedMidiInputPort && this.state.selectedMidiInputPort.id !== selectedMidiInputPort.id) {
        this.state.selectedMidiInputPort.close();
      }
      selectedMidiInputPort.onmidimessage = this.onMIDIMessage;
      selectedMidiInputPort.open();
    }

    this.setState({ selectedMidiInputPort: selectedMidiInputPort });
  }

  selectMidiOutputPort(event) {
    const selectedMidiOutputPort = this.props.midiOutputPorts.find(midiPort => {
      return midiPort.id === event.target.value;
    });    
    
    if(selectedMidiOutputPort) {
      // We close the old port
      if (this.state.selectedMidiOutputPort && this.state.selectedMidiOutputPort.id !== selectedMidiOutputPort.id) {
        this.state.selectedMidiOutputPort.close();
      }
      selectedMidiOutputPort.open();
    }

    this.setState({ selectedMidiOutputPort: selectedMidiOutputPort });
  }

  render() {
    return (
      <div className="MidiTrack row">
        <div className="col">
          {/* <div className="row">
            <div className="col">
              Track {this.props.id}
            </div>
          </div> */}
          <div className="row">
            <div className="col">
              <p>
                <span className="badge badge-secondary">Input</span>
                <span className="miniInputDot"></span>
              </p>
              <MidiSelector
                selectMidiPort={this.selectMidiInputPort}
                availableMidiPorts={this.props.midiInputPorts} />
            </div>
            <div className="col">
              <p><span className="badge badge-secondary">Output</span></p>
              <MidiSelector
                selectMidiPort={this.selectMidiOutputPort}
                availableMidiPorts={this.props.midiOutputPorts} />
            </div>
          </div>

          <MidiTrackControls />
          
          <StepSequencer />

          <Arpeggiator selectedMidiOutputPort={this.state.selectedMidiOutputPort} />

        </div>
      </div>
    );
  }
}

export default MidiTrack;