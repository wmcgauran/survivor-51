// Survivor 51 family league — the only file that changes week to week.
// Every total, rank, alive count and sort on the page is computed from this.
// Run `node validate.mjs` before every push.

window.LEAGUE = {
  season: "Survivor 51",
  updatedThrough: 1,

  managers: ["Allison", "Will", "Mom", "Dad"],

  // Snake draft, one copy per castaway. pick = overall pick number.
  draft: [
    { pick: 1,  manager: "Allison", castaway: 'Angelica "Jelly" Loblack' },
    { pick: 2,  manager: "Will",    castaway: "Carter Krull" },
    { pick: 3,  manager: "Mom",     castaway: "Devin Way" },
    { pick: 4,  manager: "Dad",     castaway: "Lewis Kelly" },
    { pick: 5,  manager: "Dad",     castaway: "Patt Cannaday" },
    { pick: 6,  manager: "Mom",     castaway: "Alexis Levine" },
    { pick: 7,  manager: "Will",    castaway: "Brady Booker" },
    { pick: 8,  manager: "Allison", castaway: "Jenna Doore" },
    { pick: 9,  manager: "Allison", castaway: "Maggie Nestor" },
    { pick: 10, manager: "Will",    castaway: "Mike Pinsky" },
    { pick: 11, manager: "Mom",     castaway: 'An "Thien An" Nguyen' },
    { pick: 12, manager: "Dad",     castaway: 'Danny "Kilby" Kilby' },
    { pick: 13, manager: "Dad",     castaway: "Sharonda Cox" },
    { pick: 14, manager: "Mom",     castaway: "Rob Antonson" },
    { pick: 15, manager: "Will",    castaway: "Cristian Chavez" },
    { pick: 16, manager: "Allison", castaway: "Ana Sani" },
    { pick: 17, manager: "Allison", castaway: "Eric Macksoud" },
    { pick: 18, manager: "Will",    castaway: "Kristin Flickinger" },
    { pick: 19, manager: "Mom",     castaway: "Ori Jean-Charles" },
    { pick: 20, manager: "Dad",     castaway: "Linnea Capobianco" },
  ],

  // Tribes that are valid right now or have ever existed. Update at swaps/merge.
  tribes: {
    Savu: { buff: "Purple buff", color: "#5b3fd6" },
    Toka: { buff: "Yellow buff", color: "#e0701b" },
  },

  // original = starting tribe. current = tribe name, "Exile Island", or null once out.
  castaways: [
    { name: "Aaliyah Puglia",           original: "Toka", current: null },
    { name: "Alexis Levine",            original: "Savu", current: "Savu" },
    { name: 'An "Thien An" Nguyen',     original: "Toka", current: "Toka" },
    { name: "Ana Sani",                 original: "Savu", current: "Savu" },
    { name: 'Angelica "Jelly" Loblack', original: "Toka", current: "Toka" },
    { name: "Brady Booker",             original: "Toka", current: "Toka" },
    { name: "Carter Krull",             original: "Savu", current: "Savu" },
    { name: "Cristian Chavez",          original: "Savu", current: "Savu" },
    { name: 'Danny "Kilby" Kilby',      original: "Toka", current: "Toka" },
    { name: "Devin Way",                original: "Toka", current: "Toka" },
    { name: "Eric Macksoud",            original: "Savu", current: "Savu" },
    { name: "Jenna Doore",              original: "Toka", current: "Toka" },
    { name: "Kristin Flickinger",       original: "Savu", current: "Savu" },
    { name: "Lewis Kelly",              original: "Toka", current: "Exile Island",
      note: "on Exile Island, not yet on Toka" },
    { name: "Linnea Capobianco",        original: "Savu", current: "Savu" },
    { name: "Maggie Nestor",            original: "Toka", current: "Toka" },
    { name: "Mike Pinsky",              original: "Toka", current: "Toka" },
    { name: "Ori Jean-Charles",         original: "Savu", current: "Savu" },
    { name: "Patt Cannaday",            original: "Toka", current: "Toka" },
    { name: "Rob Antonson",             original: "Savu", current: "Savu" },
    { name: "Sharonda Cox",             original: "Savu", current: "Savu" },
  ],

  // Boot order, in order. how: "voted out" | "medevac" | "quit" | ...
  boots: [
    { name: "Aaliyah Puglia", episode: 1, how: "voted out", tribe: "Toka" },
  ],

  // Points log: only points actually assigned. Each event gives `pts` to every name in `who`.
  // label = the left column; set members:true to list the names after the event text.
  episodes: [
    {
      n: 1, title: "premiere",
      events: [
        { label: "Rob Antonson", who: ["Rob Antonson"],
          event: "Found a hidden immunity idol", pts: 5 },
        { label: "Savu — all 10 members", members: true, pts: 2,
          event: "Won tribal immunity (+2 each)",
          who: ["Alexis Levine", "Ana Sani", "Carter Krull", "Cristian Chavez", "Eric Macksoud",
                "Kristin Flickinger", "Linnea Capobianco", "Ori Jean-Charles", "Rob Antonson",
                "Sharonda Cox"] },
        { label: "All 20 remaining castaways", survival: true, pts: 1,
          event: "Survived week 1, boot order (+1 each) — everyone except Aaliyah Puglia",
          who: ["Alexis Levine", 'An "Thien An" Nguyen', "Ana Sani", 'Angelica "Jelly" Loblack',
                "Brady Booker", "Carter Krull", "Cristian Chavez", 'Danny "Kilby" Kilby',
                "Devin Way", "Eric Macksoud", "Jenna Doore", "Kristin Flickinger", "Lewis Kelly",
                "Linnea Capobianco", "Maggie Nestor", "Mike Pinsky", "Ori Jean-Charles",
                "Patt Cannaday", "Rob Antonson", "Sharonda Cox"] },
      ],
    },
  ],
};
