import React from 'react'
export default function StoryViewer_4({story, onClose}){
    if(!story) return null;

  return (
    <div className='story-view-overlay' onClick={onClose}>
        <div className="story-view-content">
            <img src={story.image} alt="story" />
        </div>

      
    </div>
  )
}

