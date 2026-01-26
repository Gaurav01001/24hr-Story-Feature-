import "../styles/stories.css";
import AddStoryButton_2 from "./AddStoryButton_2";

export default function StoriesBar({ stories, onAdd, onStoryClick }) {
 return (
    <div className="stories-bar">
      <AddStoryButton_2 onSelect={onAdd} />

      {stories.map((group, index) => {
        const latestStory = group.stories[0]; // newest story

        return (
          <div
            key={group.id}
            className="story-thumbnail"
            onClick={() => onStoryClick(index)}
          >
            <img src={latestStory.image} alt="story" />
          </div>
        );
      })}
    </div>
  );
}

