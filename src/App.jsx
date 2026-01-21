import { useState } from "react";
import { useStories } from "./Hooks/useStories";
import StoriesBar_1 from "./Components/StoriesBar_1";
import ImageUploader_6 from "./Components/ImageUploader_6";
import StoryViewer_4 from "./Components/StoryViewer_4";

function App() {
  const { stories, addStory } = useStories();
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeStory , setActiveStory] = useState(null);


  const handleSelectFile = (file) => {
    setSelectedFile(file);
  };

  const handleImageDone = (base64) => {
    addStory(base64);
    setSelectedFile(null); // reset after upload
  };

  return (
    <div>
      <StoriesBar_1
        stories={stories}
        onAdd={handleSelectFile}
        onStoryClick={setActiveStory}
      />

      {selectedFile && (
        <ImageUploader_6
          file={selectedFile}
          onDone={handleImageDone}
        />
      )}
      {activeStory && (
        <StoryViewer_4
        story={activeStory}
        onClose={()=>setActiveStory(null)}
        />
      )}
    </div>
  );
}

export default App;
