# Roastique mobile café app

A polished, mobile-first café experience for ordering, queue management, Coffee Passport discoveries, Roasties rewards, valet tracking, profile management and AI-guided menu recommendations.

Open **index.html** in a current browser, or serve the folder locally. The preview includes its own stylesheet, script, icons and generated photography.

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765 after running the command from this folder.

## Walkthrough

1. Open **Order**, choose Pickup or Dine in, and customize a coffee. Tap the bottom **View cart** bar to open the cart and place a demo order.
2. Open **Queue**, join, simulate queue updates and confirm arrival. Use **Leave queue** to release the demo spot.
3. Open **Passport** and select an origin on the map for tasting notes and barista details.
4. Play **Daily Coffee Trivia** from Home and see the points appear in **Roasties**. Try redeeming a sample reward.
5. Open **Valet** from Home, request the car, advance the tracker and choose or skip a sample tip.
6. Open **AI**, enter a mood and add one of the suggestions to your order.

The preview saves order bag, queue, wallet, trivia completion and valet state in the current browser. **Reset preview** in the footer restores the starting state. Local HTTP is preferred for consistent browser storage and optional microphone support.

Tap the avatar in the top bar to edit the display name, contact details, vehicle registration, make or model, colour, and order preference. The Valet screen uses the saved vehicle. Profile changes stay in the current browser.

## Homepage

The welcome screen cycles through 12 coffee-themed messages on successive launches in the same browser.

Swipe through six featured items, choose from five menu categories in one row, try mood-based picks, or open tasting notes from the Coffee Passport. If location permission is already granted, Home shows the approximate distance and drive time automatically. **Check distance** requests location on demand otherwise. The preview calculates straight-line distance locally and estimates drive time using a 25 km/h average. **Get directions** opens Google Maps to the Golf Course Road, DLF Phase 1 area. The exact café address and map pin are pending confirmation.

## Approval scope

The client wireframe guided screen structure and interactions. The attached brand palette supplied espresso brown `#473435`, powder blue `#afc2d3`, cream `#f0e5ca` and off-white `#fffdf8`. These four colors form the interface palette. Brushed steel appears in the café photography.

The preview uses sample data for café availability and wait times. Queue and valet updates are manual simulations. Checkout, rewards and tips are simulated. Reward prices and order-to-points conversion are sample values. The sommelier uses local menu rules and supports browser speech recognition where available. Production café systems, push notifications, payments, geofencing and an AI service require integration.

[Client wireframe](https://claude.ai/artifact/36Npj7BnANCZFoZki1j65U) · [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) · [Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
