import { useEffect, useState } from "react";
import "./App.css";
import { fetch } from "./axios";
import { HiOutlineDotsVertical } from "react-icons/hi";
function App() {
  const [link, setLink] = useState("");
  const [id, setId] = useState(null);
  const [response, setResponse] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [linkmp4, setLinkmp4] = useState("");
  useEffect(() => {
    if (id) {
      const fetchData = () => {
        const interval = setInterval(async () => {
          setDisabled(true);
          try {
            const res = await fetch(id);
            if (res.status === 200 && res.data.status === "ok") {
              setResponse(res.data);
              clearInterval(interval);
              setDisabled(false);
            } else if (res.status === 200 && res.data.status === "fail") {
              alert("Invalid video ID");
              setDisabled(false);
              clearInterval(interval);
            }
          } catch (error) {
            alert("An error occurred. Please try again.");
            setDisabled(false);
            clearInterval(interval);
          }
        }, 1000);
      };

      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      window.location.href = response.link;
    }
  }, [response]);

  const extractVideoId = (url) => {
    // Regex to match YouTube video ID from different formats
    const regex =
      // eslint-disable-next-line no-useless-escape
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts)\/|\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleInputChange = (e) => {
    setLinkmp4(e.target.value);
  };

  const handleDownload = () => {
    if (linkmp4 !== "") {
      let YTurl;
      if (linkmp4.includes("https://youtu.be/")) {
        YTurl = linkmp4.replace(
          "https://youtu.be/",
          "https://www.000tube.com/watch?v="
        );
      } else {
        YTurl = linkmp4.replace("you", "000");
      }
      window.open(YTurl, "_blank");
    }
  };

  return (
    <div className="App shadow">
      <div id="logo">
        <h2>MEGA CONVERTER MP3 DOWNLOADER</h2>
      </div>

      <div id="body">
        <input
          type="text"
          placeholder="Enter YouTube link"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <span>It might take a moment to convert your video</span>
      </div>

      <button
        onClick={() => {
          const videoId = extractVideoId(link);
          if (videoId) {
            setId(videoId);
          } else {
            alert("Invalid YouTube link. Please try again.");
          }
        }}
        disabled={disabled}
        className={disabled ? "btn-disabled" : ""}
      >
        Download
      </button>
      <div className="py-3"></div>
      <div id="logo" className="fw-bold">
        <h2 className="fw-bold">MEGA CONVERTER MP4 VEDIO DOWNLOADER</h2>
      </div>
      
      <div id="body">
        <input
          type="text"
          className="link"
          value={linkmp4}
          onChange={handleInputChange}
          placeholder="Enter YouTube link"
        />
        <span>
          {" "}
          click the Download button to open a new tab, choose an option, cancel
          the next tab, return to the options tab, and click the{" "}
          <HiOutlineDotsVertical /> icon to download the MP4.
        </span>
      </div>
      <br />
      <button onClick={handleDownload}>Download Video</button>
    </div>
  );
}

export default App;
