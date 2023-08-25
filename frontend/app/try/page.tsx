"use client"

import HeadingText from "@/components/heading-text"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export default function Contact() {

  const [buttonText, setButtonText] = useState("Copy")

  const [data, setData] = useState({
    audio_file: "",
    text_content: "",
    tags: "",
    word_count: "",
  })
  const [recivedData, setRecivedData] = useState({
    voice_data_json: "",
    message: "",
    filename:""
  })
  const [loading, setLoading] = useState(false)

  // api call
  const handleSubmit = async (data:any) => {
    const formData = new FormData()
    formData.append("file", data.audio_file)
    formData.append("content", data.text_content)
    formData.append("tags", data.tags)
    formData.append("word_count", data.word_count)
    try{
        const res = await fetch("https://tone-craft.vercel.app/api", {
            method: "POST",
            body: formData
        })
        console.log(res)
        const json = await res.json()
        console.log(json)
        setRecivedData(json)
        setLoading(false)
    } catch (err) {
        console.log(err)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText subtext="">
          ToneCraft Playground
        </HeadingText><br/></div>

        {/* form to collect all this and call handleSubmit */}
    <div
    className="flex flex-col md:flex-row items-center justify-center w-full h-full p-4 space-x-4 rounded-md gap-4 transition duration-100 ease-in-out"
    >
        <form 
        className="flex flex-col items-center space-y-4 text-center transition duration-100 ease-in-out"
        onSubmit={
          (e)=>{
            e.preventDefault()
            console.log(data)
            setLoading(true)
            handleSubmit(data);
          }
        }>
          <label className="text-lg font-bold">Upload Audio File *</label>
        {/* <input onChange={(e)=>{
          // set the state as actual file, not the file path
          // @ts-ignore
          setData({...data, audio_file: e.target.files[0]})
        }} type="file" accept="audio/*" capture placeholder="Upload Audio File"
        className="w-[100%] border-2 border-gray-300 rounded-md p-2"
        />  */}

        <Input onChange={(e)=>{
          // set the state as actual file, not the file path
          // @ts-ignore
          setData({...data, audio_file: e.target.files[0]})
        }} type="file" accept="audio/*" capture placeholder="Upload Audio File"
        className="w-[100%]"
        />

        <Input onChange={(e)=>{
          setData({...data, tags: e.target.value})
        }} type="text" placeholder="Type in some tags (comma seperated)"
        className="w-[100%]"
        />
      
        <Input onChange={(e)=>{
          setData({...data, word_count: e.target.value})
        }} type="text" placeholder="Word Limit"
        className="w-[100%]"
        />

        <Textarea onChange={(e)=>{
          setData({...data, text_content: e.target.value})
        }} placeholder="Enter Your Sample Content *"
        className="w-[100%] h-[100px]"
        />


        {!loading ? <button 
        // disable if fields are empty
        disabled={data.audio_file === "" || data.text_content === ""}
        className={cn(buttonVariants({ size: "lg", className: "w-1/2" }))}>Submit</button> : <div className="text-xl font-bold text-center">Processing Your Request...</div>}

        <p> * - Required Fields</p>
        </form>

        {recivedData.voice_data_json !== ""
        ? <div className="relative w-full md:w-[50%] flex flex-col items-center space-y-2 text-center transition duration-500 ease-in-out">
          {/* copy button */}
          <button onClick={()=>{
            navigator.clipboard.writeText(recivedData.voice_data_json)
            // change the text of the button to copied
            setButtonText("Copied!")
            setTimeout(()=>{
              setButtonText("Copy")
            }, 1000)
            
          }} className="absolute top-4 right-2 p-2 text-sm text-center border border-gray-300 rounded-md hover:bg-gray-100"
          >{buttonText}</button>

                    <div className="flex flex-col gap-4 border-2 border-gray-300 rounded-md p-4">
                      <div
                      className="text-2xl font-bold text-center"
                      >Generated Content</div>
                      {recivedData.voice_data_json}
                    </div>

        </div> : null}
        
    </div>
    </main>
  )
} 
