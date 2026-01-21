import React, { useEffect, useRef } from 'react'


export default function ImageUploader_6 ({file, onDone}){
    const canvasRef = useRef(null); 
    const hasprocessed = useRef(false);
    useEffect(()=>{
        if(!file || hasprocessed.current){
            return;
        }
        hasprocessed.current = true;
        const img = new Image();
        const img_url = URL.createObjectURL(file);

        img.onload=()=>{
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if(!canvas) return;

            const Max_Width = 1080;
            const Max_Height = 1920;

            const scale = Math.min(
                Max_Height / img.height,
                Max_Width / img.width,
                1
            )
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;
            
            canvas.width = newWidth;
            canvas.height = newHeight;
            
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            console.log("Canvas Size Set:", canvas.width, canvas.height);
            URL.revokeObjectURL(img_url);//Prevents memory leaks
        
            const base64 = canvas.toDataURL("image/jpeg", 0.9);
            onDone(base64);

        };

        img.src = img_url;
    },[file]); //Effect runs only when a new file is selected,Prevents duplicate processing 

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

