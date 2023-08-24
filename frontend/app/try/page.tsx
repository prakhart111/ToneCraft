"use client"

import HeadingText from "@/components/heading-text"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export default function Contact() {

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
  const [submitting, setSubmitting] = useState(false)

  // api call
  const handleSubmit = async (data:any) => {
    setSubmitting(true)
		// file = request.files['file']
		// content = request.form['content']
		// tags = request.form['tags']
		// word_count = request.form['word_count']
    // This is how api expects the data to be sent
    const formData = new FormData()
    formData.append("file", data.audio_file)
    formData.append("content", data.text_content)
    formData.append("tags", data.tags)
    formData.append("word_count", data.word_count)
    try{
        //multipart/form-data 
        const res = await fetch("http://localhost:5000/api", {
            method: "POST",
            body: formData
        })
        console.log(res)
        const json = await res.json()
        console.log(json)
        setRecivedData(json)
        setSubmitting(false)
        setLoading(false)
    } catch (err) {
        console.log(err)
        setSubmitting(false)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText subtext="">
          Record/Upload Audio
        </HeadingText><br/></div>

        {/* form to collect all this and call handleSubmit */}

        <form 
        onSubmit={
          (e)=>{
            e.preventDefault()
            console.log(data)
            setLoading(true)
            handleSubmit(data);
          }
        }
        className="flex flex-col items-center space-y-2 text-center">
        <input onChange={(e)=>{
          // set the state as actual file, not the file path
          // @ts-ignore
          setData({...data, audio_file: e.target.files[0]})
        }} type="file" accept="audio/*" capture /> 
        <input onChange={(e)=>{
          setData({...data, text_content: e.target.value})
        }} type="text" placeholder="text content" />
        <input onChange={(e)=>{
          setData({...data, tags: e.target.value})
        }} type="text" placeholder="tags" />
        <input onChange={(e)=>{
          setData({...data, word_count: e.target.value})
        }} type="text" placeholder="word count" />

        <button className={cn(buttonVariants({ variant: "outline", size: "default", className: "w-1/2" }))}>Submit</button>
        </form>

{recivedData.voice_data_json !== ""
 ? <div className="flex flex-col items-center space-y-2 text-center">
            <HeadingText subtext="">
              Recived Data
            </HeadingText><br/>

            <div className="">
              {recivedData.voice_data_json}
            </div>

        </div> : null}



    </main>
  )
} 
