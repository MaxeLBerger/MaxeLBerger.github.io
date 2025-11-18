#!/usr/bin/env python3
"""
Script to create placeholder images for testing
These can be used temporarily until real screenshots are taken
Requires: pip install pillow
"""

import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("❌ Error: PIL (Pillow) is not installed.")
    print("Install it with: pip install pillow")
    exit(1)

# Create screenshots directory
SCREENSHOTS_DIR = Path("res/screenshots")
SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)

# Image dimensions
WIDTH, HEIGHT = 1920, 1080

def create_placeholder(filename, text, color):
    """Create a placeholder image with text"""
    # Create image
    img = Image.new('RGB', (WIDTH, HEIGHT), color=color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fall back to default if not available
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 30)
    except:
        try:
            title_font = ImageFont.truetype("arial.ttf", 60)
            subtitle_font = ImageFont.truetype("arial.ttf", 30)
        except:
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
    
    # Draw main text (centered)
    lines = text.split('\n')
    y_offset = HEIGHT // 2 - (len(lines) * 60)
    
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=title_font)
        text_width = bbox[2] - bbox[0]
        x = (WIDTH - text_width) // 2
        draw.text((x, y_offset), line, fill='white', font=title_font)
        y_offset += 80
    
    # Draw subtitle
    subtitle = "Placeholder Image"
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    text_width = bbox[2] - bbox[0]
    x = (WIDTH - text_width) // 2
    draw.text((x, y_offset + 30), subtitle, fill='white', font=subtitle_font)
    
    # Save image
    filepath = SCREENSHOTS_DIR / filename
    img.save(filepath, 'PNG')
    print(f"✅ Created: {filename}")

print("🖼️  Creating placeholder images...\n")

# Age of Max placeholders
print("📂 Creating Age of Max placeholders...")
create_placeholder("age-of-max-gameplay-early.png", "Age of Max\nGameplay - Early Wave", "#667eea")
create_placeholder("age-of-max-units-upgrades.png", "Age of Max\nUnits & Upgrades", "#764ba2")
create_placeholder("age-of-max-turret-placement.png", "Age of Max\nTurret Placement", "#667eea")
create_placeholder("age-of-max-boss-fight.png", "Age of Max\nBoss Fight", "#764ba2")
create_placeholder("age-of-max-debug-overlay.png", "Age of Max\nDebug Overlay", "#667eea")
create_placeholder("age-of-max-mobile-view.png", "Age of Max\nMobile View", "#764ba2")

# FireCastle placeholders
print("\n📂 Creating FireCastle placeholders...")
create_placeholder("firecastle-clan-overview.png", "FireCastle\nClan Overview", "#e74c3c")
create_placeholder("firecastle-player-stats.png", "FireCastle\nPlayer Stats", "#c0392b")
create_placeholder("firecastle-war-status.png", "FireCastle\nWar Status", "#e74c3c")
create_placeholder("firecastle-api-response.png", "FireCastle\nAPI Response", "#c0392b")

# AuTune Online placeholders
print("\n📂 Creating AuTune Online placeholders...")
create_placeholder("autune-visualizer-bars.png", "AuTune Online\nVisualizer - Bars", "#3498db")
create_placeholder("autune-particle-effects.png", "AuTune Online\nParticle Effects", "#2980b9")
create_placeholder("autune-bpm-detection.png", "AuTune Online\nBPM Detection", "#3498db")
create_placeholder("autune-theme-variations.png", "AuTune Online\nTheme Variations", "#2980b9")

# Casino Idle Slots placeholders
print("\n📂 Creating Casino Idle Slots placeholders...")
create_placeholder("casino-idle-slots-main-game.png", "Casino Idle Slots\nMain Game", "#f39c12")
create_placeholder("casino-idle-slots-upgrades.png", "Casino Idle Slots\nUpgrades", "#e67e22")
create_placeholder("casino-idle-slots-achievements.png", "Casino Idle Slots\nAchievements", "#f39c12")
create_placeholder("casino-idle-slots-prestige.png", "Casino Idle Slots\nPrestige System", "#e67e22")
create_placeholder("casino-idle-slots-leaderboard.png", "Casino Idle Slots\nLeaderboard", "#f39c12")
create_placeholder("casino-idle-slots-slot-machines.png", "Casino Idle Slots\nSlot Machines", "#e67e22")

# SoundofLvke placeholders
print("\n📂 Creating SoundofLvke placeholders...")
create_placeholder("soundoflvke-homepage.png", "SoundofLvke\nHomepage", "#1abc9c")
create_placeholder("soundoflvke-beat-shop.png", "SoundofLvke\nBeat Shop", "#16a085")
create_placeholder("soundoflvke-portfolio.png", "SoundofLvke\nPortfolio", "#1abc9c")
create_placeholder("soundoflvke-contact.png", "SoundofLvke\nContact", "#16a085")

# Albert placeholders
print("\n📂 Creating Albert placeholders...")
create_placeholder("albert-neural-network.png", "Albert\nNeural Network", "#9b59b6")
create_placeholder("albert-fitness-progression.png", "Albert\nFitness Progression", "#8e44ad")
create_placeholder("albert-mutations-heatmap.png", "Albert\nMutations Heatmap", "#9b59b6")

print("\n✨ Done! Created 27 placeholder images in res/screenshots/")
print("\n⚠️  Note: These are temporary placeholders for testing.")
print("Replace them with actual screenshots of the projects.")
print("\nTo test locally, run:")
print("  python -m http.server 8000")
print("  # or")
print("  npx serve .")
print("\nThen visit: http://localhost:8000/projects/")
