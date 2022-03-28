import { useNamespace } from '@m-ui/hooks'
import { computed, reactive, watch } from 'vue'
import { IFormItemProps } from './form-item.types'
import { Arrayable, FormItemRule, IMForm, ValidataFunc } from './form.types'
import type { RuleItem } from 'async-validator'
import { emitter } from './useForm'

// class相关
export const useFormItemClasss = () => {
  const ns = useNamespace('form-item')
  const classs = computed(() => {
    return [
      ns.b()
    ]
  })
  const labelClass = computed(() => {
    return [
      ns.e('label')
    ]
  })
  const errClass = computed(() => {
    return [
      ns.e('error')
    ]
  })
  const contentClass = computed(() => {
    return [
      ns.e('content')
    ]
  })
  return {
    labelClass,
    classs,
    errClass,
    contentClass  
  }
}

// 封装校验函数，转发给form组件
// trigger为change的要进行实时校验
export const useRules = (props:IFormItemProps, mform:IMForm) => {
  const formItemStatus = reactive({
    passed: true,
    message: ''
  })
  if (props.prop !== undefined) {
    let rulesSource:Arrayable<FormItemRule> = mform.rules[props.prop]
    let rules:Array<FormItemRule> = Array.isArray(rulesSource)? rulesSource : [rulesSource]
    // 没有配置校验规则，直接返回true
    if (rules.length === 0) {
      formItemStatus.passed = true
      return {
        formItemStatus
      }
    }
    const validataRule = (rule: RuleItem) => {
      const value = mform.model[props.prop]
      let passed = true
      formItemStatus.message = rule.message as string
        // 这里可以做一些列的判断，比如邮箱，手机号...
      if (rule.required) {
        // 如果是数组：
        if (Array.isArray(value)) passed = value.length > 0
        else passed = value.trim() !== ''
      } else if (rule.validator) {
        // 自定义校验,回调函数，所以需要封装成promise
        const callback = (error?: string|Error):void => {
          passed = error === undefined
          formItemStatus.message = error === undefined? '' :
            typeof error === 'string' ? error : error.message
        }
        rule.validator(rule, value, callback, {}, {})
      }
      return passed
    }
    // 封装各个form-item的校验函数
    const validata = ():boolean => {
      formItemStatus.passed = rules.every(validataRule)
      return formItemStatus.passed
    }
    // 使用emitter将校验函数发送给form组件， form组件submit的时候同意校验
    const itemValidataFun: ValidataFunc = {}
    itemValidataFun[props.prop] = validata
    emitter.emit('validataFunc', itemValidataFun)
    // 对于trigger为change的要实时校验
    watch(() => mform.model[props.prop], (val) => {
      console.log(val)
      const changeRules = rules.filter(rule => rule.trigger === 'change')
      if (changeRules.length > 0) formItemStatus.passed = changeRules.every(validataRule)
    })
  }
  return {
    formItemStatus
  }
}