import React from 'react'
import "../styles/viewer.css";
export default function StoryViewer_4(
  {story, onClose, onNext, onPrev}
  ){
    if(!story) return null;

  return (
    <div className='story-viewer-overlay'>
      <div className="nav-zone left" onClick={onPrev}></div>
        <div className="story-viewer-content">
            <img src={story.image} alt="story" />
        </div>
      <div className="nav-zone right" onClick={onNext}></div>
    </div>
  )
}

