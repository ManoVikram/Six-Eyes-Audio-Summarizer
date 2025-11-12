from openai import OpenAI

client = OpenAI()

def generate_tts(summary_text):
    audio = client.audio.speech.create(
        model="gpt-4o-mini-tts",
        voice="alloy",
        input=summary_text
    )

    return audio.read()