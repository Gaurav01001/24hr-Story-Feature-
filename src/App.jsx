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
    removeStoryGroup,
  } = useStories();

  // upload context
  const [uploadTarget, setUploadTarget] = useState(null);
  // new-group or existing-group

  // group transition direction
  const [groupDirection, setGroupDirection] = useState(null);
  //next  | prev | null

  //file handling
  const [selectedFile, setSelectedFile] = useState(null);

  // navigation state
  const [activeGroupIndex, setActiveGroupIndex] = useState(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);

 
//oprn or close stories
  const openStory = (groupIndex) => {
    setActiveGroupIndex(groupIndex);
    setActiveStoryIndex(0);
  };

  const closeStory = () => {
    setActiveGroupIndex(null);
    setActiveStoryIndex(null);
    setGroupDirection(null);
  };

 

  const nextStory = () => {
    if (
      activeStoryIndex < storyGroups[activeGroupIndex].stories.length - 1
    ) {
      setActiveStoryIndex((prev) => prev + 1);
      return;
    }

    // move to next group
    if (activeGroupIndex < storyGroups.length - 1) {
      setGroupDirection("next");

      setTimeout(() => {
        setActiveGroupIndex((prev) => prev + 1);
        setActiveStoryIndex(0);
        setGroupDirection(null);
      }, 250);

      return;
    }

    closeStory();
  };

  const prevStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex((prev) => prev - 1);
      return;
    }

    // move to previous group
    if (activeGroupIndex > 0) {
      setGroupDirection("prev");
      const prevGroupIndex = activeGroupIndex - 1;

      setTimeout(() => {
        setActiveGroupIndex(prevGroupIndex);
        setActiveStoryIndex(
          storyGroups[prevGroupIndex].stories.length - 1
        );
        setGroupDirection(null);
      }, 250);

      return;
    }

    closeStory();
  };


  const currentStory =
    activeGroupIndex !== null &&
    activeStoryIndex !== null &&
    storyGroups[activeGroupIndex]?.stories[activeStoryIndex];


  const handleAddNewGroup = (file) => {
    setUploadTarget("new-group");
    setSelectedFile(file);
  };

  const handleAddToCurrentGroup = (file) => {
    if (activeGroupIndex === null) return;
    setUploadTarget("existing-group");
    setSelectedFile(file);
  };

  const handleImageDone = (file) => {
    if (uploadTarget === "new-group") {
      createNewStoryGroup(file);
    }

    if (uploadTarget === "existing-group") {
      addStoryToGroup(activeGroupIndex, file);
      setActiveStoryIndex(0); // jump to newly added story
    }

    setSelectedFile(null);
    setUploadTarget(null);
  };


  return (
    <div>
      <StoriesBar_1
        stories={storyGroups}
        onAdd={handleAddNewGroup}
        onStoryClick={openStory}
        onDeleteGroup={removeStoryGroup}
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
          activeStoryIndex={activeStoryIndex}
          storyCount={
            storyGroups[activeGroupIndex].stories.length
          }
          groupDirection={groupDirection}
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
