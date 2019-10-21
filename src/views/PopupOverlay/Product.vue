<template>
  <div>
    <h1>Fancy Product</h1>
    <ul>
      <li>Feature 1</li>
      <li>Feature 2</li>
      <li>Feature 3</li>
      <li>Feature 4</li>
      <li>Feature 5</li>
    </ul>
    <RouterLink to="/product/1/image">Show preview image</RouterLink>
    <br>
    <small>Because of a bug with CodeSandbox in combination with Vue Router, closing the modal does not work correctly.</small>
    <br><br>
    <AddToCartButton/>
    <RouterView/>
  </div>
</template>

<script>
  import AddToCartButton from './AddToCartButton.vue'

  export default {
    name: 'Product',
    components: {
      AddToCartButton
    }
  }
</script>

