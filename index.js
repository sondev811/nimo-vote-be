const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 5000;

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const listStreamer = [
    {
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3F48455C9418BB00CFCC3BA7E7ABC0A1764EF4CB620A33D44356ABA4C9767C0FD7BADC52C69363FA1805E0B49783295E9A6FC9E41195B7372313A7726B16B62BF8',
        name: 'tik',
        anchorId: '1599512087690'
    },
    {
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3F48455C9418BB00CFCC3BA7E7ABC0A176E9B81D4ACBA284B71241C2E316E44017AACD31240B470C7BB2886B79A238C86335160FEEA33B9A4C07D30167C0575EDD',
        name: 'Hai under',
        anchorId: '1599518293430'
    },
    {
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3F6B074355AFEE4C197F5A3B54BE6FE033BBEB21E9D6E4B103B302C73B07384FCFE7E6BA66CD025FF29DE1F20CC5020837149609F99C0004BC0B0AE7964CE9BACB',
        name: 'Huy troc',
        anchorId: '1629512377615'
    },
    {
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3F6B074355AFEE4C197F5A3B54BE6FE0334C95DAAE32924A81B70444B4991984EF50DABB7802597513C4939031039386BE5A73016EF1F1A8E3E5DC23C426035A25',
        name: 'Jikey',
        anchorId: '1629513216738'
    },
    {
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3F6B074355AFEE4C197F5A3B54BE6FE0336929B3A478D2059463BBCCDBE24FB6A56A200BA22C96A8F4DF58BA2E956178B222D69ACF19BD349B480E9115CEA6D4C4',
        name: 'QNT',
        anchorId: '1639514062140'
    },
    {
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3F6B074355AFEE4C197F5A3B54BE6FE0333B3F4749E6EA5B017D3268446BB899EAEC2914C9541582269AC80F37C77EB3F8DB69280C889632A801C6CF8DF45A413C',
        name: 'Hoang Anh',
        anchorId: '1639516153733'
    },
    {
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3F6B074355AFEE4C197F5A3B54BE6FE033333299C4DBCEFF829DC674A0E3E9CBA48273E5B92FE4A00FE0B4804C1DEF4C71401D7AC57A2661604D227E1AC08122F5',
        name: 'No Hair',
        anchorId: '1639517223233'
    },
    {
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3F6B074355AFEE4C197F5A3B54BE6FE03337C8ACEEC7B4115F1A9F30C96A035E110EA6E5875369D0B7F7DA12302B5E47926CF29B9E642A771BA33B8DDFB24997AA',
        name: 'SBTC Kit',
        anchorId: '1639520236688'
    },
    {
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3FBDC1B9187167B912E383D1319211AC6B9587EE43165AD690E9A267F2B200A0309DE00014186F0724847D7BCA22F7CEF94B42E53F2CDECD5C994C02E96F8043CC',
        name: 'Xemesis',
        anchorId: '1799511743537'
    },
    { 
        body: '7E197ACA1C01B83A9648FB9290AEBEF21F8CD18314AD9D88A9D94AFC91388719FEB7A6EDCD8F62147E39C94723DC73A924D80693E7AF80E5531FF6F2544BBCED4723837FE8EFC6DAF88F3D0BF4EF2C3F97BC669D4089CFC51773D3EB229A6CB047EAFBD55C780457B27FF6B046CDDCA1845717CC70A8FCC50BA250B81B38D427B861A55D7F4DF282F73A3FCE6F817A06',
        name: 'dev',
        anchorId: '1939513246539'
    }, 

];

app.get('/api', async (req, res) => {
    const streamers = []; 
    await Promise.all(listStreamer.map(async (elem) => {
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
      }))
    console.log(handleData(streamers));
    res.status(200).json({success: true, result: handleData(streamers)});
});

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
