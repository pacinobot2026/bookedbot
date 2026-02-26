$text = [System.IO.File]::ReadAllText("C:\Users\Administrator\.openclaw\workspace\bookedbot\vsl-text.txt")
$apiKey = "sk_86798b0bdcc222bd06e4c12452b88191c3b3bb20752b6569"
$voiceId = "PeMXWXe7DDCb8HldBr2s"

$bodyObj = @{
    text = $text
    model_id = "eleven_turbo_v2_5"
    voice_settings = @{
        stability = 0.5
        similarity_boost = 0.75
    }
}
$body = $bodyObj | ConvertTo-Json -Depth 3

$headers = @{
    "xi-api-key" = $apiKey
    "Content-Type" = "application/json"
}

Invoke-RestMethod -Uri "https://api.elevenlabs.io/v1/text-to-speech/$voiceId" -Method Post -Headers $headers -Body $body -OutFile "C:\Users\Administrator\.openclaw\workspace\bookedbot\vsl-audio.mp3"

Write-Host "Audio generated: bookedbot/vsl-audio.mp3"
