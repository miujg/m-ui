<template>
  <div :class="classs">
    <label :class="labelClass" v-if="!$slots.label" :style="labelStyle">{{label}}</label>
    <label :class="labelClass" :style="labelStyle" v-else>
      <slot name="label" />
    </label>
    <!-- <div :class="errClass" v-if="!$slots.error">{{formItemStatus.message}}</div> -->
    <div :class="contentClass">
      <slot />
      <div :class="errClass" v-if="!formItemStatus.passed">{{formItemStatus.message}}</div>
    </div>
    <!-- <div v-else :class="errClass">
      <slot name="error" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { useNamespace } from '@m-ui/hooks'
import { useFormItemClasss, useRules } from './useFormItem.ts'
import { IMForm } from './form.types'

export default defineComponent({
  name: 'MFormItem',
  props: {
    prop: String,
    label: String,
    require: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const mform:IMForm = inject('MForm', {model: {}, rules: {}, labelWidth: 'auto'})
    const labelStyle = computed(() => {
      return {
        width: typeof mform.labelWidth === 'string'? mform.labelWidth : `${mform.labelWidth}px`
      }
    })
    return {
      labelStyle,
      ...useFormItemClasss(),
      ...useRules(props,mform)
    }
  }
})
</script>
