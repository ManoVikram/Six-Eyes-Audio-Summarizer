package models

type ProcessPodcastRequest struct {
	AudioBytes   []byte            `json:"audio_bytes" binding:"required"`
	AudioFormat  string            `json:"audio_format" binding:"required"`
	LanguageHint string            `json:"language_hint"`
	GenerateBlog bool              `json:"generate_blog"`
	GenerateTTS  bool              `json:"generate_tts"`
	Metadata     map[string]string `json:"metadata"`
}
