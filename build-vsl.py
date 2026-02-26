"""
BookedBot VSL Builder
Builds text-slide video from transcript with word-level timestamps
"""

import json
import subprocess
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# Paths
SCRIPT_DIR = Path(__file__).parent
TRANSCRIPT_PATH = SCRIPT_DIR / "vsl-transcript.json"
AUDIO_PATH = SCRIPT_DIR / "vsl-audio.mp3"
SLIDES_DIR = SCRIPT_DIR / "slides"
OUTPUT_PATH = SCRIPT_DIR / "vsl-video.mp4"

# Video settings
WIDTH = 1920
HEIGHT = 1080
BG_COLOR = (15, 15, 25)  # Very dark navy
TEXT_COLOR = (255, 255, 255)  # White
EMPHASIS_COLOR = (255, 200, 0)  # Gold for emphasis
FPS = 30

# Key words to highlight
EMPHASIS_WORDS = {
    'money', 'losing', 'lost', '62', '78', 
    'thousands', 'dollars', '497', '1500',
    'bookedbot', 'bookbot', 'ai', 'calendar', 'automatic',
    'automatically', 'guarantee', 'refund', 'free',
    'voicemail', 'competitors', 'unanswered', 'missed'
}

def get_font(size):
    """Get font, try system fonts"""
    font_paths = [
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            return ImageFont.truetype(fp, size)
    return ImageFont.load_default()

def wrap_text(text, font, max_width, draw):
    """Wrap text to fit within max_width"""
    words = text.split()
    lines = []
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
            current_line = [word]
    
    if current_line:
        lines.append(' '.join(current_line))
    
    return lines

def get_font_size(text):
    """Determine optimal font size based on text length"""
    word_count = len(text.split())
    
    if word_count <= 4:
        return 140  # HUGE
    elif word_count <= 7:
        return 100  # LARGE
    elif word_count <= 12:
        return 72   # MEDIUM
    else:
        return 56   # SMALL

def create_slide(text, slide_num):
    """Create a single slide with text"""
    img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    font_size = get_font_size(text)
    font = get_font(font_size)
    
    # Wrap text
    lines = wrap_text(text, font, 1600, draw)
    
    # Calculate total height
    line_height = font_size * 1.3
    total_height = len(lines) * line_height
    
    # Start Y position (center vertically)
    y = (HEIGHT - total_height) / 2
    
    for line in lines:
        # Calculate line width for centering
        bbox = draw.textbbox((0, 0), line, font=font)
        line_width = bbox[2] - bbox[0]
        x = (WIDTH - line_width) / 2
        
        # Check for emphasis words
        words = line.split()
        current_x = x
        
        for i, word in enumerate(words):
            word_lower = word.lower().strip('.,!?')
            color = EMPHASIS_COLOR if word_lower in EMPHASIS_WORDS else TEXT_COLOR
            
            if i > 0:
                # Add space
                space_bbox = draw.textbbox((0, 0), ' ', font=font)
                current_x += space_bbox[2] - space_bbox[0]
            
            draw.text((current_x, y), word, fill=color, font=font)
            word_bbox = draw.textbbox((0, 0), word, font=font)
            current_x += word_bbox[2] - word_bbox[0]
        
        y += line_height
    
    # Save slide
    slide_path = SLIDES_DIR / f"slide_{slide_num:04d}.png"
    img.save(slide_path, "PNG")
    return slide_path

def segment_words(words):
    """Segment words into logical slide groups"""
    segments = []
    current_segment = []
    current_start = 0
    
    for word_data in words:
        word = word_data.get('word', '').strip()
        if not word:
            continue
            
        start = word_data.get('start', 0)
        end = word_data.get('end', start + 0.5)
        
        if not current_segment:
            current_start = start
        
        current_segment.append(word)
        
        # Check for natural breaks
        is_end_punctuation = word.endswith(('.', '?', '!'))
        word_count = len(current_segment)
        
        should_break = (
            (is_end_punctuation and word_count >= 3) or
            (word_count >= 8) or
            (word_count >= 5 and (word.endswith(',') or word.endswith(':')))
        )
        
        if should_break:
            segments.append({
                'text': ' '.join(current_segment),
                'start': current_start,
                'end': end
            })
            current_segment = []
    
    # Don't forget last segment
    if current_segment:
        segments.append({
            'text': ' '.join(current_segment),
            'start': current_start,
            'end': words[-1].get('end', current_start + 1)
        })
    
    return segments

def main():
    print("BookedBot VSL Builder")
    print("=" * 50)
    
    # Create slides directory
    SLIDES_DIR.mkdir(exist_ok=True)
    
    # Clean old slides
    for f in SLIDES_DIR.glob("*.png"):
        f.unlink()
    
    # Load transcript
    print(">>> Loading transcript...")
    with open(TRANSCRIPT_PATH, 'r') as f:
        transcript = json.load(f)
    
    words = transcript.get('words', [])
    duration = transcript.get('duration', 163)
    
    print(f"   Duration: {duration:.1f}s ({int(duration)//60}m {int(duration)%60}s)")
    print(f"   Words: {len(words)}")
    
    # Segment into slides
    print("\n>>> Segmenting into slides...")
    segments = segment_words(words)
    print(f"   Created {len(segments)} segments")
    
    # Generate slides
    print("\n>>> Generating slides...")
    for i, seg in enumerate(segments):
        create_slide(seg['text'], i)
        if (i + 1) % 20 == 0:
            print(f"   Generated {i + 1}/{len(segments)} slides")
    print(f"   Generated {len(segments)} slides total")
    
    # Create concat file for FFmpeg
    print("\n>>> Creating video...")
    concat_path = SLIDES_DIR / "concat.txt"
    with open(concat_path, 'w') as f:
        for i, seg in enumerate(segments):
            slide_path = SLIDES_DIR / f"slide_{i:04d}.png"
            slide_duration = seg['end'] - seg['start']
            slide_duration = max(0.5, min(4.0, slide_duration))  # Clamp
            f.write(f"file '{slide_path.name}'\n")
            f.write(f"duration {slide_duration:.3f}\n")
        # Add last frame to avoid FFmpeg issue
        last_slide = f"slide_{len(segments)-1:04d}.png"
        f.write(f"file '{last_slide}'\n")
    
    # Run FFmpeg
    cmd = [
        'ffmpeg', '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', str(concat_path),
        '-i', str(AUDIO_PATH),
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '23',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-pix_fmt', 'yuv420p',
        '-shortest',
        str(OUTPUT_PATH)
    ]
    
    print(f"   Running FFmpeg...")
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=str(SLIDES_DIR))
    
    if result.returncode != 0:
        print(f"ERROR: FFmpeg failed")
        print(result.stderr[-1000:] if result.stderr else "No error output")
        return
    
    # Check output
    if OUTPUT_PATH.exists():
        size_mb = OUTPUT_PATH.stat().st_size / (1024 * 1024)
        print(f"\nSUCCESS! Output: {OUTPUT_PATH}")
        print(f"   Size: {size_mb:.2f} MB")
    else:
        print("ERROR: Output file not created")

if __name__ == "__main__":
    main()
