# Survivor 51 Fantasy League 🔥

Family league (Allison · Will · Mom · Dad). **Live:** https://wmcgauran.github.io/survivor-51/

Static page, no local state. Everything on it is computed from `data.js`.
Standings, alive counts, T-ties, the ownership board sort and greyed-out rows are
all derived, so they can't drift from the points log.

## Files
- `data.js`: draft, tribes, boot order and the points log. The only file that changes weekly.
- `index.html`: renders the page from `data.js`.
- `validate.mjs`: pre-publish gate (`node validate.mjs`). Nothing is pushed unless it prints PASS.
- `draft.html`, `cast.csv`, `cast.md`: draft-night board and cast reference.

## Weekly routine (after each episode)
1. Research the episode: recaps, news, Reddit and the wiki, that episode only. List every
   scoring event with a source and flag anything uncertain. Resolve flags with Will before editing.
2. Update `data.js`: add the episode to `episodes` (one `survival: true` +1 event covering everyone
   still in), add `boots`, set booted castaways' `current` to `null`, update `current` tribes and
   `tribes` at swaps/merge, and bump `updatedThrough`.
3. `node validate.mjs` → must PASS. It checks 21 castaways, 20 unique picks in snake order, 5 per
   manager, valid tribes, boots consistent with tribes, no points for people already out, and
   survival +1 given to exactly the survivors.
4. Commit and push `main`. GitHub Pages redeploys automatically.

## Standing rulings
- Boot-order points start at 0 for the first boot (+1 per week survived).
- Castaways on Exile Island still earn the weekly +1.
- An active idol in your pocket when you go home: the +5 for finding it is removed.
- "Beware" advantages count as a disadvantage (−5) if the holder is voted out before activation.
- Points Log shows only points actually assigned.
