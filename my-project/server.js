// server.js
import express from "express";
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', function (req, res)  {
    res.send("done")
});


app.get('/fetch-transcript', async (req, res) => {
    const { videoId } = req.query;
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId); 
        console.log(transcript);
        res.json(transcript);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
