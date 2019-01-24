import React, { Component } from 'react';

class MidiTrackControls extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <MidiChannelSeletor />
        </div>
      </div>
    );
  }
}


class MidiChannelSeletor extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    let options = [];
    // for (let index = 1; index <= 16; index++) {
    //   console.log(index)
    //   const option = (<option key={index} value={index}>{index}</option>);
    //   options.push(options);
    // }

    return (
      <select>
        { options }
      </select>
    );
  }
}

export default MidiTrackControls;