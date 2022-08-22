const Button = (props) => {
    return (
      <div className={"drum-button"} onClick={props.function}>
        <p id={props.name}>{props.name}</p>
      </div>
    );
  };

export default Button;