import { Component } from "react";
import Button from "./components/Button"
import Drumpad from "./components/Drumpad";
import FakeSwitch from "./components/FakeSwitch";
import Volume from "./components/Volume";
import './DrumDisplay.css';

const keytrigger = {
    "81" : "Q",
    "87" : "W",
    "69" : "E",
    "65" : "A",
    "83" : "S",
    "68" : "D",
    "90" : "Z",
    "88" : "X",
    "67" : "C"
  }

const audioBank1 = [
    {
      id: "Heater 1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      id: "Heater 2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      id: "Heater 3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      id: "Heater 4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      id: "Open HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
      id: "Kick n' Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
      id: "Closed HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
  ];
  
const audioBank2 = [
    {
      id: "Chord 1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    },
    {
      id: "Chord 2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    },
    {
      id: "Chord 3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    },
    {
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    },
    {
      id: "Open HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    },
    {
      id: "Closed HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    },
    {
      id: "Punchy Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    },
    {
      id: "Side Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    },
    {
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }
  ];
  
export default class DrumDisplay extends Component {
    constructor(props) {
    super(props);
    this.state = {
        power: false,
        bank: false
    };
    this.powerDrum = this.powerDrum.bind(this);
    this.playSound = this.playSound.bind(this);
    this.changeBank = this.changeBank.bind(this);
    this.keyTrigger = this.keyTrigger.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
}
  
    componentDidMount() {
      document.addEventListener("keyup", this.keyTrigger);
    }
  
    powerDrum() {
      console.log(this.state.power);
      this.setState(
        {
          power: !this.state.power,
          bank: this.state.bank
        },
        function () {
          console.log(this.state.power);
          if (this.state.power) {
            document.getElementById("volume-slider").style.visibility = "visible";
            document.getElementById("beat-name").style.visibility = "visible";
            document.getElementById("Bank").style.visibility = "visible";
            document.getElementById("beat-name").innerHTML = "Ready! 🎵";
            document.documentElement.style.setProperty(
              "--colorPowerBtnTxt",
              "green"
            );
          } else {
            document.getElementById("volume-slider").style.visibility = "hidden";
            document.getElementById("beat-name").style.visibility = "hidden";
            document.getElementById("Bank").style.visibility = "hidden";
            document.documentElement.style.setProperty(
              "--colorPowerBtnTxt",
              "red"
            );
          }
        }
      );
    }
  
    keyTrigger(event){
      let letter = "";
      if(this.state.power){
        let keyCode = event.keyCode.toString();
        if(keytrigger.hasOwnProperty(keyCode)){
        letter = keytrigger[keyCode];
        let audio = document.getElementById(letter);
        audio.volume = this.adjustVolume();
        audio.currentTime = 0;
        audio.play();
        document.getElementById(letter).parentNode.style.animation = "animate-drum-pad 0.8s forwards";
        setTimeout(() =>{
          document.getElementById(letter).parentNode.style.removeProperty("animation");
        }, "500")
        document.getElementById("beat-name").innerHTML = document.getElementById(letter).parentNode.id;
        }
      }
    }
    
    changeBank() {
      if (this.state.power) {
        console.log(this.state.bank);
        this.setState(
          {
            power: this.state.power,
            bank: !this.state.bank
          },
          function () {
            console.log(this.state.bank);
            if (this.state.bank) {
              document.documentElement.style.setProperty(
                "--colorBankBtnTxt",
                "green"
              );
            } else {
              document.documentElement.style.setProperty(
                "--colorBankBtnTxt",
                "red"
              );
            }
          }
        );
      }
    }
  
    adjustVolume(){
      return document.getElementById("volume").value;
    }
    playSound(event) {
      if (this.state.power) {
        let audio = document.getElementById(event.target.getAttribute('name'));
        this.adjustVolume();
        audio.volume = this.adjustVolume();
        audio.currentTime = 0;
        audio.play();
        document.getElementById("beat-name").innerHTML = event.target.id;
      }
    }
    render() {
      return (
        <>
          <div id="drum-machine">
            <div id="drum-container1">
              <div id="pad-array">
                <Drumpad
                  letter={"Q"}
                  function={this.playSound}
                  sound={!this.state.bank ? audioBank1[0] : audioBank2[0]}
                />
                <Drumpad
                  letter={"W"}
                  function={this.playSound}
                  sound={!this.state.bank ? audioBank1[1] : audioBank2[1]}
                />
                <Drumpad
                  letter={"E"}
                  function={this.playSound}
                  sound={!this.state.bank ? audioBank1[2] : audioBank2[2]}
                />
                <Drumpad
                  letter={"A"}
                  function={this.playSound}
                  sound={!this.state.bank ? audioBank1[3] : audioBank2[3]}
                />
                <Drumpad
                  letter={"S"}
                  function={this.playSound}
                  sound={!this.state.bank ? audioBank1[4] : audioBank2[4]}
                />
                <Drumpad
                  letter={"D"}
                  function={this.playSound}
                  sound={!this.state.bank ? audioBank1[5] : audioBank2[5]}
                />
                <Drumpad
                  letter={"Z"}
                  function={this.playSound}
                  sound={!this.state.bank ? audioBank1[6] : audioBank2[6]}
                />
                <Drumpad
                  letter={"X"}
                  function={this.playSound}
                  sound={!this.state.bank ? audioBank1[7] : audioBank2[7]}
                />
                <Drumpad
                  letter={"C"}
                  function={this.playSound}
                  sound={!this.state.bank ? audioBank1[8] : audioBank2[8]}
                />
              </div>
            </div>
            <div id="drum-container2">
              <Button name={"Power"} function={this.powerDrum} />
              <FakeSwitch />
              <Volume />
              <Button name={"Bank"} function={this.changeBank} />
            </div>
          </div>
          <div id="credit">
            by{" "}
            <a target="_blank" href="https://github.com/kireshanth">
              Kireshanth 👨🏿‍💻
            </a>
          </div>
        </>
      );
    }
}
  
  

