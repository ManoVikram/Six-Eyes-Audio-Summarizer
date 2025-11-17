package models

type ProcessPodcastResponse struct {
	Transcript      string            `json:"transcript"`
	BulletPoints    []string          `json:"bullet_points"`
	SummaryParagrah string            `json:"summary_paragraph"`
	BlogPost        string            `json:"blog_post"`
	SummaryAudioB64 string            `json:"summary_audio_b64"`
	Metadata        map[string]string `json:"metadata"`
}
