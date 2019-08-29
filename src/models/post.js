import { makeModel } from '@/utils/model/model'
import fakeProvider from './providers/fake'

export const makePost = ({ ellipsis = '...', words = 10 }) =>
  makeModel({
    fields: {
      author: { default: {} },
      body: { default: null },
      title: { default: null }
    },
    computed: {
      authorFullName () {
        if (!this.author.firstName) return null

        return `${this.author.firstName} ${this.author.lastName}`
      },
      intro () {
        if (!this.body) return null

        return `${this.body
          .split(' ')
          .slice(0, words)
          .join(' ')}${ellipsis}`
      }
    },
    provider: fakeProvider
  })
