package models

type ProcessPodcastResponse struct {
	Transcript        string            `json:"transcript"`
	BulletPoints      []string          `json:"bullet_points"`
	SummaryParagrah   string            `json:"summary_paragraph"`
	BlogPost          string            `json:"blog_post"`
	SummaryAudioBytes []byte            `json:"summary_audio_bytes"`
	Metadata          map[string]string `json:"metadata"`
}
