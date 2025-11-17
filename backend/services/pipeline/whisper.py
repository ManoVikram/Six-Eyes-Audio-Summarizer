from faster_whisper import WhisperModel
import tempfile

model = WhisperModel("medium", device="auto")

def transcribe_audio(audio_bytes, audio_format, language_hint):
    # Step 1 - Store the audio bytes in a temporary file as WhisperModel expects a file path
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{audio_format}") as temp_audio_file:
        temp_audio_file.write(audio_bytes)
        temp_audio_file_path = temp_audio_file.name

    # Step 2 - Use the WhisperModel to transcribe the audio
    language = language_hint.strip()

    if language == "":
        language = None

    segments, info = model.transcribe(audio=temp_audio_file_path, language=language)

    # Step 3 - Combine the segments into a full transcript
    transcript_text = " ".join([segment.text for segment in segments])

    # Step 4 - Return the transcript text
    return transcript_text