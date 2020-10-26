const intervalAudioAmp = setInterval(() => {

function amplifyMedia(mediaElem, multiplier) {
    var context = new (window.AudioContext || window.webkitAudioContext),
    
    result = {
        context: context,
        source: context.createMediaElementSource(mediaElem),
        gain: context.createGain(),
        media: mediaElem,
        amplify: function(multiplier) { result.gain.gain.value = multiplier; },
        getAmpLevel: function() { return result.gain.gain.value; }
    };
    
    result.source.connect(result.gain);
    result.gain.connect(context.destination);
    result.amplify(multiplier);
    
    return result;
}
  const header = document.querySelector("._1QUKR");
  if (header) {
    clearInterval(intervalAudioAmp);
    const button = document.createElement("button");

    function handleVolumeRateStatus (rate) {
      const volumeRate = Number(rate);
      if(volumeRate === 1) {
        button.innerHTML = "2x";
        button.classList.add("twoTimesButton");
        button.classList.remove("oneTimeButton");
        localStorage.setItem("volumeRate", "1");
      } else if (volumeRate === 2) {
        button.innerHTML = "1x";
        button.classList.add("oneTimeButton");
        button.classList.remove("twoTimesButton");
        localStorage.setItem("volumeRate", "2");
      }
      return volumeRate;
    }

    function handleAudioVolumeRate (rate = 1) {
      const volumeRate = Number(rate);
      document.addEventListener("click", () => {
        const audios = document.querySelectorAll("audio");
        if(audios) {
          audios.forEach(audio => {
            amplifyMedia(audio, volumeRate);
          })
        }
      })
    }

    if(!localStorage.getItem("volumeRate")) {
      localStorage.setItem("volumeRate", "1");
      handleVolumeRateStatus("1");
    } else {
      const volumeRate = handleVolumeRateStatus(localStorage.getItem("volumeRate"));
      handleAudioVolumeRate(volumeRate);
    }

    button.addEventListener("click", () => {
      let volumeRate = Number(localStorage.getItem("volumeRate"));
      if (volumeRate === 1) {
        volumeRate++;
        volumeRate = handleVolumeRateStatus(volumeRate);
        handleAudioVolumeRate(volumeRate);
      } else if (volumeRate === 2) {
        volumeRate--;
        volumeRate = handleVolumeRateStatus(volumeRate);
        handleAudioVolumeRate(volumeRate);
      }
    });

    header.appendChild(button);
  }
}, 1500);
