const Drumpad = (props) => {
    return (
      <div className="drum-pad" name={props.letter} id={props.sound["id"]} onClick={props.function}>
        <p id="letter">{props.letter}</p>
        <audio
          id={props.letter}
          src={props.sound["url"]}
          className="clip"
        ></audio>
      </div>
    );
};

export default Drumpad;