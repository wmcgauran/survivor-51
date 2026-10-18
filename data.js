// Survivor 51 family league — the only file that changes week to week.
// Every total, rank, alive count and sort on the page is computed from this.
// Run `node validate.mjs` before every push.

window.LEAGUE = {
  season: "Survivor 51",
  updatedThrough: 4,

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
    Dina: { buff: "Red buff",    color: "#c92a2a" },  // new at the episode 4 swap
  },

  // original = starting tribe. current = tribe name, "Exile Island", or null once out.
  castaways: [
    { name: "Aaliyah Puglia",           original: "Toka", current: null },
    { name: "Alexis Levine",            original: "Savu", current: "Savu" },
    { name: 'An "Thien An" Nguyen',     original: "Toka", current: "Toka" },
    { name: "Ana Sani",                 original: "Savu", current: null },
    { name: 'Angelica "Jelly" Loblack', original: "Toka", current: "Savu" },
    { name: "Brady Booker",             original: "Toka", current: "Toka" },
    { name: "Carter Krull",             original: "Savu", current: "Toka" },
    { name: "Cristian Chavez",          original: "Savu", current: "Dina" },
    { name: 'Danny "Kilby" Kilby',      original: "Toka", current: "Dina" },
    { name: "Devin Way",                original: "Toka", current: "Savu" },
    { name: "Eric Macksoud",            original: "Savu", current: "Dina" },
    { name: "Jenna Doore",              original: "Toka", current: null },
    { name: "Kristin Flickinger",       original: "Savu", current: "Toka" },
    { name: "Lewis Kelly",              original: "Toka", current: "Dina" },
    { name: "Linnea Capobianco",        original: "Savu", current: "Dina" },
    { name: "Maggie Nestor",            original: "Toka", current: "Toka" },
    { name: "Mike Pinsky",              original: "Toka", current: "Toka" },
    { name: "Ori Jean-Charles",         original: "Savu", current: "Savu" },
    { name: "Patt Cannaday",            original: "Toka", current: null },
    { name: "Rob Antonson",             original: "Savu", current: null },
    { name: "Sharonda Cox",             original: "Savu", current: "Dina" },
  ],

  // Boot order, in order. how: "voted out" | "medevac" | "quit" | ...
  boots: [
    { name: "Aaliyah Puglia", episode: 1, how: "voted out", tribe: "Toka" },
    { name: "Ana Sani",       episode: 2, how: "voted out", tribe: "Savu" },
    { name: "Rob Antonson",   episode: 3, how: "medevaced", tribe: "Savu" },
    { name: "Patt Cannaday",  episode: 3, how: "voted out", tribe: "Toka" },
    { name: "Jenna Doore",    episode: 4, how: "voted out", tribe: "Savu" },
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
    {
      n: 2,
      events: [
        { label: "Toka — all 10 members", members: true, pts: 2,
          event: "Won tribal reward (+2 each)",
          who: ['An "Thien An" Nguyen', 'Angelica "Jelly" Loblack', "Brady Booker", 'Danny "Kilby" Kilby',
                "Devin Way", "Jenna Doore", "Lewis Kelly", "Maggie Nestor", "Mike Pinsky",
                "Patt Cannaday"] },
        { label: "Toka — all 10 members", members: true, pts: 2,
          event: "Won tribal immunity (+2 each)",
          who: ['An "Thien An" Nguyen', 'Angelica "Jelly" Loblack', "Brady Booker", 'Danny "Kilby" Kilby',
                "Devin Way", "Jenna Doore", "Lewis Kelly", "Maggie Nestor", "Mike Pinsky",
                "Patt Cannaday"] },
        { label: 'Angelica "Jelly" Loblack', who: ['Angelica "Jelly" Loblack'],
          event: "Found a hidden immunity idol", pts: 5 },
        { label: "All 19 remaining castaways", survival: true, pts: 1,
          event: "Survived week 2, boot order (+1 each) — everyone except Ana Sani",
          who: ["Alexis Levine", 'An "Thien An" Nguyen', 'Angelica "Jelly" Loblack',
                "Brady Booker", "Carter Krull", "Cristian Chavez", 'Danny "Kilby" Kilby',
                "Devin Way", "Eric Macksoud", "Jenna Doore", "Kristin Flickinger", "Lewis Kelly",
                "Linnea Capobianco", "Maggie Nestor", "Mike Pinsky", "Ori Jean-Charles",
                "Patt Cannaday", "Rob Antonson", "Sharonda Cox"] },
      ],
    },
    {
      n: 3,
      events: [
        { label: "Savu — all 7 members", members: true, pts: 2,
          event: "Won combined tribal reward and immunity (+2 each, scored once)",
          who: ["Alexis Levine", "Cristian Chavez", "Eric Macksoud", "Kristin Flickinger",
                "Linnea Capobianco", "Ori Jean-Charles", "Sharonda Cox"] },
        { label: "Maggie Nestor", who: ["Maggie Nestor"],
          event: "Found an Extra Vote advantage (in a boat oar at Toka; Brady Booker conceded it to her)", pts: 5 },
        { label: "Devin Way", who: ["Devin Way"],
          event: "Found an Extra Vote advantage (at the Savu well during the camp visit, with Sharonda Cox; Devin kept it)", pts: 5 },
        { label: "All 17 remaining castaways", survival: true, pts: 1,
          event: "Survived week 3, boot order (+1 each) — everyone except Rob Antonson (medevaced) and Patt Cannaday",
          who: ["Alexis Levine", 'An "Thien An" Nguyen', 'Angelica "Jelly" Loblack',
                "Brady Booker", "Carter Krull", "Cristian Chavez", 'Danny "Kilby" Kilby',
                "Devin Way", "Eric Macksoud", "Jenna Doore", "Kristin Flickinger", "Lewis Kelly",
                "Linnea Capobianco", "Maggie Nestor", "Mike Pinsky", "Ori Jean-Charles",
                "Sharonda Cox"] },
      ],
    },
    {
      n: 4,
      events: [
        { label: "Dina — all 6 members", members: true, pts: 2,
          event: "Won combined tribal reward and immunity (+2 each, scored once), after the three-tribe swap",
          who: ["Cristian Chavez", 'Danny "Kilby" Kilby', "Eric Macksoud", "Lewis Kelly",
                "Linnea Capobianco", "Sharonda Cox"] },
        { label: "Toka — all 6 members", members: true, pts: 2,
          event: "Won combined tribal reward and immunity (+2 each, scored once), after the three-tribe swap",
          who: ['An "Thien An" Nguyen', "Brady Booker", "Carter Krull", "Kristin Flickinger",
                "Maggie Nestor", "Mike Pinsky"] },
        { label: "All 16 remaining castaways", survival: true, pts: 1,
          event: "Survived week 4, boot order (+1 each) — everyone except Jenna Doore",
          who: ["Alexis Levine", 'An "Thien An" Nguyen', 'Angelica "Jelly" Loblack',
                "Brady Booker", "Carter Krull", "Cristian Chavez", 'Danny "Kilby" Kilby',
                "Devin Way", "Eric Macksoud", "Kristin Flickinger", "Lewis Kelly",
                "Linnea Capobianco", "Maggie Nestor", "Mike Pinsky", "Ori Jean-Charles",
                "Sharonda Cox"] },
      ],
    },
  ],
};
