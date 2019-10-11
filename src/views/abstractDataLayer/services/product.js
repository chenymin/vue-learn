const randomData = [
  [
    { title: 'Product 1' },
    { title: 'Product 2' },
    { title: 'Product 3' },
    { title: 'Product 4' },
    { title: 'Product 5' }
  ],
  [
    { title: 'Product 6' },
    { title: 'Product 7' },
    { title: 'Product 8' },
    { title: 'Product 9' },
    { title: 'Product 10' }
  ],
  [
    { title: 'Product 11' },
    { title: 'Product 12' },
    { title: 'Product 13' },
    { title: 'Product 14' },
    { title: 'Product 15' }
  ],
  [
    { title: 'Product 16' },
    { title: 'Product 17' },
    { title: 'Product 18' },
    { title: 'Product 19' },
    { title: 'Product 20' }
  ],
  [
    { title: 'Product 21' },
    { title: 'Product 22' },
    { title: 'Product 23' },
    { title: 'Product 24' },
    { title: 'Product 25' }
  ]
]

export default {
  async list () {
    return randomData[Math.floor(Math.random() * 5)]
  }
}
