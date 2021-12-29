const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const {newRisingStar, mostPopularStreamer, 
    topEsportStreamer, bestFemaleStreamer, 
    bestPUBGStreamer, topGTA5Streamer} = require('./data');

const PORT = process.env.PORT || 5000;

const corsOptions ={
   origin:'https://nimo-vote.vercel.app', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.get('/api/new-rising-star', async (req, res) => {
    const streamers = await callAPI(newRisingStar);
    console.log(handleData(streamers));
    res.status(200).json({success: true, result: handleData(streamers)});
});

app.get('/api/most-popular-streamer', async (req, res) => {
    const streamers = await callAPI(mostPopularStreamer);
    console.log(handleData(streamers));
    res.status(200).json({success: true, result: handleData(streamers)});
});

app.get('/api/top-esport-streamer', async (req, res) => {
    const streamers = await callAPI(topEsportStreamer);
    console.log(handleData(streamers));
    res.status(200).json({success: true, result: handleData(streamers)});
});

app.get('/api/best-female-streamer', async (req, res) => {
    const streamers = await callAPI(bestFemaleStreamer);
    console.log(handleData(streamers));
    res.status(200).json({success: true, result: handleData(streamers)});
});

app.get('/api/best-pubg-streamer', async (req, res) => {
    const streamers = await callAPI(bestPUBGStreamer);
    console.log(handleData(streamers));
    res.status(200).json({success: true, result: handleData(streamers)});
});

app.get('/api/top-gta5-streamer', async (req, res) => {
    const streamers = await callAPI(topGTA5Streamer);
    console.log(handleData(streamers));
    res.status(200).json({success: true, result: handleData(streamers)});
});


const callAPI = async(arr) => {
    const streamers = []; 
    await Promise.all(arr.map(async (elem) => {
        try {
            const url = `https://sail-rank.nimo.tv/rank/annualinfluencial/activity/currentAnchorRank`;
            const data = {
                keyType: 2,
                body: elem.body
            };
            const body = new URLSearchParams(data);
            const res = await axios.post(url, body);
            streamers.push(res.data.data.result);
        } catch (error) {
          console.log('error'+ error);
        }
    }));
    return streamers;
}


const handleData = (data) => {
    return data.sort(dynamicSort("-voteAmount")).map((item, index )=> { 
        return {name: item.nickName, votes: item.voteAmount, rank: index + 1}
    });
}

const dynamicSort = (property) => {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

app.listen(PORT, () => console.log(`Runing on port ${PORT}`))
