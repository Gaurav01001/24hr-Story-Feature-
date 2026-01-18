import { useStories } from "./Hooks/useStories";

function App() {
  const { stories, addStory } = useStories();

  return (
    <div>
      <h1>Stories count: {stories.length}</h1>

      <button onClick={() => addStory("base64-test-image")}>
        Add Test Story
      </button>
    </div>
  );
}

export default App;
