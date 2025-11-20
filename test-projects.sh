#!/bin/bash

# Portfolio Projects Testing Script
# Tests all deployed projects for availability and basic functionality

set -e

BASE_URL="${1:-https://maximilianhaak.de}"
FAILED_TESTS=0

echo "🧪 ================================================"
echo "    Portfolio Projects Testing Suite"
echo "    Testing URL: $BASE_URL"
echo "================================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test URL
test_url() {
    local url=$1
    local name=$2
    local http_code
    
    echo -n "Testing $name... "
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" --max-time 10)
    
    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ OK${NC} (HTTP $http_code)"
        return 0
    elif [ "$http_code" = "301" ] || [ "$http_code" = "302" ]; then
        echo -e "${YELLOW}⚠️  Redirect${NC} (HTTP $http_code)"
        return 0
    else
        echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

# Function to check for JavaScript errors
check_js_content() {
    local url=$1
    local name=$2
    
    echo -n "Checking $name for script tags... "
    local content=$(curl -s "$url")
    
    if echo "$content" | grep -q "<script"; then
        echo -e "${GREEN}✅ Found${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  No scripts${NC}"
        return 0
    fi
}

echo "📄 Testing Main Portfolio Pages"
echo "--------------------------------"
test_url "$BASE_URL/" "Main Portfolio (index.html)"
test_url "$BASE_URL/impressum.html" "Impressum Page"
test_url "$BASE_URL/datenschutz.html" "Datenschutz Page"
echo ""

echo "📝 Testing Project Landing Pages"
echo "--------------------------------"
test_url "$BASE_URL/projects/age-of-max.html" "Age of Max Landing"
test_url "$BASE_URL/projects/firecastle.html" "FireCastle Landing"
test_url "$BASE_URL/projects/autune-online.html" "AuTune Online Landing"
test_url "$BASE_URL/projects/casino-idle-slots.html" "Casino Idle Slots Landing"
test_url "$BASE_URL/projects/albert.html" "Albert Landing"
test_url "$BASE_URL/projects/soundoflvke.html" "SoundofLvke Landing"
test_url "$BASE_URL/projects/testomax.html" "TestoMax Landing"
echo ""

echo "🎮 Testing AgeOfMax Project"
echo "--------------------------------"
test_url "$BASE_URL/AgeOfMax/" "AgeOfMax Game"
test_url "$BASE_URL/AgeOfMax/index.html" "AgeOfMax Index"
check_js_content "$BASE_URL/AgeOfMax/" "AgeOfMax"
echo ""

echo "🏰 Testing FireCastle Project"
echo "--------------------------------"
test_url "$BASE_URL/FireCastle/" "FireCastle Website"
test_url "$BASE_URL/FireCastle/index.html" "FireCastle Index"

echo -n "Testing FireCastle API endpoints... "
# Note: These might not work if the API requires server-side Node.js
api_test=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/FireCastle/api/clan" --max-time 5)
if [ "$api_test" = "200" ] || [ "$api_test" = "500" ]; then
    echo -e "${GREEN}✅ Responding${NC} (HTTP $api_test)"
else
    echo -e "${YELLOW}⚠️  Static only${NC} (HTTP $api_test) - API requires Node.js backend"
fi
echo ""

echo "🎵 Testing AuTuneOnline Project"
echo "--------------------------------"
test_url "$BASE_URL/AuTuneOnline/" "AuTuneOnline App"
test_url "$BASE_URL/AuTuneOnline/index.html" "AuTuneOnline Index"
check_js_content "$BASE_URL/AuTuneOnline/" "AuTuneOnline"
echo ""

echo "🎰 Testing CasinoIdleSlots Project"
echo "--------------------------------"
test_url "$BASE_URL/CasinoIdleSlots/" "CasinoIdleSlots Game"
test_url "$BASE_URL/CasinoIdleSlots/index.html" "CasinoIdleSlots Index"
check_js_content "$BASE_URL/CasinoIdleSlots/" "CasinoIdleSlots"
echo ""

echo "🧪 Testing TestoMax Project"
echo "--------------------------------"
test_url "$BASE_URL/TestoMax/" "TestoMax App"
test_url "$BASE_URL/TestoMax/index.html" "TestoMax Index"
check_js_content "$BASE_URL/TestoMax/" "TestoMax"
echo ""

echo "🎼 Testing External Links"
echo "--------------------------------"
test_url "https://soundoflvke.github.io" "SoundofLvke External Site"
echo ""

echo "🎨 Testing Static Resources"
echo "--------------------------------"
test_url "$BASE_URL/style.css" "Main Stylesheet"
test_url "$BASE_URL/script.js" "Main JavaScript"
test_url "$BASE_URL/projects/style.css" "Projects Stylesheet"
test_url "$BASE_URL/res/faviconwhitegreen.png" "Favicon"
echo ""

echo "📊 Testing Images"
echo "--------------------------------"
test_url "$BASE_URL/res/AgeOfMax.jpg" "AgeOfMax Preview"
test_url "$BASE_URL/res/FireCastle.jpg" "FireCastle Preview"
test_url "$BASE_URL/res/AuTune.jpg" "AuTune Preview"
test_url "$BASE_URL/res/CasinoIdleSlots.svg" "CasinoIdleSlots Preview"
test_url "$BASE_URL/res/maxlervorne.png" "Profile Image"
echo ""

# Summary
echo "================================================"
echo "    Test Summary"
echo "================================================"
if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Test interactive features manually"
    echo "2. Check browser console for JavaScript errors"
    echo "3. Test on different devices (mobile, tablet)"
    exit 0
else
    echo -e "${RED}❌ $FAILED_TESTS test(s) failed${NC}"
    echo ""
    echo "Please review the failures above and:"
    echo "1. Check deployment status"
    echo "2. Verify file paths"
    echo "3. Review GitHub Actions logs"
    exit 1
fi
