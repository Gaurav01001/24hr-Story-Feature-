import React, { useEffect, useState } from 'react'
//2 kam hai iska Show progress visually & Tell App when time is over
import '../styles/viewer.css'

export default function StoryProgress_5({duration, onComplete}){
    const [progressing ,setProgressing] = useState(0);
    

 useEffect(() => {
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
      
    },[duration, onComplete])
  return (
 <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progressing}%` }} />
    </div>
  )
}


