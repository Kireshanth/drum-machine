const Volume = () => {
    return (
      <div id="volume-slider">
        <p id="volume-tag">Volume</p>
        <input type="range" id="volume" name="volume" min="0" max="1" step="0.01"/>
      </div>
    );
  };

export default Volume;