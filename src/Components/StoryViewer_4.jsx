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
  activeStoryIndex,
  storyCount,
  groupDirection,
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
    {/* Progress bar - OUTSIDE content wrapper */}
    <StoryProgress_5
      duration={story.type === "video" ? 100000 : 6000}
      onComplete={onNext}
      activeStoryIndex={activeStoryIndex}
      storyCount={storyCount}
    />

    {/* + Button - OUTSIDE content wrapper */}
    <label className="story-add-btn">
      +
      <input
        type="file"
        accept="image/*,video/*"
        hidden
        onChange={handleFileChange}
      />
    </label>

    {/* Content wrapper - ONLY for non-interactive display */}
    <div className="story-viewer-content">
      <div
        key={story.id}
        className={`story-image-wrapper ${
          groupDirection ? `slide-${groupDirection}` : ""
        }`}
      >
        {story.type === "image" && (
          <img src={story.src} alt="story" />
        )}

        {story.type === "video" && (
          <video
            src={story.src}
            autoPlay
            playsInline
            onEnded={onNext}
          />
        )}
      </div>
    </div>

    {/* Navigation zones - OUTSIDE content wrapper */}
    <div
      className="nav-zone left"
      onClick={() => {
        console.log("LEFT CLICK");
        onPrev();
      }}
    />

    <div
      className="nav-zone right"
      onClick={() => {
        console.log("RIGHT CLICK");
        onNext();
      }}
    />
  </div>
);

}
