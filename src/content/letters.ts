export type Letter = {
  slug: string;
  path: string;
  title: string;
  standfirst: string;
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  body: Array<{ text: string; links?: Array<{ match: string; to: string }> }>;
  closing: string;
};

export const LETTERS: Letter[] = [
  {
    slug: "why-a-brain-like-ours-forgets-to-eat",
    path: "/letters/why-a-brain-like-ours-forgets-to-eat",
    title: "Why a brain like ours forgets to eat",
    standfirst:
      "If your eating seems to swing from nothing all day to everything by night, you are not lazy or greedy or failing at something simple. There is a real reason, and it is kinder than the story you have probably been told.",
    readingTime: "about 5 minutes",
    seoTitle: "Why a brain like ours forgets to eat | Body Belonging Clinic",
    seoDescription:
      "ADHD can quietly turn down the body's hunger signals until eating swings from forgotten all day to all at once by night. A gentle, eating-disorder-safe look at why, and what actually helps.",
    body: [
      { text: `Here is a scene you might know. It is eight at night, you have barely eaten since morning, and suddenly you are standing in the light of the open fridge, ravenous, a little ashamed, and quietly wondering what is wrong with you. I want to gently take the shame out of that picture, because what is happening is not a character flaw, it is the body doing exactly what a brain like ours sets it up to do.` },
      { text: `The word for the sense we are talking about is interoception, which is just the fancy name for how clearly you read the signals coming from inside your body, hunger and fullness among them, along with thirst, tiredness, a full bladder, and the first flickers of an emotion. For a lot of us those signals come in faint, or late, or all at once, so the quiet mid-morning "I could eat" never quite registers, and then by evening the volume is turned all the way up and the day's missed meals arrive together. It is not that you have no willpower. It is that the messenger was whispering all day and only started shouting after dark.` },
      { text: `This is worth saying plainly, and also honestly. The link between ADHD and less reliable interoception is still an emerging area of research rather than a closed case, so I would never dress it up as proven fact. What we can say is that it fits a growing body of work and, more importantly, it fits what so many people describe to me in the room, week after week. And there are two things layered on top that are on much firmer ground. Emotional dysregulation sits close to the centre of ADHD, so food can become a way to reach for calm or a hit of interest when a day feels flat or overwhelming. And if you take stimulant medication, appetite suppression during the day is well established, which quietly pushes hunger to the edges of the evening. Put those together and the fridge at eight at night starts to look less like a mystery and much more like a pattern with reasons.` },
      { text: `So what actually helps, gently. The single kindest thing is to stop asking a faulty hunger signal to run the whole show. Instead of waiting to feel hungry, which may not arrive until it is urgent, you can lean on a light, regular rhythm, something to eat every few hours whether or not the signal has turned up yet. This is not a diet and it is not about control, it is the opposite. It is giving your body a steadiness it cannot always ask for on its own. Clinicians call the underlying idea regular eating, and it is one of the most established, gentle tools we have. I built the Anchor app around exactly this, a quiet nudge rather than a rule, with no numbers and nothing to earn.`, links: [{ match: "the Anchor app", to: "/anchor" }] },
      { text: `If any of this is tangled up with a history of disordered eating, please be extra tender with yourself and do not do it alone, because a brain like ours deserves support that is eating-disorder-safe from the very first step. But if you take one thing from this letter, let it be this. You were never failing at something everyone else finds easy. You were reading a quieter signal, and quieter signals just ask for a little more structure and a lot less shame.` },
    ],
    closing:
      "If this is a live struggle for you, you are welcome to reach out, and if you would like something to lean on in the meantime, Anchor is being built for exactly this.",
  },
  {
    slug: "different-not-broken",
    path: "/letters/different-not-broken",
    title: "Different, not broken",
    standfirst:
      "You have probably been handed a long list of the things your brain gets wrong. This is a letter about the frame that list was written in, and why changing the frame changes almost everything.",
    readingTime: "about 5 minutes",
    seoTitle:
      "Different, not broken: what neurodivergent-affirming care really means | Body Belonging Clinic",
    seoDescription:
      '"Different, not broken" is more than a nice phrase. Here is what a genuinely neurodivergent-affirming approach to ADHD looks like, honestly held, challenges and all.',
    body: [
      { text: `So many people arrive to me having quietly concluded that they are a square peg in a world made for a rounder one, and that lately life has felt harder for them than it seems to be for everyone around them. If that is you, I want to start where I always start. You are not broken. You never were. You have a different kind of brain living in a world that was mostly built for a different kind of brain, and a surprising amount of what has gone wrong lives in the gap between the two, not inside you.` },
      { text: `The idea behind that sentence has a name, neurodiversity, a term coined in the late nineteen nineties to make a simple point, that brains vary the way bodies and personalities vary, and that this variation is a normal part of being human rather than a collection of faults to be corrected. Alongside it sits the social model of disability, which notices that a lot of what disables a person is the mismatch between how they are built and how the world around them is arranged, the fluorescent lights, the open-plan noise, the nine-to-five shape, the expectation that everyone reads their own hunger and tiredness the same way. Change the environment and much of the difficulty eases, which tells you the difficulty was never simply "you."` },
      { text: `Now, here is where I want to be honest rather than just encouraging, because a frame that only celebrates and never acknowledges the hard parts does not actually help anyone. Affirming your brain as different does not mean pretending the challenges are not real. The lost keys and the missed meals and the flattening exhaustion and the way rejection can land like a physical blow, those are real, and they can genuinely wear a person down. Holding both at once is the whole art of it. Your brain is not a problem to be fixed, and you also deserve real support with the parts of life it makes harder. Those two things are not in tension, they are the same act of respect.` },
      { text: `What does that respect look like in practice. It looks like care that works with your brain rather than against it, using interest and novelty and the way your attention actually moves, instead of demanding you white-knuckle your way into someone else's operating system. It looks like designing your world to fit you, reducing decisions, softening the environment, building in the scaffolds that a different brain runs better with, rather than treating the need for those scaffolds as a personal weakness. And underneath all of it, it looks like the slow, patient dismantling of shame, because most of us have spent years being quietly corrected, and you cannot build new skills on a foundation of self-criticism.` },
      { text: `That is the difference a frame makes. In the old one, every difficulty was more evidence that something was wrong with you, and the work was endless self-improvement that never quite arrived. In this one, your difficulties are the ordinary friction of a different brain meeting a world not built for it, and the work becomes something far kinder, understanding how your particular mind runs, and then arranging your life, gently, so it can run well. You are not a rough draft of a more acceptable person. You are already a whole one.` },
    ],
    closing:
      "If you would like to see how this frame shapes the actual care here, our approach page walks through it, and you are always welcome to reach out.",
  },
  {
    slug: "eating-by-the-clock-not-by-hunger",
    path: "/letters/eating-by-the-clock-not-by-hunger",
    title: "Eating by the clock, not by hunger",
    standfirst:
      "This is a gentle, practical letter about steadying your eating when your body is not always reliable about telling you when to. There are no numbers in it, and there is nothing to earn.",
    readingTime: "about 5 minutes",
    seoTitle:
      "Eating by the clock, not by hunger: a gentle rhythm for ADHD | Body Belonging Clinic",
    seoDescription:
      "When hunger signals are unreliable, waiting to feel hungry can backfire. A gentle, eating-disorder-safe way to steady your eating with rhythm instead of rules.",
    body: [
      { text: `If you read the first letter in this little collection, you will know where this one is going. When a brain like ours reads hunger and fullness less clearly, waiting until you feel hungry to eat can quietly backfire, because the signal often does not arrive until it is loud and late, and by then the day has slipped past and everything lands at once. So this letter is about a small, kind shift, from eating by hunger to eating by the clock, and about doing it in a way that is safe for a body that has been through a hard relationship with food.` },
      { text: `The idea comes from well-established eating disorder practice, where it is usually called regular eating, and the shape of it is almost boringly simple. Rather than relying on appetite to tell you when, you offer your body something to eat at regular intervals across the day, roughly every three to four hours, whether or not the hunger has turned up. That is genuinely the whole method. It sounds too plain to matter, and yet it is one of the most steadying things a person with unreliable cues can do, because it takes the pressure off a signal that was never going to be dependable and hands the job to a rhythm instead.` },
      { text: `I want to be careful and clear about what this is and is not, because language matters here. This is additive, not restrictive. It is about making sure eating happens, not about limiting it, and there are no calories, no weighing, no good foods and bad foods, and no rules to break. It is weight-neutral from start to finish. If eating has ever been a place of control or fear for you, please read that paragraph twice, because a regular rhythm should feel like being held to a gentle timetable, not marched to a strict one, and if it starts to feel like the latter, that is a sign to slow down and get some support rather than to push on.` },
      { text: `A few soft ways in, if you would like them. You might start with just one anchor point in the day, a breakfast of some kind within an hour or two of waking, since the morning is where so many of us skip and then pay for it later. You might set a couple of quiet phone reminders, not as an alarm barking orders, but as a friend tapping you on the shoulder, and let "something small" always count, because a handful of something is infinitely better than the nothing that leads to the eight o'clock fridge. And you might notice, without any judgement, that the evenings feel different on the days you ate steadily, which is usually where people first feel this working.` },
      { text: `None of this asks you to feel hungry on cue or to become a different sort of person. It just gives your body a bit of structure where the signal is missing, so that eating becomes one less thing you have to feel your way through alone. That is the spirit of the Anchor app too, a quiet nudge back towards rhythm, nothing more. And if food is a tender place for you, you do not have to steady it by yourself. That is exactly the kind of thing we can do together, gently, from the very first step.`, links: [{ match: "the Anchor app", to: "/anchor" }] },
    ],
    closing:
      "If you would like support with any of this, you are warmly welcome to reach out, and Anchor is being built to sit quietly in your pocket while you find your rhythm.",
  },
];

export function getLetter(slug: string): Letter | undefined {
  return LETTERS.find((l) => l.slug === slug);
}
