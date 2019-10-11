import Vue from 'vue'

export class Provider extends Vue {}

export default function makeProvider (driver) {
  return new Provider(driver)
}
