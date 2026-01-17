import { useEffect, useState } from "react";

const STORAGE_KEY = "stories";

export function useStories() {
  const [stories, setStories] = useState([]);

  return {
    stories,
  };
}
