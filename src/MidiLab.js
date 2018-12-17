import React, { Component } from 'react';
import Tone from 'tone';
import { midi } from 'tonal';

import MidiTrack from './components/midiTrack.js';
import MidiTrackAdder from './components/midiTrackAdder.js';
import StepSequencer from './components/stepSequencer.js';

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

    Tone.Transport.bpm.value = 120
  }
  
  render() {
    console.log('render this.state.midiInputPorts', this.state.midiInputPorts)
    console.log('render this.state.midiOutputPorts', this.state.midiOutputPorts)
    const tracks = this.state.midiTracks.map(track => {
      const midiInputPorts = this.state.midiInputPorts.filter(port => port.connection === 'closed')
      const midiOutputPorts = this.state.midiOutputPorts.filter(port => port.connection === 'closed')
      return (
        <MidiTrack
          id={track.id}
          key={track.id}
          midiInputPorts={midiInputPorts}
          midiOutputPorts={midiOutputPorts} />
      );
    });

    return (
      <div className="MidiLab container">

        <MidiTrackAdder addMidiTrack={this.addMidiTrack} />

        {tracks}

        <StepSequencer />

      </div>
    );
  }
}

export default MidiLab;
