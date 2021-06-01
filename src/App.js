import React, { Component } from "react";
import Blocks from "./component/Block";
import "./styles.css";
const arrBlocks = [1, 2, 3, 4, 5, 6];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomBlueBlock: new Set([]),
      checkedBlock: new Set([]),
      isTrue: [],
      checkboxes: arrBlocks.reduce((options, option) => ({
        ...options,
        [option]: false,
      })),
    };
  }

  blockWhite = {
    backgroundColor:
      "rgb(" +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      ")",
    border: "1px solid black",
    width: "50px",
    height: "50px",
    margin: "5px",
  };

  // getRandomColor = () => {
  //   this.setState({
  //     randomColor: (this.state.randomColor = `${Math.round(
  //       Math.random() * 255
  //     )}, ${Math.round(Math.random() * 255)}, ${Math.round(
  //       Math.random() * 255
  //     )}`),
  //   });
  // };

  blockBlue = {
    backgroundColor: "blue",
    border: "1px solid black",
    width: "50px",
    height: "50px",
    margin: "5px",
  };

  activeClass = {
    border: "3px solid gold",
    width: "50px",
    height: "50px",
    margin: "5px",
  };

  getRandomBlueBlock = () => {
    while (
      this.state.randomBlueBlock.size <
      Math.floor(Math.random() * 2) + 1
    ) {
      let random = Math.floor(Math.random() * 5) + 1;
      this.setState({
        randomBlueBlock: this.state.randomBlueBlock.add(random),
      });
    }
  };

  componentDidMount() {
    this.getRandomBlueBlock();
  }

  componentDidUpdate() {
    this.getRandomBlueBlock();
  }

  handleCheckboxChange = (changeEvent) => {
    const { name } = changeEvent.target;

    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
      checkedBlock: this.state.checkedBlock.add(+name),
    }));
  };

  createCheckbox = (option) => {
    if (this.state.randomBlueBlock.has(option)) {
      return (
        <Blocks
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          defaultClass={this.blockBlue}
          activeClass={this.activeClass}
        />
      );
    } else {
      return (
        <Blocks
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          defaultClass={this.blockWhite}
          activeClass={this.activeClass}
        />
      );
    }
  };

  createCheckboxes = () => arrBlocks.map(this.createCheckbox);

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    for (const checkbox of this.state.checkedBlock) {
      if (
        this.state.checkedBlock.has(checkbox) ===
        this.state.randomBlueBlock.has(checkbox)
      ) {
        this.setState({
          isTrue: this.state.isTrue.push(checkbox),
        });
      }
    }
    if (this.state.checkedBlock.size === this.state.randomBlueBlock.size) {
      if (this.state.isTrue.length === this.state.randomBlueBlock.size) {
        alert("Выбраны все синие квадраты");
      } else {
        alert("Выбраны не все синие квадраты");
      }
    } else {
      alert("Выбраны не все синие квадраты");
    }

    this.setState({
      randomBlueBlock: new Set([]),
      checkedBlock: new Set([]),
      isTrue: [],
      checkboxes: arrBlocks.reduce((options, option) => ({
        ...options,
        [option]: false,
      })),
    });
  };

  render() {
    return (
      <div className="App">
        <div className="Container">
          <form onSubmit={this.handleFormSubmit}>
            <div className="ContainerForm">{this.createCheckboxes()}</div>
            <button className="btn" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
