import { useEffect, useState } from "react";

const STORAGE_KEY = "stories";
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function useStories() {
  const [storyGroups, setStoryGroups] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      const validGroups = parsed
        .map((group) => {
          if (!Array.isArray(group.stories)) return null;

          const validStories = group.stories.filter(
            (story) => story.expiresAt > Date.now()
          );

          if (validStories.length === 0) return null;

          return { ...group, stories: validStories };
        })
        .filter(Boolean);

      setStoryGroups(validGroups);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validGroups));
    } catch (e) {
      console.error("Failed to parse stories", e);
      setStoryGroups([]);
    }
  }, []);


  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const createStoryObject = async (file) => {
    const now = Date.now();
    const isVideo = file.type.startsWith("video/");
    const src = await fileToBase64(file);

    return {
      id: crypto.randomUUID(),
      type: isVideo ? "video" :"image",
      src,
      createdAt:now,
      expiresAt:now+DAY_IN_MS,
    };
  };


  const createNewStoryGroup = async (file) => {
    const newStory = await createStoryObject(file);

    setStoryGroups((prev) => {
      const updated = [
        { id: crypto.randomUUID(),stories:[newStory] },
        ...prev,
      ];
      localStorage.setItem(STORAGE_KEY,JSON.stringify(updated));
      return updated;
    });
  };

    const addStoryToGroup = async (groupIndex, file) => {
    const newStory = await createStoryObject(file);
    setStoryGroups((prev) => {
    if (!prev[groupIndex]) return prev;

    const updated = [...prev];
    updated[groupIndex] = {
      ...updated[groupIndex],
      stories: [newStory, ...updated[groupIndex].stories],
    };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };
    const removeStoryGroup = (groupIndex) => {
    setStoryGroups((prev) => {
    const updated = prev.filter((_, i) => i !== groupIndex);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  });
};

  return {
    storyGroups,
    createNewStoryGroup,
    addStoryToGroup,
    removeStoryGroup,
  };
}
