<template>
  <form :class="classs">
    <slot />
  </form>
</template>

<script lang="ts">
import { FormRules, LabelPosition, ValidataFunc, Events } from './form.types'
import { computed, defineComponent, PropType, provide, reactive } from 'vue'
import { useNamespace } from '@m-ui/hooks'
import { useMitt } from './useForm'
import mitt, {Emitter} from 'mitt'
// import { Events, ValidataFunc } from './form.types'

export const emitter: Emitter<Events> = mitt<Events>()

export default defineComponent({
  name: 'MForm',
  props: {
    model: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    rules: {
      type: Object as PropType<FormRules>,
      default: () => ({})
    },
    labelWidth: {
      type: [String, Number],
      default: 'auto'
    },
    labelPosition: {
      type: String as PropType<LabelPosition>,
      default: 'right'
    }
  },
  setup(props, ctx) {
    provide('MForm', reactive({
      model: props.model || {},
      rules: props.rules || {},
      labelWidth: props.labelWidth 
    }))    
    const ns = useNamespace('form')
    const validataFuncs: ValidataFunc = {}
    useMitt(validataFuncs)
    const classs = computed(() => {
      return [
        ns.b(),
        ns.m(`label-${props.labelPosition}`)
      ]
    })
    const validate = () => {
      Object.keys(validataFuncs).forEach((key:string) => {
        validataFuncs[key]()
      })
    }

    return {
      classs,
      validate,
    }
  }
})
</script>
