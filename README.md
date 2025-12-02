# AI Podcast Summarizer

## Install the Necessary Packages

The below command installs the necessary Python gRPC packages.

```bash
pip3 install grpcio grpcio-tools
```

The below command installs the necessary Go gRPC packages.

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

Add the installed Go protoc-gen-go package to PATH

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

## Generate the gRPC Files

Run the below command from the /backend folder to generate the Python gRPC files.

```bash
python3 -m grpc_tools.protoc -I./proto --python_out=./services/proto --grpc_python_out=./services/proto ./proto/service.proto
```

Run the below command from the /backend folder to generate the Go gRPC files.

```bash
protoc --proto_path=./proto --go_out=./api/proto --go_opt=paths=source_relative --go-grpc_out=./api/proto --go-grpc_opt=paths=source_relative ./proto/service.proto
```

## API Usage

### Request

```
curl --location 'http://localhost:8080/api/processaudio' \
--header 'Content-Type: application/json' \
--data '{
    "audio_b64": "SUQzBAAAAAACDVRQRTEAAAATAAADV2lsbGlz...",
    "audio_format": "mp3",
    "generate_blog": true,
    "generate_tts": true
}'
```

### Response

{
  "transcript": " Earth. Christmas Day—does it not grow dearer to us every year? The summers come and go,  we rush to and fro on our little errands of business and pleasure. Great joys dawn in  our lives, dark shadows of bitter disappointment creep over them. We are glad, sorrowful, eager,  weary, well, ill. Life's heart beats strongly, and death is busy in its midst. We strive  for the beautiful, the true, and the good. We hide our faces in helpless agony of shame  and remorse. Yet again comes the dear day of days, with its blessed associations, memories,  hopes. Christmas—do you remember what that word meant to you when you were a child? What  a mysterious halo of light surrounded the day! How the very sound of its name suggested the  fragrance of the fir tree and wax candles and marvellous toys, and the far-off tinkle of sleigh.",
  "bullet_points": [
    "Reflections on Christmas Day",
    "The passage highlights the annual significance of Christmas Day",
    "Mentions the transient nature of life, its joys and sorrows",
    "Discusses human pursuit of beauty, truth, and goodness",
    "Describes moments of shame and remorse experienced in life",
    "Reminisces about childhood memories associated with Christmas",
    "Evokes images of fir trees, candles, toys, and sleigh bells"
  ],
  "summary_paragraph": "The podcast discusses the sentimental attachment people often feel towards Christmas Day, recalling its associations with joy, wonder, and childhood memories while acknowledging life's transient nature and human emotions.",
  "blog_post": "Title: Rediscovering the Magic of Christmas: A Journey Through Time and Memory\n\nIn the hustle and bustle of life, with summers passing by and winters melting away, there's one day that seems to hold a special place in our hearts – Christmas Day. It's a day that, as we grow older, appears to grow dearer with each passing year.\n\nLife is a rollercoaster ride of joy and sorrow, of success and failure, of health and illness. We chase dreams, experience setbacks, and learn valuable lessons. Yet, amidst the chaos, Christmas remains a beacon of hope and warmth, a day that resonates deeply with our childhood memories.\n\nRemember how the word 'Christmas' used to sparkle with magic as a child? It was synonymous with the fresh scent of pine from the fir tree, the soft glow of wax candles, and the promise of marvelous toys waiting under the tree. The distant tinkling of sleigh bells added an extra layer of enchantment to this special day.\n\nChristmas is more than just a holiday; it's a time for reflection, for rekindling old memories, and for renewing our hopes. It's a day that transcends the everyday challenges we face in life and reminds us of the beauty, truth, and goodness that lies within us all.\n\nAs we grow older, the significance of Christmas may shift, but its magic remains undimmed. Whether it's the anticipation of gifts, the joy of spending time with loved ones, or the warmth of traditional customs, Christmas continues to be a cherished symbol of peace and happiness in our lives. So, let's take a moment this holiday season to remember what Christmas meant to us as children, and embrace its magic once more.",
  "summary_audio_b64": "//PExABbtDnYAN4y3DgAw2eTNjEQhwwgILiAYLLVgo...",
  "metadata": {
    "summarization_model": "whisper",
    "transcript_model": "faster_whisper_medium",
    "tts_model": "openai_gpt-4o-mini-tts"
  }
}

## UI

![Home Screen UI](/public/HomeScreenUI.png)

