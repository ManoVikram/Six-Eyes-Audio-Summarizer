"use server";

const API_BASE_URL = process.env.API_BASE_URL;

const convertBytesToBase64 = async (file) => {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return buffer.toString("base64")
}

export const processPodcast = async (audioFile, audioFormat, generateBlogPost, generateAudioSummary) => {
    // Step 1 - Convert the file to base64
    const audio_b64 = await convertBytesToBase64(audioFile)

    // Step 2 - Call the API endpoint to generate a transcript and summarize the audio
    const response = await fetch(`${API_BASE_URL}/api/processaudio`, {
        method: "POST",
        body: JSON.stringify({
            audio_b64: audio_b64,
            audio_format: audioFormat,
            generate_blog: generateBlogPost,
            generate_tts: generateAudioSummary,
        })
    })

    // Step 3 - Convert the response to JSON
    const responseData = response.json()

    // Step 4 - Return the response
    return responseData
}