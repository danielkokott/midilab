import React, { Component } from 'react';
import MidiTrack from './components/midiTrack.js';
import MidiTrackAdder from './components/midiTrackAdder.js';

class MidiLab extends Component {

  constructor(props) {
    super(props);
    this.onMIDISuccess = this.onMIDISuccess.bind(this);
    this.onMIDIFailure = this.onMIDIFailure.bind(this);
    this.onMIDIChange = this.onMIDIChange.bind(this);
    this.addMidiTrack = this.addMidiTrack.bind(this);
    this.state = {
      midiAccess: null,
      midiInputPorts: [],
      midiOutputPorts: [],
      midiTracks: []
    };
  }

  onMIDISuccess(midiAccess) {
    midiAccess.onstatechange = this.onMIDIChange;
    const midiInputPorts = new Array(...midiAccess.inputs.values());
    const midiOutputPorts = new Array(...midiAccess.outputs.values());
    this.setState({
      midiAccess: midiAccess,
      midiInputPorts: midiInputPorts,
      midiOutputPorts: midiOutputPorts
    });
  }

  onMIDIFailure(msg) {
    console.log("Failed to get MIDI access - " + msg);
  }

  onMIDIChange(event) {
    console.log('onMIDIChange', event);
  }

  addMidiTrack(event) {
    const id = Date.now();
    this.setState(prevState => {
      return {
        midiTracks: [...prevState.midiTracks, { id: id }]
      };
    })
  }

  componentDidMount() {
    navigator.requestMIDIAccess({ sysex: false })
    .then(this.onMIDISuccess)
    .catch(this.onMIDIFailure);
  }

  render() {
    const tracks = this.state.midiTracks.map(track => {
      return (
        <MidiTrack
          id={track.id}
          key={track.id}
          midiInputPorts={this.state.midiInputPorts}
          midiOutputPorts={this.state.midiOutputPorts} />
      );
    });

    return (
      <div className="MidiLab container">
        <MidiTrackAdder addMidiTrack={this.addMidiTrack} />
        {tracks}
      </div>
    );
  }
}

export default MidiLab;
