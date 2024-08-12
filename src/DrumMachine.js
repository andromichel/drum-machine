// src/DrumMachine.js
import React, { useState, useEffect, useRef } from 'react';
import './DrumMachine.css'; // For custom styles

const drumPads = [
  { key: 'Q', sound: 'Heater 1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', sound: 'Heater 2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', sound: 'Heater 3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', sound: 'Heater 4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', sound: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', sound: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', sound: 'Kick-n-Hat', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', sound: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', sound: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

const DrumMachine = () => {
  const [display, setDisplay] = useState('');
  const audioRefs = useRef({});

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase();
      const pad = drumPads.find(pad => pad.key === key);
      if (pad) {
        const audio = audioRefs.current[key];
        if (audio) {
          audio.play();
          setDisplay(pad.sound);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handlePadClick = (key) => {
    const audio = audioRefs.current[key];
    if (audio) {
      audio.play();
      setDisplay(drumPads.find(pad => pad.key === key).sound);
    }
  };

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="drum-pad-container">
        {drumPads.map((pad) => (
          <div
            key={pad.key}
            className="drum-pad"
            id={pad.key}
            onClick={() => handlePadClick(pad.key)}
          >
            {pad.key}
            <audio
              className="clip"
              ref={(ref) => { audioRefs.current[pad.key] = ref; }}
              src={pad.src}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
