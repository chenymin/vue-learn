const fakeResponse = [
  {
    author: {
      avatar: 'https://picsum.photos/id/1011/25',
      id: 1,
      name: 'Jane Doe'
    },
    id: 1,
    intro: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
    title: 'Lorem Ipsum'
  },
  {
    author: {
      avatar: 'https://picsum.photos/id/1005/25',
      id: 2,
      name: 'John Doe'
    },
    id: 2,
    intro: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    title: 'Dolor sit'
  },
  {
    author: {
      avatar: 'https://picsum.photos/id/1005/25',
      id: 2,
      name: 'John Doe'
    },
    id: 3,
    intro: 'Sanctus est Lorem ipsum dolor sit amet.',
    title: 'Sanctus est'
  },
  {
    author: {
      avatar: 'https://picsum.photos/id/1011/25',
      id: 1,
      name: 'Jane Doe'
    },
    id: 4,
    intro: 'Gubergren, no sea takimata sanctus est.',
    title: 'Gubergren'
  }
]

export default {
  async list () {
    return fakeResponse
  }
}
