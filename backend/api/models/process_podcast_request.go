package models

type ProcessPodcastRequest struct {
	AudioB64     string            `json:"audio_b64" binding:"required"`
	AudioFormat  string            `json:"audio_format" binding:"required"`
	LanguageHint string            `json:"language_hint"`
	GenerateBlog bool              `json:"generate_blog"`
	GenerateTTS  bool              `json:"generate_tts"`
	Metadata     map[string]string `json:"metadata"`
}
