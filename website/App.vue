<template>
  <!-- <element-preview /> -->
  <checkbox-example />
  <form-example />
  <!-- <input-example /> -->
  <transfer-example />
  <button-example />
  <row-col />
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import ButtonExample from './example/button-example.vue'
import RowCol from './example/row-col.vue'
import ElementPreview from './example/element-preview.vue'
import CheckboxExample from './example/checkbox-example.vue'
import TransferExample from './example/transfer-example.vue'
import FormExample from './example/form-example.vue'
import InputExample from './example/input-example.vue'


export default defineComponent({
  components: {
    ButtonExample, 
    RowCol, 
    ElementPreview, 
    CheckboxExample,
    TransferExample,
    FormExample,
    InputExample
  },
  setup() {
    
  }
})
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  h4 {
    margin: 10px 0;
  }
</style>

