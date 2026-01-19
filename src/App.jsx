import { useStories } from "./hooks/useStories";
import StoriesBar from "./Components/StoriesBar_1";

function App() {
  const { stories } = useStories();

  const handleAdd = (file) => {
    console.log("Selected file:", file);
  };

  return (
    <div>
      <StoriesBar stories={stories} onAdd={handleAdd} />
    </div>
  );
}

export default App;
