import React, { Component } from 'react';

class MidiSelector extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedMidiPortId: '',
    };
  }

  handleChange(event) {
    this.props.selectMidiPort(event);
    this.setState({ selectedMidiPortId: event.target.value });
  }

  render() {
    // console.log(this.props.availableMidiPorts)
    let options = [
      <option key="-1" value="" disabled="disabled">(ingen)</option>
    ];

    if(this.props.availableMidiPorts) {
      options = this.props.availableMidiPorts.map(midiPort => {
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
        <option value="">(None)</option>
        {options}
      </select>
    );
  }
}

export default MidiSelector;