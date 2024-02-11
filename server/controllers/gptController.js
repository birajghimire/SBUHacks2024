const dotenv = require('dotenv').config();
const axios = require('axios');

async function postGPT(req, res) {

    const { prompt } = req.body;
    console.log(process.env.OPENAI_API_KEY);

    try {

        // const promptNew = "I want to take this course next semester, here is the description for it: " + courseResult[0].description + " Can you give me a study guide for this class for 4 months. Week by week base." + "Can you give additional resources as well like links for them, I am a " + req.body.skillLevel + " with the content."+ "I am also a "+ req.body.typeOfLearner + "learner. Can you tailor a study plan for me?"
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4-0125-preview",
            messages: [
                { role: 'system', content: 'You are a professional therapist who is giving feedback on an individuals journal.' },
                { role: 'user', content: prompt }
            ],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        console.log("Response from OpenAI", response.data.choices[0].message.content);
        const openAiContent = response.data.choices[0].message.content;

        res.json(openAiContent);


    } catch (error) {
        res.status(500).send(error);
    }

}

module.exports = { postGPT }