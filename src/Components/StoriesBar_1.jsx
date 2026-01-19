import "../styles/stories.css";
import AddStoryButton from "./AddStoryButton_2";

export default function StoriesBar({ stories, onAdd }) {
  return (
    <div className="stories-bar">
      <AddStoryButton onSelect={onAdd} />

      {stories.map((story) => (
        <div key={story.id} className="story-thumbnail">
          <img src={story.image} alt="story" />
        </div>
      ))}
    </div>
  );
}
