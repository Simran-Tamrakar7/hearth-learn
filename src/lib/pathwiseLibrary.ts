/** Pathwise catalog — Gutenberg, Standard Ebooks, Open Library, authors' free editions. */

export type LibraryBook = {
  id: string
  title: string
  author: string
  shelf: string
  shelves?: string[]
  blurb: string
  url: string
  source: string
  year?: string
}

export type LibraryShelf = {
  id: string
  label: string
  blurb: string
}

export const shelves: LibraryShelf[] = [
  { id: 'all', label: 'All shelves', blurb: 'Everything in the library.' },
  { id: 'fiction', label: 'Fiction', blurb: 'Stories worth finishing.' },
  { id: 'nonfiction', label: 'Nonfiction', blurb: 'Essays, history, ideas.' },
  { id: 'romance', label: 'Romance', blurb: 'Public-domain love stories — free to read.' },
  { id: 'tech', label: 'Tech & learning', blurb: 'Free books and guides for craft.' },
  { id: 'resources', label: 'Resources', blurb: 'Catalogs, reference, how-to hubs.' },
  { id: 'classics', label: 'Classics', blurb: 'Canon you can open tonight.' },
  { id: 'science', label: 'Science', blurb: 'Nature, mind, and method.' },
]

export const libraryBooks: LibraryBook[] = [
  // —— Romance (public domain) ——
  {
    id: 'pride-prejudice',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    shelf: 'romance',
    shelves: ['romance', 'fiction', 'classics'],
    blurb: 'Elizabeth Bennet, Mr. Darcy, and the long art of revising first impressions.',
    url: 'https://www.gutenberg.org/ebooks/1342',
    source: 'Project Gutenberg',
    year: '1813',
  },
  {
    id: 'sense-sensibility',
    title: 'Sense and Sensibility',
    author: 'Jane Austen',
    shelf: 'romance',
    shelves: ['romance', 'fiction', 'classics'],
    blurb: 'Two sisters, two temperaments, one inheritance problem.',
    url: 'https://www.gutenberg.org/ebooks/161',
    source: 'Project Gutenberg',
    year: '1811',
  },
  {
    id: 'emma',
    title: 'Emma',
    author: 'Jane Austen',
    shelf: 'romance',
    shelves: ['romance', 'fiction', 'classics'],
    blurb: 'Matchmaking gone stylishly wrong — then right.',
    url: 'https://www.gutenberg.org/ebooks/158',
    source: 'Project Gutenberg',
    year: '1815',
  },
  {
    id: 'persuasion',
    title: 'Persuasion',
    author: 'Jane Austen',
    shelf: 'romance',
    shelves: ['romance', 'fiction', 'classics'],
    blurb: 'Second chances, navy captains, and quieter longing.',
    url: 'https://www.gutenberg.org/ebooks/105',
    source: 'Project Gutenberg',
    year: '1817',
  },
  {
    id: 'jane-eyre',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    shelf: 'romance',
    shelves: ['romance', 'fiction', 'classics'],
    blurb: 'Governess, mystery, moral steel — gothic romance done right.',
    url: 'https://www.gutenberg.org/ebooks/1260',
    source: 'Project Gutenberg',
    year: '1847',
  },
  {
    id: 'wuthering-heights',
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    shelf: 'romance',
    shelves: ['romance', 'fiction', 'classics'],
    blurb: 'Moors, obsession, and a love story that refuses to be tidy.',
    url: 'https://www.gutenberg.org/ebooks/768',
    source: 'Project Gutenberg',
    year: '1847',
  },
  {
    id: 'northanger-abbey',
    title: 'Northanger Abbey',
    author: 'Jane Austen',
    shelf: 'romance',
    shelves: ['romance', 'fiction', 'classics'],
    blurb: 'Gothic novels, Bath balls, and a heroine who reads too much.',
    url: 'https://www.gutenberg.org/ebooks/121',
    source: 'Project Gutenberg',
    year: '1817',
  },
  {
    id: 'scarlet-pimpernel',
    title: 'The Scarlet Pimpernel',
    author: 'Baroness Orczy',
    shelf: 'romance',
    shelves: ['romance', 'fiction'],
    blurb: 'Revolutionary intrigue with a dash of daring romance.',
    url: 'https://www.gutenberg.org/ebooks/60',
    source: 'Project Gutenberg',
    year: '1905',
  },

  // —— Fiction / classics ——
  {
    id: 'frankenstein',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    shelf: 'fiction',
    shelves: ['fiction', 'classics', 'science'],
    blurb: 'Creation, responsibility, and the original lab-gone-wrong story.',
    url: 'https://www.gutenberg.org/ebooks/84',
    source: 'Project Gutenberg',
    year: '1818',
  },
  {
    id: 'dracula',
    title: 'Dracula',
    author: 'Bram Stoker',
    shelf: 'fiction',
    shelves: ['fiction', 'classics'],
    blurb: 'Letters, journals, and a Count who never sleeps.',
    url: 'https://www.gutenberg.org/ebooks/345',
    source: 'Project Gutenberg',
    year: '1897',
  },
  {
    id: 'alice',
    title: "Alice's Adventures in Wonderland",
    author: 'Lewis Carroll',
    shelf: 'fiction',
    shelves: ['fiction', 'classics'],
    blurb: 'Down the rabbit hole — logic puzzles dressed as nonsense.',
    url: 'https://www.gutenberg.org/ebooks/11',
    source: 'Project Gutenberg',
    year: '1865',
  },
  {
    id: 'sherlock',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    shelf: 'fiction',
    shelves: ['fiction', 'classics'],
    blurb: 'Twelve cases. One consulting detective. Still sharp.',
    url: 'https://www.gutenberg.org/ebooks/1661',
    source: 'Project Gutenberg',
    year: '1892',
  },
  {
    id: 'dorian-gray',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    shelf: 'fiction',
    shelves: ['fiction', 'classics'],
    blurb: 'Beauty, vanity, and a portrait that keeps the receipts.',
    url: 'https://www.gutenberg.org/ebooks/174',
    source: 'Project Gutenberg',
    year: '1890',
  },
  {
    id: 'metamorphosis',
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
    shelf: 'fiction',
    shelves: ['fiction', 'classics'],
    blurb: 'Wake up as a bug. Keep going to work. Kafka.',
    url: 'https://www.gutenberg.org/ebooks/5200',
    source: 'Project Gutenberg',
    year: '1915',
  },
  {
    id: 'tale-two-cities',
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    shelf: 'classics',
    shelves: ['classics', 'fiction'],
    blurb: 'Best of times, worst of times — revolution and sacrifice.',
    url: 'https://www.gutenberg.org/ebooks/98',
    source: 'Project Gutenberg',
    year: '1859',
  },
  {
    id: 'great-expectations',
    title: 'Great Expectations',
    author: 'Charles Dickens',
    shelf: 'classics',
    shelves: ['classics', 'fiction'],
    blurb: 'Pip, estates, and the long cost of wanting more.',
    url: 'https://www.gutenberg.org/ebooks/1400',
    source: 'Project Gutenberg',
    year: '1861',
  },
  {
    id: 'anne-green-gables',
    title: 'Anne of Green Gables',
    author: 'L. M. Montgomery',
    shelf: 'fiction',
    shelves: ['fiction', 'romance'],
    blurb: 'Orphan with opinions, Prince Edward Island, and found family.',
    url: 'https://www.gutenberg.org/ebooks/45',
    source: 'Project Gutenberg',
    year: '1908',
  },
  {
    id: 'wizard-oz',
    title: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    shelf: 'fiction',
    shelves: ['fiction', 'classics'],
    blurb: 'Yellow brick road, friends found along the way.',
    url: 'https://www.gutenberg.org/ebooks/55',
    source: 'Project Gutenberg',
    year: '1900',
  },

  // —— Nonfiction / science ——
  {
    id: 'walden',
    title: 'Walden',
    author: 'Henry David Thoreau',
    shelf: 'nonfiction',
    shelves: ['nonfiction', 'classics'],
    blurb: 'A cabin, a pond, and deliberate living.',
    url: 'https://www.gutenberg.org/ebooks/205',
    source: 'Project Gutenberg',
    year: '1854',
  },
  {
    id: 'prophet',
    title: 'The Prophet',
    author: 'Kahlil Gibran',
    shelf: 'nonfiction',
    shelves: ['nonfiction', 'classics'],
    blurb: 'Short poetic essays on work, love, and leaving.',
    url: 'https://www.gutenberg.org/ebooks/58585',
    source: 'Project Gutenberg',
    year: '1923',
  },
  {
    id: 'origin-species',
    title: 'On the Origin of Species',
    author: 'Charles Darwin',
    shelf: 'science',
    shelves: ['science', 'nonfiction', 'classics'],
    blurb: 'Natural selection explained for a curious century.',
    url: 'https://www.gutenberg.org/ebooks/1228',
    source: 'Project Gutenberg',
    year: '1859',
  },
  {
    id: 'relativity',
    title: 'Relativity: The Special and General Theory',
    author: 'Albert Einstein',
    shelf: 'science',
    shelves: ['science', 'nonfiction'],
    blurb: 'Einstein writing for non-specialists — still a workout.',
    url: 'https://www.gutenberg.org/ebooks/5001',
    source: 'Project Gutenberg',
    year: '1916',
  },
  {
    id: 'prince',
    title: 'The Prince',
    author: 'Niccolò Machiavelli',
    shelf: 'nonfiction',
    shelves: ['nonfiction', 'classics'],
    blurb: 'Power, perception, and political realism — read critically.',
    url: 'https://www.gutenberg.org/ebooks/1232',
    source: 'Project Gutenberg',
    year: '1532',
  },
  {
    id: 'siddhartha',
    title: 'Siddhartha',
    author: 'Hermann Hesse',
    shelf: 'fiction',
    shelves: ['fiction', 'classics', 'nonfiction'],
    blurb: 'A seeker’s path beside a river — short and lasting.',
    url: 'https://www.gutenberg.org/ebooks/2500',
    source: 'Project Gutenberg',
    year: '1922',
  },

  // —— Tech & learning (author/publisher free editions) ——
  {
    id: 'automate-boring',
    title: 'Automate the Boring Stuff with Python',
    author: 'Al Sweigart',
    shelf: 'tech',
    shelves: ['tech', 'resources'],
    blurb: 'Practical Python for real chores — free online edition.',
    url: 'https://automatetheboringstuff.com/',
    source: 'Author free edition',
    year: '2019',
  },
  {
    id: 'eloquent-js',
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    shelf: 'tech',
    shelves: ['tech', 'resources'],
    blurb: 'Modern JS from values to the browser — free book.',
    url: 'https://eloquentjavascript.net/',
    source: 'Author free edition',
    year: '2024',
  },
  {
    id: 'pro-git',
    title: 'Pro Git',
    author: 'Scott Chacon & Ben Straub',
    shelf: 'tech',
    shelves: ['tech', 'resources'],
    blurb: 'The Git book — branching, remotes, internals.',
    url: 'https://git-scm.com/book/en/v2',
    source: 'git-scm.com',
    year: '2014',
  },
  {
    id: 'think-python',
    title: 'Think Python',
    author: 'Allen B. Downey',
    shelf: 'tech',
    shelves: ['tech', 'resources'],
    blurb: 'Python as a way to think — free from Green Tea Press.',
    url: 'https://greenteapress.com/wp/think-python-2e/',
    source: 'Green Tea Press',
    year: '2015',
  },
  {
    id: 'linux-cli',
    title: 'The Linux Command Line',
    author: 'William Shotts',
    shelf: 'tech',
    shelves: ['tech', 'resources'],
    blurb: 'Shell fluency without the gatekeeping.',
    url: 'https://linuxcommand.org/tlcl.php',
    source: 'Author free edition',
    year: '2019',
  },
  {
    id: 'ydkjs',
    title: "You Don't Know JS Yet",
    author: 'Kyle Simpson',
    shelf: 'tech',
    shelves: ['tech'],
    blurb: 'Deep JS mental models — free on GitHub.',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    source: 'GitHub',
    year: '2022',
  },
  {
    id: 'playwright-docs',
    title: 'Playwright Documentation',
    author: 'Microsoft',
    shelf: 'tech',
    shelves: ['tech', 'resources'],
    blurb: 'Official Playwright docs — pair with Pathwise manuals.',
    url: 'https://playwright.dev/docs/intro',
    source: 'playwright.dev',
  },
  {
    id: 'python-tutorial',
    title: 'The Python Tutorial',
    author: 'Python Software Foundation',
    shelf: 'tech',
    shelves: ['tech', 'resources'],
    blurb: 'Official tour of the language — always current.',
    url: 'https://docs.python.org/3/tutorial/',
    source: 'docs.python.org',
  },

  // —— Resources / hubs ——
  {
    id: 'gutenberg-catalog',
    title: 'Project Gutenberg Catalog',
    author: 'Project Gutenberg',
    shelf: 'resources',
    shelves: ['resources'],
    blurb: '70,000+ free public-domain ebooks. Start here to wander.',
    url: 'https://www.gutenberg.org/',
    source: 'Project Gutenberg',
  },
  {
    id: 'standard-ebooks',
    title: 'Standard Ebooks',
    author: 'Standard Ebooks',
    shelf: 'resources',
    shelves: ['resources', 'classics'],
    blurb: 'Carefully typeset public-domain classics — beautiful free EPUBs.',
    url: 'https://standardebooks.org/ebooks',
    source: 'Standard Ebooks',
  },
  {
    id: 'open-library',
    title: 'Open Library',
    author: 'Internet Archive',
    shelf: 'resources',
    shelves: ['resources'],
    blurb: 'Borrow scans and find editions — Internet Archive’s library.',
    url: 'https://openlibrary.org/',
    source: 'Open Library',
  },
  {
    id: 'internet-archive-texts',
    title: 'Internet Archive Texts',
    author: 'Internet Archive',
    shelf: 'resources',
    shelves: ['resources'],
    blurb: 'Millions of digitized books and periodicals.',
    url: 'https://archive.org/details/texts',
    source: 'Internet Archive',
  },
  {
    id: 'librivox',
    title: 'LibriVox',
    author: 'LibriVox volunteers',
    shelf: 'resources',
    shelves: ['resources'],
    blurb: 'Free public-domain audiobooks read by volunteers.',
    url: 'https://librivox.org/',
    source: 'LibriVox',
  },
  {
    id: 'mdn',
    title: 'MDN Web Docs',
    author: 'Mozilla',
    shelf: 'resources',
    shelves: ['resources', 'tech'],
    blurb: 'HTML, CSS, JS reference — the working developer’s shelf.',
    url: 'https://developer.mozilla.org/en-US/docs/Web',
    source: 'MDN',
  },
]

export function bookShelves(book: LibraryBook) {
  return book.shelves || [book.shelf]
}

export function booksOnShelf(shelfId: string) {
  if (!shelfId || shelfId === 'all') return libraryBooks
  return libraryBooks.filter((b) => bookShelves(b).includes(shelfId))
}

export function searchBooks(query: string, shelfId = 'all') {
  const q = query.trim().toLowerCase()
  return booksOnShelf(shelfId).filter((b) => {
    if (!q) return true
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.blurb.toLowerCase().includes(q) ||
      b.source.toLowerCase().includes(q)
    )
  })
}

export function gutenbergCoverUrl(book: LibraryBook) {
  const m = book.url.match(/gutenberg\.org\/ebooks\/(\d+)/)
  return m ? `https://www.gutenberg.org/cache/epub/${m[1]}/pg${m[1]}.cover.medium.jpg` : null
}
