#!/bin/bash

# FireCastle API Testing Script
# Tests all FireCastle API endpoints

set -e

BASE_URL="${1:-https://maximilianhaak.de/FireCastle}"

echo "🏰 ================================================"
echo "    FireCastle API Testing Suite"
echo "    Testing URL: $BASE_URL"
echo "================================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

FAILED_TESTS=0

# Function to test API endpoint
test_api() {
    local endpoint=$1
    local description=$2
    
    echo ""
    echo -e "${BLUE}Testing: $endpoint${NC}"
    echo "Description: $description"
    echo -n "Status: "
    
    # Get response
    response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint" --max-time 10)
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    # Check status code
    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ OK${NC} (HTTP $http_code)"
        
        # Try to parse and display JSON
        if echo "$body" | jq empty 2>/dev/null; then
            echo "Response (formatted):"
            echo "$body" | jq '.' 2>/dev/null | head -n 20
            if [ $(echo "$body" | jq '.' | wc -l) -gt 20 ]; then
                echo "... (truncated)"
            fi
        else
            echo "Response (raw):"
            echo "$body" | head -n 10
        fi
        
        return 0
    elif [ "$http_code" = "404" ]; then
        echo -e "${RED}❌ Not Found${NC} (HTTP $http_code)"
        echo "Note: This endpoint may not be available in static deployment"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    elif [ "$http_code" = "500" ]; then
        echo -e "${RED}❌ Server Error${NC} (HTTP $http_code)"
        echo "Response:"
        echo "$body" | head -n 10
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    elif [ "$http_code" = "000" ]; then
        echo -e "${RED}❌ Connection Failed${NC}"
        echo "Note: Server may not be running or URL is incorrect"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    else
        echo -e "${YELLOW}⚠️  Unexpected Status${NC} (HTTP $http_code)"
        echo "Response:"
        echo "$body" | head -n 10
        return 0
    fi
}

echo "ℹ️  Important Notes:"
echo "- FireCastle API requires a running Node.js/Express server"
echo "- Static GitHub Pages deployment does NOT run server-side code"
echo "- API endpoints will only work if:"
echo "  1. Server is deployed (e.g., Heroku, Vercel, AWS)"
echo "  2. Clash of Clans API key is configured"
echo "  3. CORS is properly configured"
echo ""
echo "Press Enter to continue with tests..."
read

echo ""
echo "📍 Testing API Endpoints"
echo "================================"

# Test website availability first
echo -e "${BLUE}Testing: / (Main Page)${NC}"
echo "Description: FireCastle homepage"
echo -n "Status: "
http_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/" --max-time 10)
if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✅ OK${NC} (HTTP $http_code)"
else
    echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
    echo "Base URL is not accessible. Cannot proceed with API tests."
    exit 1
fi

# Test API endpoints
test_api "/api/clan" "Get clan information (name, level, members, win rate)"
test_api "/api/player" "Get player data (level, trophies, donations, attacks)"
test_api "/api/clanwar" "Get current clan war status"
test_api "/api/clan/stats" "Get extended clan statistics (top donors, etc.)"
test_api "/api/player/stats" "Get detailed player statistics"

# Additional checks
echo ""
echo "🔍 Additional Checks"
echo "================================"

echo ""
echo -n "Checking for Express server indicators... "
content=$(curl -s "$BASE_URL/" --max-time 5)
if echo "$content" | grep -qi "express\|node\|api"; then
    echo -e "${GREEN}✅ Found${NC}"
else
    echo -e "${YELLOW}⚠️  Not detected${NC}"
    echo "This might be a static deployment without API backend"
fi

echo -n "Checking CORS headers... "
headers=$(curl -s -I "$BASE_URL/api/clan" --max-time 5 2>/dev/null || echo "")
if echo "$headers" | grep -qi "access-control-allow-origin"; then
    echo -e "${GREEN}✅ CORS enabled${NC}"
else
    echo -e "${YELLOW}⚠️  CORS headers not found${NC}"
fi

echo -n "Checking for cache headers... "
if echo "$headers" | grep -qi "cache-control\|etag"; then
    echo -e "${GREEN}✅ Caching headers present${NC}"
else
    echo -e "${YELLOW}⚠️  No cache headers${NC}"
fi

# Summary
echo ""
echo "================================================"
echo "    Test Summary"
echo "================================================"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}✅ All API tests passed!${NC}"
    echo ""
    echo "✨ FireCastle API is working correctly"
    echo ""
    echo "Additional manual tests:"
    echo "1. Test caching (make same request twice)"
    echo "2. Check response times"
    echo "3. Verify data accuracy with Clash of Clans game"
    exit 0
else
    echo -e "${YELLOW}⚠️  $FAILED_TESTS endpoint(s) failed or unavailable${NC}"
    echo ""
    echo "This is expected if:"
    echo "- FireCastle is deployed as static site only"
    echo "- Node.js server is not running"
    echo "- API requires additional configuration"
    echo ""
    echo "To deploy FireCastle with working API:"
    echo "1. Deploy to a platform that supports Node.js (Heroku, Vercel, Railway)"
    echo "2. Set environment variable: COC_API_KEY=your_api_key"
    echo "3. Ensure server.js or app.js is the entry point"
    echo "4. Configure CORS for your domain"
    echo ""
    echo "Current deployment appears to be static-only."
    exit 1
fi
