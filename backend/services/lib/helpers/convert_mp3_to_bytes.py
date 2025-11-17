file_path = "../../../../public/test_audio.mp3"
audio_bytes_file_path = "./audio_bytes.txt"

with open(file_path, "rb") as audio_file:
    audio_bytes = audio_file.read()

with open(audio_bytes_file_path, "w") as file:
    file.write(str(audio_bytes))