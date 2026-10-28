---
status: approved
---

# Design brief: PlumePlot

## The one spatial moment

A mission-planning or payload-integration teammate stands at a desk and arranges a solar panel, rover, and science instrument around an illustrative lunar lander site. In a 60 cm tabletop scene, they immediately see how the lander type, plume direction, distance, and a protective ridge affect each asset's red, amber, or green placement risk, then review the site before a planned landing.

## Why it belongs on glasses

- Uses: draws in the world; leaves your body free.
- Why it's better than the phone or laptop version: The planning team can walk around, look down at, and directly reposition a real-scale tabletop site while keeping the terrain, lander, and asset labels spatially connected instead of managing a flat diagram.

## Product or overlay

- Type: product: the virtual thing is the experience.
- What the real version would sense: nothing.
- Stand-in for the preview: none needed; use a fixed, illustrative lunar terrain board with a lander, crater, protective ridge, solar panel, rover, and science instrument already present.

## Where things live

- Where the user is looking during the main task: down at a desk or clear table, 60–80 cm in front of them, from waist-to-chest height.
- Lunar terrain board: 60 cm wide, on the tabletop, positioned so the complete site is visible without turning the head.
- Lander, crater, and protective ridge: fixed on the terrain board as the spatial context for the plan.
- Solar panel, rover, and science instrument: movable directly across the terrain board; their positions are constrained to the board.
- Protective ridge: a meaningful spatial feature that creates safer placement zones behind it, rather than requiring every asset to be moved farther away.
- Risk labels: small labels anchored immediately above each asset and kept clear of the terrain.
- Controls: a small panel just above and behind the terrain's top edge, within reach and outside the view of the site.
- Site Review result: a larger panel 20 cm above the lander, shown only after review.

## Hands and input

- Choose lander profile: hand-ray target and pinch the `Cargo` or `Heavy` button.
- Move an asset: hand-ray target, pinch and drag the asset across the board, then release it. The selected asset highlights and cannot leave the board.
- Replay landing: hand-ray target and pinch `REPLAY LANDING`.
- Review site: hand-ray target and pinch `SITE REVIEW`.
- Close Site Review: hand-ray target and pinch the result panel's close button; moving an asset also dismisses it.
- Targets are big and highlight when aimed at.
- Voice (if any) and the button that does the same job: none.

## When things show

- Risk labels: visible at all times, small, anchored above their assets, and update immediately after an asset move or Cargo/Heavy switch.
- Replay cues: after `REPLAY LANDING`, dim the control panel; show descent and engine glow first, then the plume cone and dust particles during descent, then the updated risk labels. Hide the plume and particles when the six-second replay finishes.
- Site Review result: appears only after `SITE REVIEW`; remains long enough to read the status and count, then minimizes or closes when the user presses its close button or starts moving an asset.
- During replay: disable profile selection and asset movement, then re-enable both at the end.
- If something needs attention out of view: none; the entire 60 cm board is intended to remain in view during the main task.

## Illustrative plume-risk model

- Cargo lander main hazard radius: 20 cm.
- Heavy lander main hazard radius: 30 cm.
- An asset inside the selected lander's main hazard radius is `HIGH RISK`.
- Outside the main radius, an asset is `REVIEW` if it is within an additional 10 cm buffer or lies in the forward plume corridor.
- The plume corridor is a roughly 90-degree, forward-facing wedge from the lander that extends beyond the circular radius; it is an illustrative dust-travel direction.
- Ridge shielding applies only when the ridge is visibly between the lander and the asset. It reduces risk by one level: `REVIEW` → `CLEAR` and `HIGH RISK` → `REVIEW`. An asset extremely close to the lander remains `HIGH RISK` despite shielding (default: inside the main hazard radius).
- An asset is `CLEAR` when it is outside both the buffer zone and forward plume corridor; ridge shielding can also reduce a `REVIEW` asset to `CLEAR`.
- `SITE READY` requires all three assets to be `CLEAR`; any `HIGH RISK` or `REVIEW` asset produces `REPLAN REQUIRED`.

## Done criteria

Each one can be checked in Lens Studio's preview.

1. The preview shows a clearly placed tabletop lunar terrain, lander, ridge, crater, solar panel, rover, and science instrument.
2. The user can hand-ray target and pinch-drag each of the three assets across the terrain board; a selected asset highlights and cannot leave the board.
3. Each asset's label changes among `HIGH RISK`, `REVIEW`, and `CLEAR` immediately after an asset move or Cargo/Heavy profile change, according to the illustrative risk rules.
4. Pressing `REPLAY LANDING` runs a complete six-second sequence with lander descent, engine glow, plume cone, dust particles, and final risk labels; profile and asset changes are disabled until it ends.
5. Pressing `SITE REVIEW` shows `REPLAN REQUIRED` for an unsafe layout, then shows `SITE READY` after all three assets are moved to clear positions.

## Out of scope

- NASA-certified predictions, real lunar-surface physics, and operational landing approval.
- Live plume or surface sensing, real mission data, external data sources, AI, and voice control.
- Persistent layouts, multi-user planning, or sharing a plan between sessions.

## Risks and open questions

- These are simple visual planning rules inspired by lunar plume-surface research, not physical plume predictions or NASA-approved safety distances.
- Ridge shielding uses the stated visible “between lander and asset” rule; the exact visual/geometry test is a build detail.
- The assumption that “extremely close” means inside the main hazard radius is marked as a default interpretation and should be confirmed during implementation.
- Feel is unproven without SPECS: comfort over time, real hand tracking, and the effectiveness of the risk labels at a glance.

## Build notes for CLAD

- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it

This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources
