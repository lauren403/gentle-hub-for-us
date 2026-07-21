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
  {
    slug: "the-hardest-part-isnt-focus-its-feeling",
    path: "/letters/the-hardest-part-isnt-focus-its-feeling",
    title: "The hardest part usually isn't focus. It's feeling.",
    standfirst:
      "If your feelings arrive fast and loud and take an age to come back down, and if a small rejection can flatten a whole day, you are not too much and you are not broken. You have a brain that feels at full volume, and there is a reason for it.",
    readingTime: "about 5 minutes",
    seoTitle:
      "The hardest part of ADHD usually isn't focus, it's feeling | Body Belonging Clinic",
    seoDescription:
      "For a lot of us the loudest part of ADHD is emotion, not attention. A warm, honest look at emotional intensity, rejection sensitivity, and why it is wiring rather than weakness.",
    body: [
      { text: `We are handed a story about ADHD that is almost entirely about attention, the lost keys, the missed deadlines, the half-finished projects. It is a real part of the picture, and it is nowhere near the hardest part for most of the people I sit with. The hardest part, the one that quietly runs the show, is emotion. Feelings that come in fast and land hard, a mood that can swing on something small, and a comedown that takes far longer than it seems to for everyone else. If that is you, I want to name it clearly, because almost no one does.` },
      { text: `The reason is in the wiring. One of the most respected models of ADHD, from the psychologist Russell Barkley, puts self-regulation right at the centre, and emotion is one of the things a brain like ours regulates differently. This is not a fringe idea or a personal failing dressed up in kinder language, it is close to the core of what ADHD actually is. So when a feeling arrives and it is enormous and immediate and hard to turn down, that is not you being dramatic or sensitive or weak. That is the same difference that affects attention, showing up in the place it is felt most.` },
      { text: `There is a particular version of this that so many people recognise the instant it is named, the way rejection, or even the hint of it, can land like a physical blow. In ADHD communities this often gets called rejection sensitivity, and I want to be honest with you about it in the way I would want honesty myself. It is a very real and very common lived experience, and it is not yet a settled, precisely measured piece of science with one agreed definition. I hold it as language rather than as law. What matters is not the label, it is that the experience is real, it is shared by a great many of us, and it makes complete sense in a brain that feels at full volume.` },
      { text: `Here is what I want you to take from that. If emotion is where your ADHD is loudest, then emotion, not another productivity system, is where the real work lives. Not learning to feel less, which was never possible and was never the goal, but learning to be with big feeling without being swept away by it, to recognise the wave as it rises, to let it move through, and to be far gentler with yourself in the middle of it than the world has taught you to be. That is a skill, it can be built, and it tends to change more than any planner ever did.` },
      { text: `And there is one more thing, quietly underneath all of it. Most of us have spent years being told we are too sensitive, too intense, too much, and we have folded that judgement inwards until self-criticism became the loudest voice in the room. You cannot regulate a feeling while you are also busy despising yourself for having it. So the first move is almost always the same, to turn the volume down on the shame, so there is finally room to work with the feeling itself. That is where we start, and it is a kinder place to begin than you might expect.` },
    ],
    closing:
      "If your feelings have always run loud and you would like company in learning to ride them rather than fight them, that is much of what we do here. You are warmly welcome to reach out.",
  },
  {
    slug: "medication-isnt-the-whole-answer",
    path: "/letters/medication-isnt-the-whole-answer",
    title: "Medication is often the right first step. It's rarely the whole answer.",
    standfirst:
      "This is an honest letter about ADHD medication from someone firmly in favour of it. It can help a great deal, and it was never designed to do the whole job, and holding both of those truths at once is where good care lives.",
    readingTime: "about 5 minutes",
    seoTitle:
      "Medication is often the right first step, and rarely the whole answer | Body Belonging Clinic",
    seoDescription:
      "A pro-treatment, honest look at ADHD medication, what it does well, what it cannot do, and the part of the work a prescription was never meant to cover.",
    body: [
      { text: `Let me say the first part plainly, because there is a lot of noise out there and you deserve a clear voice. For many people, ADHD medication helps, genuinely and sometimes dramatically. It is one of the better-evidenced treatments in mental health, and it can turn the volume down on the noise enough that everything else becomes possible. I am not here to talk you out of it or to offer you a natural alternative to it. If medication is helping you, that is wonderful, and if you are wondering whether to explore it, that is a conversation for you and a good prescriber, held without shame.` },
      { text: `And here is the second part, which matters just as much. Medication changes the conditions, and it does not, on its own, teach the skills. It can steady your attention, and it cannot teach you how you personally plan, or start, or recover from a hard day. It can lift some of the fog, and it cannot rebuild a relationship with food that a lifetime of missed meals and quiet shame has worn thin. It can make feelings a little more manageable, and it cannot undo the years of being told you were too much, or hand you back the self-belief that got chipped away. Those are not things a tablet was ever meant to do. They are the human work, and they are the part so many people are quietly left alone with once the prescription is written.` },
      { text: `This is the gap I built a whole practice inside. So often the story goes like this, you finally get diagnosed, you start medication, there is real relief, and then there is a silence, a sense of "is this it?", because the diagnosis and the script arrived together and then the conversation simply stopped. No one made the time to help you understand your own particular brain, or to build the coping that fits the way you actually work, or to gently sort out the eating and the sleep and the self-talk. The medication did its job and then everyone assumed the rest would follow on its own. It rarely does, and that is not your failing, it is a gap in the way care is usually shaped.` },
      { text: `So think of medication, if you use it, as one instrument rather than the whole orchestra. It is often the right first step, it clears space, and then the real, slower, more human work can begin in that space, understanding how your mind runs, building the scaffolds that suit it, steadying your body and your eating, and turning down the shame you never deserved. Medication and this work are not rivals, and they are not a choice between the natural and the medical. They are two parts of the same care, and you deserve both, not just the one that fits inside a prescription pad.` },
    ],
    closing:
      "If you have the medication sorted and you are still standing in that \"is this it?\" silence, that silence is exactly where we begin. You are welcome to reach out whenever you are ready.",
  },
  {
    slug: "your-nervous-system-and-a-place-to-belong",
    path: "/letters/your-nervous-system-and-a-place-to-belong",
    title: "Your nervous system, and a place to belong.",
    standfirst:
      "If discipline and pressure have never quite worked on you the way they seem to for other people, it is not a willpower problem. A brain like ours is wired to move towards interest and safety, and it settles through connection, not force. That is not a weakness to manage, it is the key to working with yourself.",
    readingTime: "about 5 minutes",
    seoTitle:
      "Your nervous system settles through safety, not pressure | Body Belonging Clinic",
    seoDescription:
      "ADHD runs on an interest-based nervous system that calms through safety, connection and self-compassion rather than force. A gentle letter on why belonging is not soft, it is the mechanism.",
    body: [
      { text: `You have probably been told, in a hundred quiet ways, that the answer is more discipline. Try harder, push through, want it more. And you have probably noticed that it does not really work on you, or it works for a brittle week and then collapses, and you are left with the familiar conclusion that you are the problem. I would like to offer you a different explanation, because the truth is far kinder and far more useful.` },
      { text: `A brain like ours runs, in large part, on interest. Attention and motivation follow curiosity, novelty, meaning and a genuine sense of urgency, rather than obligation and willpower, which is why the same person can lose a whole afternoon to something fascinating and cannot make themselves start something dull to save their life. This is often described as an interest-based nervous system, and while the exact phrase is community language rather than a precise clinical term, it points at something real and well recognised in how ADHD works. Once you understand it, you stop trying to force a brain that was never going to respond to force, and you start designing a life around interest, meaning and momentum instead. That is not a workaround. That is working with the actual machine.` },
      { text: `Underneath attention sits something even more basic, your nervous system's sense of safety. Nobody thinks clearly, plans well, or reaches for another person while their body believes it is under threat, and for a brain that has spent years being corrected and falling short and bracing for the next rejection, a low hum of threat can become the background setting. This is why pressure so often backfires. It adds threat to a system that already has too much, and a threatened nervous system narrows and protects rather than opens and grows. Safety is not the soft option here, it is the precondition for every good thing you are trying to do. Calm first, capability second, always in that order.` },
      { text: `And the thing that builds safety, more reliably than anything else, is connection. This is the part the world treats as a nice extra and I treat as the mechanism. We are wired to settle in the presence of people who understand us, and connection and belonging are among the most robust protectors of mental health we know of, right up there with anything in a textbook. Add to that a gentler relationship with yourself, the ordinary, well-evidenced practice of meeting your own struggles with a little kindness instead of contempt, and you have the two ingredients that actually let a nervous system unclench enough to change. Not pressure. Safety and belonging.` },
      { text: `This is the whole idea behind the name of this clinic. Belonging is not decoration here, and it is not a warm word we reach for because it sounds nice. It is the active ingredient. When you are met as a whole person, in the body you are actually in, among people who understand how your brain works, your nervous system finally gets the message it has been waiting for, that it is safe now, that it can stop bracing, and that it can begin. Everything else we do, the eating, the emotion, the focus, grows out of that one thing. You do not belong once you are fixed. You are met as you are, and that is what lets the change begin.` },
    ],
    closing:
      "If you have spent your life being pushed and it has never worked, you might be surprised what happens when you are met with safety instead. That is what this place is built for, and you are welcome here exactly as you are.",
  },
];

export function getLetter(slug: string): Letter | undefined {
  return LETTERS.find((l) => l.slug === slug);
}
