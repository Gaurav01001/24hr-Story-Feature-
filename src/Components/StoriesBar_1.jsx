import "../styles/stories.css";
import AddStoryButton_2 from "./AddStoryButton_2";

export default function StoriesBar({ stories, onAdd, onStoryClick }) {
  return (
    <div className="stories-bar">
      <AddStoryButton_2 onSelect={onAdd} />

      {stories.map((story, index) => (
        <div
          key={story.id}
          className="story-thumbnail"
          onClick={() => onStoryClick(index)}
        >
          <img src={story.image} alt="story" />
        </div>
      ))}
    </div>
  );
}

