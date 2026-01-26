import { useEffect, useState } from "react";

const STORAGE_KEY = "stories";
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function useStories() {
  const [storyGroups, setStoryGroups] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setStoryGroups([]);
      return;
    }

    try{
      const parseGroups = JSON.parse(stored);
//analyse (a string or text) into logical syntactic components:
// "a user question input is parsed into an internal conceptual representation"
    
// Remove expired stories inside each group.
/* const validGroups = parsedGroups
  .map((group) => ({
    ...group,
    stories: group.stories.filter(
      (story) => story.expiresAt > Date.now()
    ),
  }))
  .filter((group) => group.stories.length > 0);
 this didnt worked idkw*/
const validGroups = parseGroups
  .map((group) => {
    if (!Array.isArray(group.stories)) return null;

    const validStories = group.stories.filter(
      (story) => story.expiresAt > Date.now()
    );

    if (validStories.length === 0) return null;

    return {
      ...group,
      stories: validStories,
    };
  })
  .filter(Boolean);

setStoryGroups(validGroups);
localStorage.setItem(STORAGE_KEY, JSON.stringify(validGroups));
    } 
    catch(error){
      console.log("failed to parse story Group" , error);
      setStoryGroups([]);
    }
  },[]);
/*addStory()
  → create ONE story
  → wrap it in ONE group
  → push group into storyGroups[]
*/
const createNewStoryGroup = (imageBase) => {
  const now = Date.now();

  const newStory = {
    id: crypto.randomUUID(),
    image: imageBase,
    createdAt: now,
    expiresAt: now + DAY_IN_MS,
    viewed: false,
  };

  const newGroup = {
    id: crypto.randomUUID(),
    stories: [newStory],
  };

  setStoryGroups((prev) => {
    const updated = [newGroup, ...prev];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  });
};

// add story to existing group
const addStoryToGroup = (groupIndex, imageBase) => {
  const now = Date.now();

  const newStory = {
    id: crypto.randomUUID(),
    image: imageBase,
    createdAt: now,
    expiresAt: now + DAY_IN_MS,
    viewed: false,
  };

  setStoryGroups((prev) => {
    const updated = [...prev];

    updated[groupIndex] = {
      ...updated[groupIndex],
      stories: [newStory, ...updated[groupIndex].stories],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  });
};


return {
  storyGroups,
  createNewStoryGroup,
  addStoryToGroup,
};

}
