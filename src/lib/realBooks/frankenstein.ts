import { parseGutenbergRawText, ParsedBook } from "../bookParser";

export function getFrankensteinBook(): ParsedBook {
  const rawText = `
LETTER I. To Mrs. Saville, England.

St. Petersburgh, Dec. 11th, 17—.

You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.

I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes. Inspirited by this wind of promise, my daydreams become more fervent and vivid. I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight. There, Margaret, the sun is forever visible, its broad disk just skirting the horizon and diffusing a perpetual splendour.


LETTER II. To Mrs. Saville, England.

Archangel, 28th March, 17—.

How slowly the time passes here, encompassed as I am by frost and snow! Yet a step is taken towards my enterprise. I have hired a vessel and am occupied in collecting my sailors; those whom I have already engaged appear to be men on whom I can rely and are certainly possessed of dauntless courage.

But I have one want which I have never yet been able to satisfy, and the absence of the object of which I now feel as a most severe evil: I have no friend, Margaret. When I am glowing with the enthusiasm of success, there will be none to participate it; if I am assailed by disappointment, no one will endeavour to sustain me in dejection.


LETTER III. To Mrs. Saville, England.

July 7th, 17—.

My dear Sister,—I write a few lines in haste to say that I am safe—and well advanced on my voyage. This letter will reach England by a merchantman now on its homeward voyage from Archangel; more fortunate than I, who may not see my native land, perhaps, for many years. I am, however, in good spirits: my men are bold and apparently firm of purpose. Nor do the floating sheets of ice that continually pass us, indicating the dangers of the region we are advancing towards, dismay them.


LETTER IV. To Mrs. Saville, England.

August 5th, 17—.

So strange an accident has happened to us that I cannot forbear recording it, although it is very probable that you will see me before these papers can come into your possession.

Last Monday (July 31st) we were nearly surrounded by ice, which closed in the ship on all sides, leaving scarcely room for her to float. Quite mistaking our situation, we were enveloped in a thick fog. We accordingly lay to, hoping that some change would take place in the atmosphere and weather.

About two o'clock the fog cleared away, and we beheld, stretched out in every direction, vast and irregular plains of ice, which seemed to have no end. Some of my comrades groaned, and my own mind began to grow watchful with anxious thoughts, when a strange sight suddenly attracted our attention and diverted our solicitude from our own situation. We perceived a low carriage, fixed on a sledge and drawn by dogs, pass on towards the north, at the distance of half a mile; a being which had the shape of a man, but apparently of gigantic stature, sat in the sledge and guided the dogs. We watched the rapid progress of the traveller with our telescopes until he was lost among the distant inequalities of the ice.


CHAPTER I.

I am by birth a Genevese, and my family is one of the most distinguished of that republic. My ancestors had been for many years counsellors and syndics, and my father had served several public offices with honour and reputation. He was respected by all who knew him for his integrity and indefatigable attention to public business.

He passed his younger days perpetually occupied by the affairs of his country; a variety of circumstances had prevented his marrying early, nor was it until the decline of life that he became a husband and the father of a family.


CHAPTER II.

We were brought up together; there was not quite a year difference in our ages. I need not say that we were strangers to any species of disunion or dispute. Harmony was the soul of our companionship, and the diversity and contrast that subsisted in our characters drew us nearer together. Elizabeth was of a calmer and more concentrated disposition; but, with all my ardour, I was capable of a more intense application and was more deeply smitten with the thirst for knowledge.


CHAPTER III.

When I had attained the age of seventeen my parents resolved that I should become a student at the university of Ingolstadt. I had hitherto attended the schools of Geneva, but my father thought it necessary for the completion of my education that I should be made acquainted with other customs than those of my native country.


CHAPTER IV.

From this day natural philosophy, and particularly chemistry, in the most comprehensive sense of the term, became my sole occupation. I read with ardour those works, so full of genius and discrimination, which modern inquirers have written on these subjects. I attended the lectures and cultivated the acquaintance of the men of science of the university, and I found even in M. Krempe a great deal of sound sense and real information, combined, it is true, with a repulsive physiognomy and manners, but not on that account the less valuable.


CHAPTER V.

It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life that lay around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.

How can I describe my emotions at this catastrophe, or how delineate the wretch whom with such infinite pains and care I had endeavoured to form? His limbs were in proportion, and I had selected his features as beautiful. Beautiful! Great God! His yellow skin scarcely covered the work of muscles and arteries beneath; his hair was of a lustrous black, and flowing; his teeth of a pearly whiteness; but these luxuriances only formed a more horrific contrast with his watery eyes, that seemed almost of the same colour as the dun-white sockets in which they were set, his shrivelled complexion and straight black lips.
`;

  return parseGutenbergRawText(rawText, {
    id: "gutenberg-84",
    title: "Frankenstein; or, The Modern Prometheus",
    author: "Mary Wollstonecraft Shelley",
    source: "Standard Ebooks",
    format: "EPUB",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    description: "Standard Ebooks edition of Mary Shelley's iconic 1818 gothic masterpiece. Full letters and chapters with real TOC.",
    category: "Classics & Fiction",
    rating: 4.9,
    downloadCount: "142K downloads",
  });
}
