import React, { Component } from 'react';
import Tone from 'tone';
// import { matrix } from 'nexusui';

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
    console.log('send_testnote_on', this.props.selectedMidiOutputPort, noteOnMessage);
    this.props.selectedMidiOutputPort.send(noteOnMessage);
    // this.state.synth.triggerAttackRelease("C4", "8n")
  }

  
  send_testnote_off() {
    if(!this.props.selectedMidiOutputPort) {
      return;
    }

    const noteOffMessage = [0x80 | selectedMidiChannel, 60, 0x7f];
    this.props.selectedMidiOutputPort.send(noteOffMessage);
    // this.props.selectedMidiOutputPort.send(noteOffMessage, window.performance.now() + 1000.0);
  }


  startArpeggiator() {
    if(!this.props.selectedMidiOutputPort) {
      return;
    }

    const selectedMidiOutputPort = this.props.selectedMidiOutputPort;
    console.log('selectedMidiOutputPort', selectedMidiOutputPort);

    const t = Tone.Time("4n");
    const noteLength = t.toMilliseconds();
    // const t = Tone.Time("8n");
    console.log('noteLength', noteLength);

    function playNote(time, note) {
      console.log('playNote', time, note, selectedMidiOutputPort);
      const b = Tone.Midi(note).toMidi(); //60
      const noteOnMessage = [0x90 | selectedMidiChannel, b, 0x7f];
      const noteOffMessage = [0x80 | selectedMidiChannel, b, 0x7f];
      selectedMidiOutputPort.send(noteOnMessage);
      selectedMidiOutputPort.send(noteOffMessage, window.performance.now() + noteLength);
    }


    const seq = new Tone.Sequence(playNote, ["C4", "E4", "G4", "A4"], t);
    // const seq = new Tone.Sequence(playNote, ["C4", "E4", "G4", "A4"], t);

    this.setState({ seq: seq });

    console.log('sqe', seq)
    seq.start(0, 0);

  }


  stopArpeggiator() {
    if(!this.state.seq) {
      return;
    }

    this.state.seq.stop();
  }


  componentDidMount() {
    // const synth = new Tone.Synth({
		// 	"oscillator" : {
		// 		"type" : "amtriangle",
		// 		"harmonicity" : 0.5,
		// 		"modulationType" : "sine"
		// 	},
		// 	"envelope" : {
		// 		"attackCurve" : 'exponential',
		// 		"attack" : 0.05,
		// 		"decay" : 0.2,
		// 		"sustain" : 0.2,
		// 		"release" : 1.5,
		// 	},
		// 	"portamento" : 0.05
    // }).toMaster();

    // this.setState({ synth: synth });
  }
  
  render() {
    return (
      <div className="Arpeggiator" style={{marginTop: '3px', marginBottom: '3px'}}>
        <div className="row">
          <div className="col">
            <button onClick={this.send_testnote_on}>Start test</button>
            <button onClick={this.send_testnote_off}>Stop test</button>
            <button onClick={this.startArpeggiator}>Start arp</button>
            <button onClick={this.stopArpeggiator}>Stop arp</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Arpeggiator;
