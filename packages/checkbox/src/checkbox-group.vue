<template>
  <div :class="classs">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, provide } from 'vue'
import { useNamespace } from '@m-ui/hooks'

type Direction = 'column' | 'row'

export default defineComponent({
  name: 'MCheckboxGroup',
  props: {
    modelValue: Array,
    direction: {
      type: String as PropType<Direction>,
      default: 'row'
    }
  },
  emits: ['change', 'update:modelValue'],
  setup(props, {emit}) {
    const ns = useNamespace('checkbox-group')
    const classs = computed(() => {
      return [
        ns.b(),
        ns.m(props.direction)
      ]
    })
    // 将props computed 包一层给儿子
    const modelValue = computed(() => props.modelValue)
    const changeEvent = (val) => {
      emit('change', val)
      emit('update:modelValue', val)
    }
    provide('MCheckboxGroup', {
      name: 'MCheckboxGroup',
      modelValue,
      changeEvent
    })
    return {
      classs
    }
  },
})
</script>
