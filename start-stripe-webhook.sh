#!/bin/bash

# 🚀 Quick Setup Script for Stripe Webhooks

echo "=================================================="
echo "🔥 Setting up Stripe Webhook Forwarding"
echo "=================================================="
echo ""

# Check if stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo "❌ Stripe CLI is not installed!"
    echo ""
    echo "📦 Installing Stripe CLI via Homebrew..."
    brew install stripe/stripe-cli/stripe
    echo ""
fi

echo "✅ Stripe CLI is installed"
echo ""

# Check if backend is running
if ! lsof -ti:1337 > /dev/null 2>&1; then
    echo "⚠️  WARNING: Backend doesn't appear to be running on port 1337"
    echo "   Please start your backend first with: cd backend && npm run develop"
    echo ""
    read -p "Press Enter when backend is running, or Ctrl+C to exit..."
fi

echo "✅ Backend is running on port 1337"
echo ""

echo "🔑 Starting Stripe webhook forwarding..."
echo "   This will forward Stripe webhooks to: http://localhost:1337/api/stripe/webhook"
echo ""
echo "   Keep this terminal open while testing!"
echo "   Press Ctrl+C to stop"
echo ""
echo "=================================================="
echo ""

# Start stripe listen
stripe listen --forward-to localhost:1337/api/stripe/webhook
