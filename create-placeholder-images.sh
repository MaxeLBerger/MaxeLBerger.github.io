#!/bin/bash

# Script to create placeholder images for testing
# These can be used temporarily until real screenshots are taken
# Requires ImageMagick: sudo apt-get install imagemagick (Linux) or brew install imagemagick (macOS)

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed."
    echo "Install it with:"
    echo "  - Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  - macOS: brew install imagemagick"
    echo "  - Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p res/screenshots

echo "🖼️  Creating placeholder images..."

# Function to create a placeholder image
create_placeholder() {
    local filename=$1
    local text=$2
    local color=$3
    
    convert -size 1920x1080 \
            xc:"$color" \
            -pointsize 48 \
            -fill white \
            -gravity center \
            -draw "text 0,0 '$text'" \
            -pointsize 24 \
            -draw "text 0,80 'Placeholder Image'" \
            "res/screenshots/$filename"
    
    echo "✅ Created: $filename"
}

# Age of Max placeholders
echo ""
echo "📂 Creating Age of Max placeholders..."
create_placeholder "age-of-max-gameplay-early.png" "Age of Max\nGameplay - Early Wave" "#667eea"
create_placeholder "age-of-max-units-upgrades.png" "Age of Max\nUnits & Upgrades" "#764ba2"
create_placeholder "age-of-max-turret-placement.png" "Age of Max\nTurret Placement" "#667eea"
create_placeholder "age-of-max-boss-fight.png" "Age of Max\nBoss Fight" "#764ba2"
create_placeholder "age-of-max-debug-overlay.png" "Age of Max\nDebug Overlay" "#667eea"
create_placeholder "age-of-max-mobile-view.png" "Age of Max\nMobile View" "#764ba2"

# FireCastle placeholders
echo ""
echo "📂 Creating FireCastle placeholders..."
create_placeholder "firecastle-clan-overview.png" "FireCastle\nClan Overview" "#e74c3c"
create_placeholder "firecastle-player-stats.png" "FireCastle\nPlayer Stats" "#c0392b"
create_placeholder "firecastle-war-status.png" "FireCastle\nWar Status" "#e74c3c"
create_placeholder "firecastle-api-response.png" "FireCastle\nAPI Response" "#c0392b"

# AuTune Online placeholders
echo ""
echo "📂 Creating AuTune Online placeholders..."
create_placeholder "autune-visualizer-bars.png" "AuTune Online\nVisualizer - Bars" "#3498db"
create_placeholder "autune-particle-effects.png" "AuTune Online\nParticle Effects" "#2980b9"
create_placeholder "autune-bpm-detection.png" "AuTune Online\nBPM Detection" "#3498db"
create_placeholder "autune-theme-variations.png" "AuTune Online\nTheme Variations" "#2980b9"

# Casino Idle Slots placeholders
echo ""
echo "📂 Creating Casino Idle Slots placeholders..."
create_placeholder "casino-idle-slots-main-game.png" "Casino Idle Slots\nMain Game" "#f39c12"
create_placeholder "casino-idle-slots-upgrades.png" "Casino Idle Slots\nUpgrades" "#e67e22"
create_placeholder "casino-idle-slots-achievements.png" "Casino Idle Slots\nAchievements" "#f39c12"
create_placeholder "casino-idle-slots-prestige.png" "Casino Idle Slots\nPrestige System" "#e67e22"
create_placeholder "casino-idle-slots-leaderboard.png" "Casino Idle Slots\nLeaderboard" "#f39c12"
create_placeholder "casino-idle-slots-slot-machines.png" "Casino Idle Slots\nSlot Machines" "#e67e22"

# SoundofLvke placeholders
echo ""
echo "📂 Creating SoundofLvke placeholders..."
create_placeholder "soundoflvke-homepage.png" "SoundofLvke\nHomepage" "#1abc9c"
create_placeholder "soundoflvke-beat-shop.png" "SoundofLvke\nBeat Shop" "#16a085"
create_placeholder "soundoflvke-portfolio.png" "SoundofLvke\nPortfolio" "#1abc9c"
create_placeholder "soundoflvke-contact.png" "SoundofLvke\nContact" "#16a085"

# Albert placeholders
echo ""
echo "📂 Creating Albert placeholders..."
create_placeholder "albert-neural-network.png" "Albert\nNeural Network" "#9b59b6"
create_placeholder "albert-fitness-progression.png" "Albert\nFitness Progression" "#8e44ad"
create_placeholder "albert-mutations-heatmap.png" "Albert\nMutations Heatmap" "#9b59b6"

echo ""
echo "✨ Done! Created 27 placeholder images in res/screenshots/"
echo ""
echo "⚠️  Note: These are temporary placeholders for testing."
echo "Replace them with actual screenshots of the projects."
echo ""
echo "To test locally, run:"
echo "  python -m http.server 8000"
echo "  # or"
echo "  npx serve ."
echo ""
echo "Then visit: http://localhost:8000/projects/"
