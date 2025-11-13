from concurrent.futures import ThreadPoolExecutor
import os

import grpc
from dotenv import load_dotenv
from backend.services.pipeline.summarize import generate_blog_post, summarize_text
from backend.services.pipeline.tts import generate_tts
from backend.services.pipeline.whisper import transcribe_audio
from proto import service_pb2, service_pb2_grpc


class PodcastSummarizerService(service_pb2_grpc.PodcastSummarizerServiceServicer):
    def __init__(self):
        super().__init__()

    def ProcessPodcast(self, request, context):
        # Step 1 - Transcribe Audio
        transcript = transcribe_audio(audio_bytes=request.audio_bytes, language_hint=request.language_hint)

        # Step 2 - Summarize the transcript
        bullet_points, summary_paragraph = summarize_text(transcript=transcript)

        # Step 3 - Create a blog post from the transcript [Optional]
        blog_post = generate_blog_post(transcript=transcript) if request.generate_blog else ""

        # Step 4 - Convert summary to speech (TTS) [Optional]
        summary_audio_bytes = generate_tts(summary_text=summary_paragraph) if request.generate_tts else b""

        # Step 5 - Prepare and return the response
        response = service_pb2.SummarizePodcastResponse(
            transcript=transcript,
            bullet_points=bullet_points,
            summary_paragraph=summary_paragraph,
            blog_post=blog_post,
            summary_audio_bytes=summary_audio_bytes,
            metadata={
                "transcript_model": "faster_whisper_medium",
                "summarization_model": "ollama_llama2",
                "tts_model": "openai_gpt-4o-mini-tts" if request.generate_tts else ""
            }
        )

        return response

def serve():
     load_dotenv()
     assert os.getenv("OPENAI_API_KEY"), "OPENAI_API_KEY is not set in environment variables."

     server = grpc.server(thread_pool=ThreadPoolExecutor(max_workers=10))
     service_pb2_grpc.add_PodcastSummarizerServiceServicer_to_server(PodcastSummarizerService(), server)

     server.add_insecure_port("[::]:50051")
     server.start()
     print("gRPC server is running on port 50051...")
     server.wait_for_termination()

if __name__ == "__main__":
    serve()