import React from 'react';
import { createRoot } from 'react-dom/client';

const sampleOptions = [
  { id: "753", title: "This is the first option" },
  { id: "035", title: "This is the second option" }
];

class OptionsShower extends React.Component {
  constructor(props) {
    super(props);
    const { options } = props;
    this.state = { options, displayOptions: false };
  }

  displayOptions() {
    this.setState({
      options: this.state.options,
      displayOptions: !this.state.displayOptions
    });
  }

  render() {
    var options = null;
    if (this.state.displayOptions) {
      options = (
        <ul id="options">
          {this.state.options.map(option => (
            <li key={option.id}>{option.title}</li>
          ))}
        </ul>
      );
    }
    return (
      <div>
        <button onClick={this.displayOptions}>
          {this.state.displayOptions ? "Hide options" : "Show options"}
        </button>
        {options}
      </div>
    );
  }
}

document.body.innerHTML = "<div id='root'></div>";
const root = createRoot(document.getElementById("root"));

root.render(<OptionsShower options={sampleOptions} />);