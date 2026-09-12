use client';

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("5");
  const [aspect, setAspect] = useState("16:9");
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  async function generate() {
    if (!prompt.trim()) return;
    setStatus("Preparing your video...");
    setVideoUrl("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ prompt, duration, aspect })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setStatus(data.message || "Generation started.");
      if (data.videoUrl) setVideoUrl(data.videoUrl);
    } catch (e) {
      setStatus(e.message);
    }
  }

  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand"><span className="logo">C</span><span>CineAI</span></div>
        <div className="admin">ADMIN • FREE MODE</div>
      </nav>

      <section className="hero">
        <p className="eyebrow">AI VIDEO STUDIO</p>
        <h1>Turn your words into <span>cinematic video.</span></h1>
        <p className="sub">Describe a scene, character or story and generate a video from your imagination.</p>

        <div className="card">
          <label>Describe your video</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Example: A young Yoruba woman runs through a peaceful Nigerian village at sunset. She wears beautiful traditional Yoruba clothing. Cinematic camera movement, realistic environment, natural lighting..."
          />

          <div className="controls">
            <div>
              <small>Duration</small>
              <select value={duration} onChange={e=>setDuration(e.target.value)}>
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
              </select>
            </div>
            <div>
              <small>Aspect ratio</small>
              <select value={aspect} onChange={e=>setAspect(e.target.value)}>
                <option>16:9</option>
                <option>9:16</option>
                <option>1:1</option>
              </select>
            </div>
            <button onClick={generate} disabled={!prompt.trim() || status.includes("Preparing")}>
              {status.includes("Preparing") ? "Generating…" : "Generate Video →"}
            </button>
          </div>

          {status && <div className="status">{status}</div>}
          {videoUrl && (
            <div className="result">
              <video src={videoUrl} controls />
              <a href={videoUrl} download>Download video</a>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <div><b>🎬 Text to Video</b><p>Convert detailed prompts into video.</p></div>
        <div><b>📖 Story Mode</b><p>Turn a script into multiple connected scenes.</p></div>
        <div><b>👤 Character Consistency</b><p>Keep characters recognizable across scenes.</p></div>
      </section>

      <footer>CineAI • Admin unlimited mode • Video generation engine can be connected next</footer>
    </main>
  );
}