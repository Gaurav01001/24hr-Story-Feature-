import React, { useEffect, useState } from 'react'
//2 kam hai iska Show progress visually & Tell App when time is over
import '../styles/viewer.css'

export default function StoryProgress_5({duration, onComplete, activeStoryIndex, storyCount}){
    const [progressing ,setProgressing] = useState(0);
    

 useEffect(() => {
  setProgressing(0);

    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgressing(percent);

      if (percent >= 100) {
        clearInterval(interval);
        onComplete && onComplete();
      }
    }, 50);
 return () => clearInterval(interval);
      
    },[duration, onComplete, activeStoryIndex])
  return (

    <div className="progress-container">
      {Array.from({length:storyCount}).map((_, i)=>{
        let width;
        if(i< activeStoryIndex) width =100;
        else if( i === activeStoryIndex) width = progressing;
        else width =0;
        return(
          <div className="progress-segment" key={i}>
            <div className="progress-fill"
            style={{width:`${width}%`}}
            />
          </div>
        )
      })}
    </div>

  )
}