const randomData = [
  [
    { title: 'Article 1' },
    { title: 'Article 2' },
    { title: 'Article 3' },
    { title: 'Article 4' },
    { title: 'Article 5' }
  ],
  [
    { title: 'Article 6' },
    { title: 'Article 7' },
    { title: 'Article 8' },
    { title: 'Article 9' },
    { title: 'Article 10' }
  ],
  [
    { title: 'Article 11' },
    { title: 'Article 12' },
    { title: 'Article 13' },
    { title: 'Article 14' },
    { title: 'Article 15' }
  ],
  [
    { title: 'Article 16' },
    { title: 'Article 17' },
    { title: 'Article 18' },
    { title: 'Article 19' },
    { title: 'Article 20' }
  ],
  [
    { title: 'Article 21' },
    { title: 'Article 22' },
    { title: 'Article 23' },
    { title: 'Article 24' },
    { title: 'Article 25' }
  ]
]

export default {
  async list () {
    return randomData[Math.floor(Math.random() * 5)]
  }
}
