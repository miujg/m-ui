<template>
  <div :class="panelClass">
    <p :class="headClass">
      {{title}}
       <m-checkbox v-model="allChecked" 
        @change="handleCheckAllChange"
        :indeterminate="indeterminate"
      >
        全选
      </m-checkbox>
    </p>
    <div :class="bodyClass">
      <div>
        <m-checkbox-group v-model="checked" direction="column">
          <m-checkbox v-for="item in data" :key="item[keyProp]" :label="item[keyProp]" :disabled="item[disabledProp]">
            {{item[labelProp]}}
          </m-checkbox>
        </m-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { Props } from './transfer.type'
import MCheckbox from '@m-ui/checkbox'
import MCheckboxGroup from '@m-ui/checkbox-group'
import { useCheck, usePanelClass } from './useTransfer'

export default defineComponent({
  name: 'MTransferPanel',
  components: { MCheckbox, MCheckboxGroup },
  props: {
    data: {
      type: Array, 
      default: () => []
    },
    title: {
      type: String,
      default: 'Source'
    },
    props: {
      type: Object as PropType<Props>,
      default: () => ({
        lable: 'label',
        key: 'key',
        disabled: 'disabled'
      })
    }
  },
  emits: ['checked-change'],
  setup(props) {
    // 有一个自己的状态
    const panelState = reactive({
      checked: [], // 选中的
      allChecked: false,
      // 是否处于半选状态
      indeterminate: false
    })

    // 根据props 算出key。 动态的
    return {
      ...toRefs(panelState),
      ...useCheck(props, panelState),
      ...usePanelClass()
    }
  },
})
</script>
