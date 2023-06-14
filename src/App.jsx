import { useRef, useState } from "react";
import { youtube_parser } from "./utils";
import axios from "axios";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputUrlRef.current.value)
    const youtubeID = youtube_parser(inputUrlRef.current.value)
    // console.log(youtubeID)

    const options = {
      method: 'get',
      url: 'https://youtube-mp3.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID,
      }
    }

    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.error(err))
    
    inputUrlRef.current.value = ''
  }

  return (
      <div className='app'>
       <span className='logo'>youtube2mp3</span>
       <section className="content">
        <h1 className="content_title">YouTube to MP3 Converter</h1>
        <p className="content_description">
          Transform YouTube videos into MP3s in just a few clicks!
        </p>
        <form onClick={handleSubmit} className='form'>
          <input ref={inputUrlRef} placeholder='Paste a YouTube URL link...' className='form_input' type="text" />
          <button type='submit' className='form_button'>Search</button>
        </form>

        {urlResult  ? <a href={urlResult} target="_blank" rel="noreferrer" className='download_btn'>Download MP3</a> : ''}

        
       </section>
      </div>
  )
}

export default App
