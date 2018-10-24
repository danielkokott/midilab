import React, { Component } from 'react';
import MidiTrack from './components/midiTrack.js';

class MidiLab extends Component {

  constructor(props) {
    super(props);
    this.onMIDISuccess = this.onMIDISuccess.bind(this);
    this.onMIDIFailure = this.onMIDIFailure.bind(this);
    this.onMIDIChange = this.onMIDIChange.bind(this);
    this.state = {
      midiAccess: null,
      midiInputPorts: [],
      midiOutPorts: []
    };
  }

  onMIDISuccess(midiAccess) {
    // console.log(midiAccess);
    midiAccess.onstatechange = this.onMIDIChange;
    const midiInputPorts = new Array(...midiAccess.inputs.values());
    const midiOutPorts = new Array(...midiAccess.outputs.values());
    this.setState({
      midiAccess: midiAccess,
      midiInputPorts: midiInputPorts,
      midiOutPorts: midiOutPorts
    });

    // console.log('sta')
    console.log(this.state)
  }

  onMIDIFailure(msg) {
    console.log("Failed to get MIDI access - " + msg);
  }

  onMIDIChange(event) {
    console.log('onMIDIChange', event);
  }

  componentDidMount() {
    navigator.requestMIDIAccess({ sysex: false })
    .then(this.onMIDISuccess)
    .catch(this.onMIDIFailure);
  }

  render() {
    return (
      <div className="MidiLab container">
        <div className="row">
          <div className="col">
            <MidiTrack
              midiInputPorts={this.state.midiInputPorts}
              midiOutPorts={this.state.midiOutPorts} />
          </div>
        </div>
      </div>
    );
  }
}

export default MidiLab;
