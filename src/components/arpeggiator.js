import React, { Component } from 'react';
import Tone from 'tone';

const selectedMidiChannel = 2;

class Arpeggiator extends Component {

  constructor(props) {
    super(props);
    this.send_testnote_on = this.send_testnote_on.bind(this);
    this.send_testnote_off = this.send_testnote_off.bind(this);
    this.startArpeggiator = this.startArpeggiator.bind(this);
    this.stopArpeggiator = this.stopArpeggiator.bind(this);
    this.state = {};
  }


  send_testnote_on() {
    if(!this.props.selectedMidiOutputPort) {
      return;
    }
    
    const noteOnMessage = [0x90 | selectedMidiChannel, 60, 0x7f];
    this.props.selectedMidiOutputPort.send(noteOnMessage);
  }

  
  send_testnote_off() {
    if(!this.props.selectedMidiOutputPort) {
      return;
    }

    const noteOffMessage = [0x80 | selectedMidiChannel, 60, 0x7f];
    this.props.selectedMidiOutputPort.send(noteOffMessage);
  }


  startArpeggiator() {
    if(!this.props.selectedMidiOutputPort) {
      return;
    }

    const selectedMidiOutputPort = this.props.selectedMidiOutputPort;

    const t = Tone.Time("4n");
    const noteLength = t.toMilliseconds();

    function playNote(time, note) {
      const b = Tone.Midi(note).toMidi(); //60
      const noteOnMessage = [0x90 | selectedMidiChannel, b, 0x7f];
      const noteOffMessage = [0x80 | selectedMidiChannel, b, 0x7f];
      selectedMidiOutputPort.send(noteOnMessage);
      selectedMidiOutputPort.send(noteOffMessage, window.performance.now() + noteLength);
    }


    const seq = new Tone.Sequence(playNote, ["C4", "E4", "G4", "A4"], t);

    this.setState({ seq: seq });

    seq.start(0, 0);
  }


  stopArpeggiator() {
    if(!this.state.seq) {
      return;
    }

    this.state.seq.stop();
  }


  componentDidMount() {
  }
  
  render() {
    return (
      <div className="Arpeggiator" style={{marginTop: '3px', marginBottom: '3px'}}>
        <div className="row">
          <div className="col">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button className="btn btn-sm" type="button" onClick={this.send_testnote_on}>Start test</button>
              <button className="btn btn-sm" type="button" onClick={this.send_testnote_off}>Stop test</button>
              <button className="btn btn-sm" type="button" onClick={this.startArpeggiator}>Start arp</button>
              <button className="btn btn-sm" type="button" onClick={this.stopArpeggiator}>Stop arp</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Arpeggiator;
