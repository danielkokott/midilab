import React, { Component } from 'react';
import Tone from 'tone';

window.Tone = Tone;
Tone.Transport.stop();
Tone.Transport.bpm.value = 120;

class GlobalControls extends Component {

  constructor(props) {
    super(props);
    this.transportStart = this.transportStart.bind(this);
    this.transportStop = this.transportStop.bind(this);
    this.transportStateChange = this.transportStateChange.bind(this);
    this.handleChangeBpm = this.handleChangeBpm.bind(this);
    this.state = {
      transportState: Tone.Transport.state,
      bpm: Tone.Transport.bpm.value
    };
  }
  
  componentDidMount() {
    Tone.Transport.on('start', this.transportStateChange);
    Tone.Transport.on('stop', this.transportStateChange);
    Tone.Transport.on('pause', this.transportStateChange);
    Tone.Transport.on('loop', this.transportStateChange);
  }

  transportStateChange(e) {
    this.setState({ transportState: Tone.Transport.state })
  }

  transportStart(e) {
    e.preventDefault();
    Tone.Transport.start();
  }

  transportStop(e) {
    e.preventDefault();
    Tone.Transport.stop();
  }

  handleChangeBpm(e) {
    e.preventDefault();
    Tone.Transport.bpm.value = e.target.value;
    this.setState({bpm: e.target.value});
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Global controls</span>
            </div>
            <div style={{ margin: '3px' }}>{ Tone.Transport.state }</div>

            {
              this.state.transportState === 'started'
              ? <button type="button" className="btn form-control btn-warning" onClick={this.transportStop}>Stop</button>
              : <button type="button" className="btn form-control btn-primary" onClick={this.transportStart}>Start</button>
            }
            
            <input type="range" id="bpmRange" className="custom-range form-control" min="56" max="240" step="0.5" value={this.state.bpm} onChange={this.handleChangeBpm}></input>
            <div>{this.state.bpm}</div>
            {/* <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input> */}
          </div>
        </div>
      </div>
    );
  }
}


export default GlobalControls;