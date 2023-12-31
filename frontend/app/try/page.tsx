"use client"

import HeadingText from "@/components/heading-text"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import axios from "axios"
import ProgressBar from "@/components/ui/progress-bar"

export default function Contact() {

  const [buttonText, setButtonText] = useState("Copy")
  const [progress, setProgress] = useState(0)
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
    // progress bar
    let i = 0
    const interval = setInterval(() => {
      i = i + 1
      setProgress(i)
      if(i === 10){
        clearInterval(interval)
      }
    }, 1000);
    // form data
    const formData = new FormData()
    formData.append("file", data.audio_file)
    formData.append("content", data.text_content)
    formData.append("tags", data.tags)
    formData.append("word_count", data.word_count)
    try{
        // request with content type multipart/form-data axios
        const res = await axios.post("https://prakhart.pythonanywhere.com/api", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })  

        console.log(res.data)
        // console.log(json)
        setRecivedData(res.data)
        setLoading(false)
    } catch (err) {
        console.log(err)
        setLoading(false)
        alert("Our servers are busy, Please try again later. \n\nSorry for the inconvenience caused.")
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
        className={cn(buttonVariants({ size: "lg", className: "w-1/2" }))}>Submit</button> : <div className="text-xl font-bold text-center">Processing Your Request...
        {/* progress, max 10 seconds */}
        <ProgressBar progress={progress*10} />

        </div>}

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
