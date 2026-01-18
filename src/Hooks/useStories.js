// import { random } from "gsap";
import { useEffect, useState } from "react";

const STORAGE_KEY = "stories";
const Day_in_ms= 24*60*60*1000;

export function useStories() {
  const [stories, setStories] = useState([]);

  useEffect(()=>{
    const stored = localStorage.getItem(STORAGE_KEY)
    if(!stored){
      setStories([]);
      return ;
    }
    try{
      const parseStories = JSON.parse(stored);
//analyse (a string or text) into logical syntactic components:
// "a user question input is parsed into an internal conceptual representation"
      const validStories = parseStories.filter(
        (story)=> story.expiresAt > Date.now()
      );
      setStories(validStories);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(validStories));
    } catch(error){
      console.error("Failed To Parse stories from LocalStorage", error);
      setStories([]);
    }
  },[]);


  const addStory = (imageBase)=>{
    const now = Date.now();
    const newStory = {
      id: crypto.randomUUID(),
      image:imageBase,
      createdAt: now,
      expiresAt: now + Day_in_ms,
    };

    setStories((prevStories)=>{
      const updateStories = [newStory, ...prevStories];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updateStories));
      return updateStories;
    })
  };


  return {
    stories,
    addStory,
  };
}
