import { useState } from "react";
import { useStories } from "./Hooks/useStories";
import StoriesBar_1 from "./Components/StoriesBar_1";
import ImageUploader_6 from "./Components/ImageUploader_6";
import StoryViewer_4 from "./Components/StoryViewer_4";

function App() {
 const {
  storyGroups,
  createNewStoryGroup,
  addStoryToGroup,
} = useStories();
const [uploadTarget, setUploadTarget] = useState(null);
// "new-group" | "existing-group"

  const [selectedFile, setSelectedFile] = useState(null);
  const [activeGroupIndex , setActiveGroupIndex] = useState(null);
  const [activeStoryIndex, setActiveStoryIndex] =useState(null);
  
  const openStory =(groupindex)=>{
    setActiveGroupIndex(groupindex);
    setActiveStoryIndex(0);
  }
  const closeStory =()=>{
    setActiveGroupIndex(null);
    setActiveStoryIndex(null);
  }
  const nextStory = ()=>{
    if(activeStoryIndex < storyGroups[activeGroupIndex].stories.length -1 ){
      setActiveStoryIndex(activeStoryIndex + 1);
    }
    else if(activeGroupIndex < storyGroups.length -1)
    { 
      setActiveGroupIndex(activeGroupIndex + 1)
      setActiveStoryIndex(0);

    }
      else{
      closeStory();
    }
  }
  const prevStory=()=>{
    if(activeStoryIndex > 0){
      setActiveStoryIndex(activeStoryIndex-1);
    }
    else if(activeGroupIndex > 0){
      const prevGroupIndex = activeGroupIndex-1;
      setActiveGroupIndex(prevGroupIndex);
      setActiveStoryIndex(storyGroups[prevGroupIndex].stories.length-1)
    }
    else{
      closeStory();
    }
  };
const currentStory =
  activeGroupIndex !== null &&
  activeStoryIndex !== null &&
  storyGroups[activeGroupIndex]?.stories[activeStoryIndex];

const handleAddToCurrentGroup = (file) => {
  if (activeGroupIndex === null) return; // safety
  setUploadTarget("existing-group");
  setSelectedFile(file);
};

const handleImageDone = (base64) => {
  if (uploadTarget === "new-group") {
    createNewStoryGroup(base64); // outside +
  }

  if (uploadTarget === "existing-group") {
  addStoryToGroup(activeGroupIndex, base64);
  setActiveStoryIndex(0); // new story is at index 0
}


  setSelectedFile(null);
  setUploadTarget(null);
};


const handleAddNewGroup = (file) => {
  setUploadTarget("new-group"); // outside +
  setSelectedFile(file);
};


  return (
    <div>
<StoriesBar_1
  stories={storyGroups}
  onAdd={handleAddNewGroup}
  onStoryClick={openStory}
/>



      {selectedFile && (
        <ImageUploader_6
          file={selectedFile}
          onDone={handleImageDone}
        />
      )}
      {activeGroupIndex !== null && currentStory && (
<StoryViewer_4
  story={currentStory}
  onNext={nextStory}
  onPrev={prevStory}
  onClose={closeStory}
  onAddStory={handleAddToCurrentGroup} 
/>


)}

    </div>
  );
}

export default App;
