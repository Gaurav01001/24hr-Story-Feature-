import "../styles/stories.css";
import AddStoryButton_2 from "./AddStoryButton_2";

export default function StoriesBar({ onDeleteGroup, stories, onAdd, onStoryClick }) {
 return (
    <div className="stories-bar">
      <AddStoryButton_2 onSelect={onAdd} />

      {stories.map((group, index) => {
        const latestStory = group.stories[0]; // newest story

        return (
      <div key={group.id}
            className="story-thumbnail"
            onClick={() => onStoryClick(index)}
            onContextMenu={(e) => {
            e.preventDefault(); // stop browser menu
              if (confirm("Delete this story group?")) {
                  onDeleteGroup(index);
                }
              }}>
          <img src={latestStory.src} alt="story" />

          </div>
        );
      })}
    </div>
  );
}

