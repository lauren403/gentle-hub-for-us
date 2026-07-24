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
      "ADHD can quietly turn down the body's hunger signals until eating swings from forgotten all day to all at once by night. A gentle, weight-neutral look at why, and what actually helps.",
    body: [
      {
        text: `Here is a scene you might know. It is eight at night, you have barely eaten since morning, and suddenly you are standing in the light of the open fridge, ravenous, a little ashamed, and quietly wondering what is wrong with you. I want to gently take the shame out of that picture, because what is happening is not a character flaw, it is the body doing exactly what a brain like ours sets it up to do.`,
      },
      {
        text: `The word for the sense we are talking about is interoception, which is just the fancy name for how clearly you read the signals coming from inside your body, hunger and fullness among them, along with thirst, tiredness, a full bladder, and the first flickers of an emotion. For a lot of us those signals come in faint, or late, or all at once, so the quiet mid-morning "I could eat" never quite registers, and then by evening the volume is turned all the way up and the day's missed meals arrive together. It is not that you have no willpower. It is that the messenger was whispering all day and only started shouting after dark.`,
      },
      {
        text: `This is worth saying plainly, and also honestly. The link between ADHD and less reliable interoception is still an emerging area of research rather than a closed case, so I would never dress it up as proven fact. What we can say is that it fits a growing body of work and, more importantly, it fits what so many people describe to me in the room, week after week. And there are two things layered on top that are on much firmer ground. Emotional dysregulation sits close to the centre of ADHD, so food can become a way to reach for calm or a hit of interest when a day feels flat or overwhelming. And if you take stimulant medication, appetite suppression during the day is well established, which quietly pushes hunger to the edges of the evening. Put those together and the fridge at eight at night starts to look less like a mystery and much more like a pattern with reasons.`,
      },
      {
        text: `So what actually helps, gently. The single kindest thing is to stop asking a faulty hunger signal to run the whole show. Instead of waiting to feel hungry, which may not arrive until it is urgent, you can lean on a light, regular rhythm, something to eat every few hours whether or not the signal has turned up yet. This is not a diet and it is not about control, it is the opposite. It is giving your body a steadiness it cannot always ask for on its own. Clinicians call the underlying idea regular eating, and it is one of the most established, gentle tools we have. I built the Anchor app around exactly this, a quiet nudge rather than a rule, with no numbers and nothing to earn.`,
        links: [{ match: "the Anchor app", to: "/anchor" }],
      },
      {
        text: `If any of this is tangled up with a history of disordered eating, please be extra tender with yourself and do not do it alone, because a brain like ours deserves support that is safe around food from the very first step. But if you take one thing from this letter, let it be this. You were never failing at something everyone else finds easy. You were reading a quieter signal, and quieter signals just ask for a little more structure and a lot less shame.`,
      },
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
      {
        text: `So many people arrive to me having quietly concluded that they are a square peg in a world made for a rounder one, and that lately life has felt harder for them than it seems to be for everyone around them. If that is you, I want to start where I always start. You are not broken. You never were. You have a different kind of brain living in a world that was mostly built for a different kind of brain, and a surprising amount of what has gone wrong lives in the gap between the two, not inside you.`,
      },
      {
        text: `The idea behind that sentence has a name, neurodiversity, a term coined in the late nineteen nineties to make a simple point, that brains vary the way bodies and personalities vary, and that this variation is a normal part of being human rather than a collection of faults to be corrected. Alongside it sits the social model of disability, which notices that a lot of what disables a person is the mismatch between how they are built and how the world around them is arranged, the fluorescent lights, the open-plan noise, the nine-to-five shape, the expectation that everyone reads their own hunger and tiredness the same way. Change the environment and much of the difficulty eases, which tells you the difficulty was never simply "you."`,
      },
      {
        text: `Now, here is where I want to be honest rather than just encouraging, because a frame that only celebrates and never acknowledges the hard parts does not actually help anyone. Affirming your brain as different does not mean pretending the challenges are not real. The lost keys and the missed meals and the flattening exhaustion and the way rejection can land like a physical blow, those are real, and they can genuinely wear a person down. Holding both at once is the whole art of it. Your brain is not a problem to be fixed, and you also deserve real support with the parts of life it makes harder. Those two things are not in tension, they are the same act of respect.`,
      },
      {
        text: `What does that respect look like in practice. It looks like care that works with your brain rather than against it, using interest and novelty and the way your attention actually moves, instead of demanding you white-knuckle your way into someone else's operating system. It looks like designing your world to fit you, reducing decisions, softening the environment, building in the scaffolds that a different brain runs better with, rather than treating the need for those scaffolds as a personal weakness. And underneath all of it, it looks like the slow, patient dismantling of shame, because most of us have spent years being quietly corrected, and you cannot build new skills on a foundation of self-criticism.`,
      },
      {
        text: `That is the difference a frame makes. In the old one, every difficulty was more evidence that something was wrong with you, and the work was endless self-improvement that never quite arrived. In this one, your difficulties are the ordinary friction of a different brain meeting a world not built for it, and the work becomes something far kinder, understanding how your particular mind runs, and then arranging your life, gently, so it can run well. You are not a rough draft of a more acceptable person. You are already a whole one.`,
      },
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
      "When hunger signals are unreliable, waiting to feel hungry can backfire. A gentle, weight-neutral way to steady your eating with rhythm instead of rules.",
    body: [
      {
        text: `If you read the first letter in this little collection, you will know where this one is going. When a brain like ours reads hunger and fullness less clearly, waiting until you feel hungry to eat can quietly backfire, because the signal often does not arrive until it is loud and late, and by then the day has slipped past and everything lands at once. So this letter is about a small, kind shift, from eating by hunger to eating by the clock, and about doing it in a way that is safe for a body that has been through a hard relationship with food.`,
      },
      {
        text: `The idea comes from well-established eating disorder practice, where it is usually called regular eating, and the shape of it is almost boringly simple. Rather than relying on appetite to tell you when, you offer your body something to eat at regular intervals across the day, roughly every three to four hours, whether or not the hunger has turned up. That is genuinely the whole method. It sounds too plain to matter, and yet it is one of the most steadying things a person with unreliable cues can do, because it takes the pressure off a signal that was never going to be dependable and hands the job to a rhythm instead.`,
      },
      {
        text: `I want to be careful and clear about what this is and is not, because language matters here. This is additive, not restrictive. It is about making sure eating happens, not about limiting it, and there are no calories, no weighing, no good foods and bad foods, and no rules to break. It is weight-neutral from start to finish. If eating has ever been a place of control or fear for you, please read that paragraph twice, because a regular rhythm should feel like being held to a gentle timetable, not marched to a strict one, and if it starts to feel like the latter, that is a sign to slow down and get some support rather than to push on.`,
      },
      {
        text: `A few soft ways in, if you would like them. You might start with just one anchor point in the day, a breakfast of some kind within an hour or two of waking, since the morning is where so many of us skip and then pay for it later. You might set a couple of quiet phone reminders, not as an alarm barking orders, but as a friend tapping you on the shoulder, and let "something small" always count, because a handful of something is infinitely better than the nothing that leads to the eight o'clock fridge. And you might notice, without any judgement, that the evenings feel different on the days you ate steadily, which is usually where people first feel this working.`,
      },
      {
        text: `None of this asks you to feel hungry on cue or to become a different sort of person. It just gives your body a bit of structure where the signal is missing, so that eating becomes one less thing you have to feel your way through alone. That is the spirit of the Anchor app too, a quiet nudge back towards rhythm, nothing more. And if food is a tender place for you, you do not have to steady it by yourself. That is exactly the kind of thing we can do together, gently, from the very first step.`,
        links: [{ match: "the Anchor app", to: "/anchor" }],
      },
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
    seoTitle: "The hardest part of ADHD usually isn't focus, it's feeling | Body Belonging Clinic",
    seoDescription:
      "For a lot of us the loudest part of ADHD is emotion, not attention. A warm, honest look at emotional intensity, rejection sensitivity, and why it is wiring rather than weakness.",
    body: [
      {
        text: `We are handed a story about ADHD that is almost entirely about attention, the lost keys, the missed deadlines, the half-finished projects. It is a real part of the picture, and it is nowhere near the hardest part for most of the people I sit with. The hardest part, the one that quietly runs the show, is emotion. Feelings that come in fast and land hard, a mood that can swing on something small, and a comedown that takes far longer than it seems to for everyone else. If that is you, I want to name it clearly, because almost no one does.`,
      },
      {
        text: `The reason is in the wiring. One of the most respected models of ADHD, from the psychologist Russell Barkley, puts self-regulation right at the centre, and emotion is one of the things a brain like ours regulates differently. This is not a fringe idea or a personal failing dressed up in kinder language, it is close to the core of what ADHD actually is. So when a feeling arrives and it is enormous and immediate and hard to turn down, that is not you being dramatic or sensitive or weak. That is the same difference that affects attention, showing up in the place it is felt most.`,
      },
      {
        text: `There is a particular version of this that so many people recognise the instant it is named, the way rejection, or even the hint of it, can land like a physical blow. In ADHD communities this often gets called rejection sensitivity, and I want to be honest with you about it in the way I would want honesty myself. It is a very real and very common lived experience, and it is not yet a settled, precisely measured piece of science with one agreed definition. I hold it as language rather than as law. What matters is not the label, it is that the experience is real, it is shared by a great many of us, and it makes complete sense in a brain that feels at full volume.`,
      },
      {
        text: `Here is what I want you to take from that. If emotion is where your ADHD is loudest, then emotion, not another productivity system, is where the real work lives. Not learning to feel less, which was never possible and was never the goal, but learning to be with big feeling without being swept away by it, to recognise the wave as it rises, to let it move through, and to be far gentler with yourself in the middle of it than the world has taught you to be. That is a skill, it can be built, and it tends to change more than any planner ever did.`,
      },
      {
        text: `And there is one more thing, quietly underneath all of it. Most of us have spent years being told we are too sensitive, too intense, too much, and we have folded that judgement inwards until self-criticism became the loudest voice in the room. You cannot regulate a feeling while you are also busy despising yourself for having it. So the first move is almost always the same, to turn the volume down on the shame, so there is finally room to work with the feeling itself. That is where we start, and it is a kinder place to begin than you might expect.`,
      },
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
      {
        text: `Let me say the first part plainly, because there is a lot of noise out there and you deserve a clear voice. For many people, ADHD medication helps, genuinely and sometimes dramatically. It is one of the better-evidenced treatments in mental health, and it can turn the volume down on the noise enough that everything else becomes possible. I am not here to talk you out of it or to offer you a natural alternative to it. If medication is helping you, that is wonderful, and if you are wondering whether to explore it, that is a conversation for you and a good prescriber, held without shame.`,
      },
      {
        text: `And here is the second part, which matters just as much. Medication changes the conditions, and it does not, on its own, teach the skills. It can steady your attention, and it cannot teach you how you personally plan, or start, or recover from a hard day. It can lift some of the fog, and it cannot rebuild a relationship with food that a lifetime of missed meals and quiet shame has worn thin. It can make feelings a little more manageable, and it cannot undo the years of being told you were too much, or hand you back the self-belief that got chipped away. Those are not things a tablet was ever meant to do. They are the human work, and they are the part so many people are quietly left alone with once the prescription is written.`,
      },
      {
        text: `This is the gap I built a whole practice inside. So often the story goes like this, you finally get diagnosed, you start medication, there is real relief, and then there is a silence, a sense of "is this it?", because the diagnosis and the script arrived together and then the conversation simply stopped. No one made the time to help you understand your own particular brain, or to build the coping that fits the way you actually work, or to gently sort out the eating and the sleep and the self-talk. The medication did its job and then everyone assumed the rest would follow on its own. It rarely does, and that is not your failing, it is a gap in the way care is usually shaped.`,
      },
      {
        text: `So think of medication, if you use it, as one instrument rather than the whole orchestra. It is often the right first step, it clears space, and then the real, slower, more human work can begin in that space, understanding how your mind runs, building the scaffolds that suit it, steadying your body and your eating, and turning down the shame you never deserved. Medication and this work are not rivals, and they are not a choice between the natural and the medical. They are two parts of the same care, and you deserve both, not just the one that fits inside a prescription pad.`,
      },
    ],
    closing:
      'If you have the medication sorted and you are still standing in that "is this it?" silence, that silence is exactly where we begin. You are welcome to reach out whenever you are ready.',
  },
  {
    slug: "your-nervous-system-and-a-place-to-belong",
    path: "/letters/your-nervous-system-and-a-place-to-belong",
    title: "Your nervous system, and a place to belong.",
    standfirst:
      "If discipline and pressure have never quite worked on you the way they seem to for other people, it is not a willpower problem. A brain like ours is wired to move towards interest and safety, and it settles through connection, not force. That is not a weakness to manage, it is the key to working with yourself.",
    readingTime: "about 5 minutes",
    seoTitle: "Your nervous system settles through safety, not pressure | Body Belonging Clinic",
    seoDescription:
      "ADHD runs on an interest-based nervous system that calms through safety, connection and self-compassion rather than force. A gentle letter on why belonging is not soft, it is the mechanism.",
    body: [
      {
        text: `You have probably been told, in a hundred quiet ways, that the answer is more discipline. Try harder, push through, want it more. And you have probably noticed that it does not really work on you, or it works for a brittle week and then collapses, and you are left with the familiar conclusion that you are the problem. I would like to offer you a different explanation, because the truth is far kinder and far more useful.`,
      },
      {
        text: `A brain like ours runs, in large part, on interest. Attention and motivation follow curiosity, novelty, meaning and a genuine sense of urgency, rather than obligation and willpower, which is why the same person can lose a whole afternoon to something fascinating and cannot make themselves start something dull to save their life. This is often described as an interest-based nervous system, and while the exact phrase is community language rather than a precise clinical term, it points at something real and well recognised in how ADHD works. Once you understand it, you stop trying to force a brain that was never going to respond to force, and you start designing a life around interest, meaning and momentum instead. That is not a workaround. That is working with the actual machine.`,
      },
      {
        text: `Underneath attention sits something even more basic, your nervous system's sense of safety. Nobody thinks clearly, plans well, or reaches for another person while their body believes it is under threat, and for a brain that has spent years being corrected and falling short and bracing for the next rejection, a low hum of threat can become the background setting. This is why pressure so often backfires. It adds threat to a system that already has too much, and a threatened nervous system narrows and protects rather than opens and grows. Safety is not the soft option here, it is the precondition for every good thing you are trying to do. Calm first, capability second, always in that order.`,
      },
      {
        text: `And the thing that builds safety, more reliably than anything else, is connection. This is the part the world treats as a nice extra and I treat as the mechanism. We are wired to settle in the presence of people who understand us, and connection and belonging are among the most robust protectors of mental health we know of, right up there with anything in a textbook. Add to that a gentler relationship with yourself, the ordinary, well-evidenced practice of meeting your own struggles with a little kindness instead of contempt, and you have the two ingredients that actually let a nervous system unclench enough to change. Not pressure. Safety and belonging.`,
      },
      {
        text: `This is the whole idea behind the name of this clinic. Belonging is not decoration here, and it is not a warm word we reach for because it sounds nice. It is the active ingredient. When you are met as a whole person, in the body you are actually in, among people who understand how your brain works, your nervous system finally gets the message it has been waiting for, that it is safe now, that it can stop bracing, and that it can begin. Everything else we do, the eating, the emotion, the focus, grows out of that one thing. You do not belong once you are fixed. You are met as you are, and that is what lets the change begin.`,
      },
    ],
    closing:
      "If you have spent your life being pushed and it has never worked, you might be surprised what happens when you are met with safety instead. That is what this place is built for, and you are welcome here exactly as you are.",
  },
  {
    slug: "diagnosed-with-adhd-as-an-adult",
    path: "/letters/diagnosed-with-adhd-as-an-adult",
    title: "Diagnosed as an adult, the relief and the grief",
    standfirst:
      "If you were only recently told you have ADHD, and you have felt both a wave of relief and an ache of grief, both belong. Nothing about you arrived late. The name did.",
    readingTime: "about 5 minutes",
    seoTitle: "Diagnosed with ADHD as an adult: the relief and the grief | Body Belonging Clinic",
    seoDescription:
      "Being diagnosed with ADHD later in life can bring relief and grief at once. A warm, validating look at why it was missed, and how to meet your own history with compassion.",
    body: [
      {
        text: `There is a particular moment I see often, when someone finally hears the word ADHD applied to them in their thirties or forties or later, and their whole history seems to rearrange itself in front of them. All the years of trying harder and still falling behind, the school reports that said "so much potential," the jobs that started bright and quietly unravelled, the sense of running a race everyone else seemed to find easier, suddenly have a different explanation. It was never that you did not care enough or try enough. It was a brain that works differently, unnamed and unsupported for a very long time.`,
      },
      {
        text: `The relief of that is real, and so is the grief, and I want to make room for both, because people are often caught off guard by the second one. Alongside "so that is why," there is frequently a quieter, heavier "what if someone had seen this sooner." Grief for the younger you who concluded they were lazy or broken. Grief for the energy poured into masking, for the roads not taken, for the help that never came. That grief is not ingratitude for the diagnosis, it is love for the person who went so long without it, and it deserves tenderness rather than being hurried past.`,
      },
      {
        text: `It also helps to understand why it was missed, because the reason is rarely about you. ADHD has been under-recognised for decades in anyone who did not match the picture of a restless little boy, and that includes a great many women and girls, whose ADHD more often looked like daydreaming, anxiety, perfectionism and quiet coping than like disruption. If you learned early to mask, to work twice as hard to look half as effortless, you may have hidden the very struggle that would have got you seen. The system was looking for one shape and missed the rest of us. That is a failure of recognition, and it was never a failure of yours.`,
      },
      {
        text: `So what does a late diagnosis actually give you, beyond a name. At its best it gives you a new and far kinder story about your own life, one where the difficulties were friction between your brain and a world not built for it, rather than evidence of some private flaw. It lets you stop white-knuckling your way through someone else's operating system and begin working with your own. And it opens the door to support that finally fits, whether that includes medication, which is a conversation for you and a good prescriber, or the slower, human work of understanding how your mind runs and building a life around it.`,
      },
      {
        text: `If you are somewhere in the early, tender part of this, newly named and unsure how to feel, I would offer just one thing. You do not have to make sense of it all at once, and you do not have to be grateful and grieving in the right proportions. You are allowed to hold a diagnosis that is both a relief and a loss, and to take your time turning years of self-blame into something gentler. The label is new. You were always here, doing your best with a brain that nobody had explained to you yet.`,
      },
    ],
    closing:
      "If you have been recently diagnosed and would like a place to make sense of it, gently and at your own pace, that is exactly the kind of work we do here. You are warmly welcome to reach out.",
  },
  {
    slug: "the-late-brain-at-midnight",
    path: "/letters/the-late-brain-at-midnight",
    title: "The late brain at midnight",
    standfirst:
      "If your best thinking, and your worst spiralling, arrive the moment the house finally goes quiet, you are not undisciplined. A brain like ours often runs on a later clock, and there are kinder ways to work with it than force.",
    readingTime: "about 5 minutes",
    seoTitle: "The late brain at midnight: ADHD, sleep and the racing mind | Body Belonging Clinic",
    seoDescription:
      "If your mind switches on the moment your head hits the pillow, it is not a discipline problem. A gentle look at ADHD, the late body clock, and what actually helps.",
    body: [
      {
        text: `Here is a night you might know. All day you were foggy and flat, and then somewhere around eleven the world goes still and your mind switches on, bright and busy and full of plans, and you are suddenly more awake than you have been in hours. You know you will pay for it tomorrow, and still the hours slip by, and it feels like a failure of willpower. I want to gently offer a different reading, because a good deal of this is not about willpower at all, it is about timing.`,
      },
      {
        text: `Research on adults with ADHD keeps finding the same thing, that our body clocks tend to run late. The natural evening rise in melatonin, the hormone that tells the body it is time to wind down, often comes later for us, which is why sleep arrives late and mornings feel like being dragged out of the wrong time zone. Clinicians who study this, like Sandra Kooij and her colleagues, describe a strong overlap between ADHD and a delayed sleep phase, a body clock simply set later than the world expects. So when you cannot fall asleep at a "sensible" hour, it is often because your body genuinely does not believe it is time yet.`,
      },
      {
        text: `Layered on top of the late clock is the racing mind, and that part is lived experience as much as biology, the way a quiet, undemanding bedroom is finally free of the day's interruptions, so every idea and worry you were too busy to feel all day arrives at once. It is not a coincidence that the mind gets loud exactly when the room gets quiet. For a brain that runs on interest and stimulation, the still moment before sleep can be the first time all day there is nothing to hold the attention, so it turns inward and spins.`,
      },
      {
        text: `None of this means you are doomed to bad sleep, and it also does not mean the answer is to try harder to switch off, which rarely works. Gentler things tend to help more. A steady wake-up time, held even on weekends, does more to anchor a drifting body clock than a strict bedtime ever will. Real daylight soon after you wake helps nudge the clock earlier over time. A wind-down that gives the busy mind somewhere to put itself, writing tomorrow's worries and plans down so your brain can stop rehearsing them, can take the edge off the spinning. And if sleep is a serious, ongoing struggle, it is worth a proper conversation with a doctor, because there are real approaches, including carefully timed light and sometimes melatonin used under guidance, that work with a late clock rather than against it.`,
      },
      {
        text: `Mostly, though, I want to take the moral weight off it. You are not lazy for being wired at midnight, and you are not weak for finding mornings brutal. Your clock runs late, your mind gets loud in the quiet, and both of those make complete sense in a brain like ours. Working with that, kindly and a little at a time, tends to go so much further than fighting it.`,
      },
    ],
    closing:
      "If your sleep and your racing mind are wearing you down, you do not have to sort it alone, and it is very much part of the whole-person work we do here. You are welcome to reach out whenever you are ready.",
  },
  {
    slug: "working-with-your-brain",
    path: "/letters/working-with-your-brain",
    title: "Working with your brain, not against it",
    standfirst:
      "If every productivity system has eventually failed you, the problem was never you. Most of them were designed for a brain that runs on discipline. Here are a few designed for ours.",
    readingTime: "about 5 minutes",
    seoTitle:
      "Working with your brain, not against it: ADHD strategies that actually fit | Body Belonging Clinic",
    seoDescription:
      "Most ADHD advice is really advice for a different brain. A gentle set of strategies that work with an interest-based nervous system, not against it, and without the shame.",
    body: [
      {
        text: `Most advice about getting organised is, quietly, advice for a different kind of brain, one that responds to willpower, routine and the promise of a tidy future. A brain like ours runs on something else, on interest, novelty, urgency and meaning, and when you force it onto a system built for discipline, it works for a brilliant week and then falls apart, and you are left, once again, feeling like the failure. You are not. The system was wrong for your wiring. So here are a handful that tend to fit better, offered gently, to try rather than to obey.`,
      },
      {
        text: `The first is to get things out of your head. One of the most useful ideas in the whole field, from the psychologist Russell Barkley, is that a brain like ours struggles to hold and juggle information internally, so the trick is to move it outside, into the world, where you can see it. A visible list, a whiteboard by the door, an alarm that is really a message from your past self, a single note stuck where you cannot miss it. Not because you are incapable, but because your working memory is genuinely stretched, and a brain that cannot easily hold the next step in mind does far better when the next step is sitting there in plain sight.`,
      },
      {
        text: `The second is to make the dull thing interesting, or urgent, or shared, on purpose. Since attention follows interest more than importance, you can borrow interest from somewhere else. Music, a timer that turns a boring task into a race against the clock, or doing the thing alongside another person, what many people call body doubling, where simply having someone there, in the room or on a video call, makes the impossible task suddenly possible. This is not a crutch or a trick, it is using how your nervous system actually works, letting connection and novelty carry you where willpower would not.`,
      },
      {
        text: `The third is to shrink the decisions. A great deal of what looks like avoidance is really a brain overwhelmed by too many open choices, so anything that reduces the deciding helps. Lay tomorrow's clothes out tonight. Keep the same easy breakfast so the morning holds one less decision. Break a task down not into "reasonable" steps but into embarrassingly small ones, the first of which is almost too easy to refuse. And where you can, tie a new habit onto something you already do, so it rides an existing groove rather than needing willpower of its own.`,
      },
      {
        text: `Underneath all of these is the thing that matters most, and it is not a strategy at all. It is the tone you take with yourself when a system slips, as every system sometimes will. You cannot shame a brain like ours into working well, and years of trying have only taught most of us to expect our own contempt. So the quiet, radical move is to treat each fresh start as ordinary rather than as fresh proof of failure. The strategies genuinely help, but they help most when they rest on a foundation of self-kindness rather than self-punishment. That is the part that makes them last.`,
      },
    ],
    closing:
      "If you would like help building a way of working that actually fits your brain, without the shame that usually comes attached, that is a good deal of what we do here together. You are warmly welcome to reach out.",
  },
  {
    slug: "food-as-brain-fuel-safely",
    path: "/letters/food-as-brain-fuel-safely",
    title: "Food as brain fuel, held safely",
    standfirst:
      "There is a real and growing conversation about food and the ADHD brain, and it holds both genuine science and genuine risk. This is an honest map of both, held safely.",
    readingTime: "about 6 minutes",
    seoTitle:
      "Food as brain fuel, held safely: ADHD and nutrition, honestly | Body Belonging Clinic",
    seoDescription:
      'The "food as brain fuel" conversation around ADHD holds real science and real risk. An honest, weight-neutral look at what helps, what is overblown, and how to stay safe.',
    body: [
      {
        text: `You have probably seen the headlines, that this supplement or that diet will transform an ADHD brain. Somewhere underneath the noise there is a real and interesting science, and there is also a real danger, and I want to walk the line between them honestly, because you deserve neither hype nor dismissal. Food does matter for how a brain feels and functions. It is also a place where a lot of well-meaning advice tips quietly into restriction and harm, especially for anyone whose relationship with eating has ever been fragile. Both of those things are true at once.`,
      },
      {
        text: `Let me give the science its due first, and credit where it belongs. Dr Rachel Gow, a neuroscientist in the United Kingdom and the founder of Nutritious Minds, has done a great deal to bring the link between nutrition and the ADHD brain into the open, and the core of it is sound. The brain is a hungry organ, built in part from the fats we eat, which is why the omega-3 fatty acids, and one called EPA in particular, have been studied the most. The honest summary of that research is modest rather than miraculous. Some trials and reviews suggest a small benefit from omega-3 for some people, while the most cautious reviews find the evidence weak, so the fair conclusion is that it may gently help a little, alongside usual care, and never as a replacement for it. The same measured tone fits the rest, that steady blood sugar and regular meals tend to help a brain concentrate and stay even, and that a diet built mostly from whole foods is good for all of us. Useful, real, and worth knowing. Not a cure.`,
      },
      {
        text: `Now the part that matters most to me, and that a lot of the online conversation gets dangerously wrong. The moment "food as brain fuel" hardens into a set of rules, foods to fear, whole groups to cut out, a jar of supplements standing in for care, it stops being nourishment and becomes restriction, and restriction is not safe for a brain like ours. A brain that already reads hunger and fullness less clearly, and that already carries more risk around disordered eating, does not need another reason to treat food as a test to pass or fail. I have watched the wellness version of this quietly hurt people, and I will not repeat it here. There is no food you must earn, no ingredient that is a moral failing, and no supplement that replaces sleep, connection, support or, where it is needed, medication.`,
      },
      {
        text: `So how do you take the genuinely useful part without the harm. Gently, and additively. Additive means the aim is always to include and to steady, never to restrict, so the kindest first step is not cutting anything out but making sure eating happens at regular times, which is where so much of the ADHD and food story actually lives. If you would like to explore whether something like omega-3 fits for you, treat it as a small conversation with your GP, framed as a possible gentle complement to your care rather than a fix. And if you want to look at food more closely than that, please do it with an eating-disorder-informed Accredited Practising Dietitian, someone trained to hold the nutrition and the safety at the same time, rather than with an influencer or an elimination plan. That single choice is the difference between help and harm.`,
      },
      {
        text: `This is exactly the ground Body Belonging Clinic was built to stand on, the place where food and the ADHD brain can be talked about honestly and warmly, without the diet-culture, the fear and the fine print that make so much of this conversation unsafe. Food as brain fuel is a lovely idea, and it is true enough to be worth taking seriously. It is also only ever safe when it is held with kindness, kept additive, and shared with the right people around you.`,
      },
    ],
    closing:
      "If food and your ADHD brain feel tangled together, and you want support that keeps you genuinely safe around food, that is the heart of what we do here. You are warmly welcome to reach out, and we can bring in the right dietitian alongside.",
  },
  {
    slug: "audhd-autistic-and-adhd",
    path: "/letters/audhd-autistic-and-adhd",
    title: "AuDHD, when you are autistic and ADHD at once",
    standfirst:
      "If one part of you craves the new and another part needs everything to stay the same, and no single label has ever held all of you, there may be a reason. You might be both.",
    readingTime: "about 6 minutes",
    seoTitle: "AuDHD: when you're autistic and ADHD at the same time | Body Belonging Clinic",
    seoDescription:
      "Autism and ADHD often live in the same person, pulling in opposite directions. A warm, affirming look at the AuDHD tug-of-war, and why one label alone never quite fit.",
    body: [
      {
        text: `For a long time the rulebook said you could not be both autistic and ADHD, that it had to be one or the other, and a great many people fell straight through that gap, recognising themselves in each description and belonging cleanly to neither. That rule changed in 2013, when the main diagnostic manual finally allowed the two to be named together, and a word has since grown up around the experience, AuDHD, for the very common reality of carrying both at once. If you have always felt like two different sets of needs sharing one body, this may be the first frame that genuinely fits.`,
      },
      {
        text: `The reason AuDHD can be so confusing, both to live and to be understood, is that the two often pull in genuinely opposite directions. The ADHD in you tends to run towards novelty, stimulation and spontaneity, the new and the interesting, while the autistic part of you tends to long for routine, predictability and the deep comfort of the familiar. So you can be the person who impulsively books the trip and the person undone when the plan changes, the one who craves intensity and the one who needs the world quiet and known. That is not you being inconsistent or difficult. It is two real neurotypes sharing one nervous system, each asking for something the other resists.`,
      },
      {
        text: `It often shows up in the body too, and this part is close to my heart. Autistic and ADHD brains both tend to read the body's internal signals differently, so hunger, fullness, thirst and the first edges of an emotion can arrive faint, or late, or all at once, which is part of why eating and self-regulation can be such tender ground for AuDHD people. Add sensory sensitivity, to textures, smells, the feel of particular foods, and something as ordinary as a meal can carry a complexity nobody else can see. None of that is fussiness or weak willpower. It is a differently wired system doing its honest best, and it deserves support that is gentle and safe around food, never corrective.`,
      },
      {
        text: `There is also the particular exhaustion of masking two things at once, of managing the ADHD parts the world finds too much and the autistic parts it finds too odd, often without realising that is what you are doing, until you are simply depleted and cannot understand why everything costs you so much more than it seems to cost anyone else. Naming the AuDHD picture does not add another problem to the pile. It usually does the opposite. It explains the cost, and it lets you stop demanding that you be only one kind of person running on only one set of rules.`,
      },
      {
        text: `And there is real beauty in this wiring once it is understood rather than fought: the pattern-deep focus of the autistic mind meeting the wide, associative, idea-jumping energy of the ADHD one, a pairing that can be extraordinarily creative and perceptive when it is supported instead of squeezed into a shape that was never yours. Whichever way your two neurotypes lean on a given day, you are not too complicated to be understood. You are simply more than one thing at once, which is a deeply human way to be.`,
      },
    ],
    closing:
      "If the AuDHD picture is the first one that has ever fit, you do not have to make sense of it on your own. Reach out whenever you feel ready, and we will hold all of it together.",
  },
  {
    slug: "neurodivergent-and-queer",
    path: "/letters/neurodivergent-and-queer",
    title: "Neurodivergent and queer, more than one kind of different",
    standfirst:
      "If you are both neurodivergent and LGBTQIA+, you already know it is not two separate stories running side by side. It is one life, lived at an intersection most services were never built to see.",
    readingTime: "about 5 minutes",
    seoTitle: "Neurodivergent and queer: care that holds both | Body Belonging Clinic",
    seoDescription:
      "Neurodivergent people are more likely to be LGBTQIA+, and living at that intersection is its own experience. An affirming look at being more than one kind of different.",
    body: [
      {
        text: `Let me start with something the research now shows clearly, because it is so often treated as a coincidence and it is not one. Neurodivergent people, autistic and ADHD people, are considerably more likely to be lesbian, gay, bisexual, trans, or otherwise gender diverse than the general population. The largest studies, including a major 2020 study led by Varun Warrier and colleagues, found a strong and consistent overlap between being autistic and being gender diverse. So if you are living at that meeting point, you are not an unusual anomaly. You are part of a large, real pattern that the science is only now catching up to.`,
      },
      {
        text: `There are gentle theories about why, and I hold them lightly. One is that a mind less bound by the unspoken social rulebook may also be less bound by its rules about gender and desire, freer to notice and name what is actually true rather than what is expected of it. Whatever the reason, the lived reality is the part that matters, that many of us experience our neurodivergence and our queerness not as two separate boxes but as one interwoven way of being different, of seeing and moving through the world along our own lines. Some people call it being neuroqueer, and for a lot of us that word lands like a small homecoming.`,
      },
      {
        text: `Living at that intersection also carries a particular weight, and it is only honest to name it. It is the strain of being unseen on two axes at once, of managing a nervous system the world finds too much and an identity the world still argues about, often masking both at the same time. Researchers call the wear of that constant vigilance minority stress, and carrying it twice over is genuinely tiring, which is part of why mental health struggles, and eating and body-image struggles in particular, run higher among people who are both neurodivergent and queer. That is not a flaw in you. It is what happens to anyone asked to keep proving they are allowed to exist as they are.`,
      },
      {
        text: `This is why care that affirms only one part of you is never quite enough. A service that understands your ADHD but flinches at your queerness, or celebrates your identity but treats your neurodivergence as a problem to be fixed, leaves you doing the very thing that exhausted you in the first place, splitting yourself into the acceptable parts. Real affirming care holds both at once, as ordinary and good, so you can bring the whole of yourself into the room and finally put the managing down.`,
      },
      {
        text: `That is the entire point of a clinic called Belonging, and it is not decoration. You do not have to choose which kind of different to be here, and you do not have to translate one part of yourself for the comfort of the person who is meant to be helping you. You are allowed to be neurodivergent and queer and whole, all at the same time, met by someone who sees that intersection not as a complication but as simply, unremarkably, you.`,
      },
    ],
    closing:
      "If you have been searching for care that holds all of who you are at once, without asking you to leave a part of yourself at the door, you have found it. Come as you are, whenever you are ready.",
  },
];

export function getLetter(slug: string): Letter | undefined {
  return LETTERS.find((l) => l.slug === slug);
}
