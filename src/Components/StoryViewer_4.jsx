// import React from 'react'
// import "../styles/viewer.css";
// import StoryProgress_5 from './StoryProgress_5';
// export default function StoryViewer_4(
//   {story, onClose, onNext, onPrev, activeIndex}
//   ){
//     if(!story) return null;

//   return (
//     <div className='story-viewer-overlay'>
//       <div className="nav-zone left" onClick={onPrev}></div>
        
//         <div className="story-viewer-content">
//           <StoryProgress_5 
//           duration={10000}
//           onComplete={onNext}
//           key={activeIndex}
//           />
//             <img src={story.image} alt="story" />
//         </div>
//       <div className="nav-zone right" onClick={onNext}></div>
//     </div>
//   )
// }


import "../styles/viewer.css";
import StoryProgress_5 from "./StoryProgress_5";

export default function StoryViewer_4({
  story,
  onNext,
  onPrev,
  onClose,
  onAddStory,
}) {
  if (!story) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onAddStory(file);
    e.target.value = "";
  };

  return (
    <div className="story-viewer-overlay">
      <div className="nav-zone left" onClick={onPrev}></div>

      <div className="story-viewer-content">
        {/* INSIDE + BUTTON */}
        <label className="story-add-btn">
          +
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </label>

        <StoryProgress_5
          duration={5000}
          onComplete={onNext}
          key={story.id}
        />

        <img src={story.image} alt="story" />
      </div>

      <div className="nav-zone right" onClick={onNext}></div>
    </div>
  );
}
