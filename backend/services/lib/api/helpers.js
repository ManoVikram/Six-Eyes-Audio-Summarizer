"use server";

const API_BASE_URL = process.env.API_BASE_URL;

const convertBytesToBase64 = (file) => { }

export const processPodcast = async (audioFile, audioFormat, generateBlogPost, generateAudioSummary) => {
    // Step 1 - Call the API endpoint to generate a transcript and summarize the audio
    const response = await fetch(`${API_BASE_URL}/api/processaudio`, {
        method: "POST",
        body: JSON.stringify({
            audio_b64: convertBytesToBase64(audioFile),
            audio_format: audioFormat,
            generate_blog: generateBlogPost,
            generate_tts: generateAudioSummary,
        })
    })

    // Step 2 - Convert the response to JSON
    const responseData = response.json()

    // Step 3 - Return the response
    return responseData
}