import React, { Component } from 'react';

class MidiSelector extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedMidiPortId: '',
      selectedMidiPort: null
    };
  }

  handleChange(event) {
    console.log('hand', event.target.value);
    // this.setState({value: event.target.value});
  }

  render() {
    // console.log(this.props.midiPorts)
    let options = [];
    if(this.props.midiPorts) {
      options = this.props.midiPorts.map(midiPort => {
        return (
          <option
            id={midiPort.id}
            key={midiPort.id}
            value={midiPort.id}>{midiPort.name}</option>
        );
      });
    }

    return (
      <select value={this.state.selectedMidiPortId} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}

export default MidiSelector;