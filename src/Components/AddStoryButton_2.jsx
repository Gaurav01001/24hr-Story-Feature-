import React from 'react'
import "../styles/stories.css"
export default function AddStoryButton_2  ({onSelect}) {
 
    const handleChange =(e) =>{
        const file =e.target.files[0];
        if(!file) return;

        onSelect(file);
        e.target.value = "";
    };
    
    return (
    <label className='add-story'>
      <input
       type="file" 
      accept="image/*,video/*"

        hidden
        onChange={handleChange}
      />
      <span className='add-story-plus'>+</span>
    </label>
  )
}

