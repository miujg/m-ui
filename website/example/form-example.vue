<template>
  <h4>带校验的表单：</h4>
  <m-form :model="model" :rules="rules" ref="ruleFormRef" label-width="80px">
    <m-form-item prop="name" label="姓名">
      <input type="text" v-model="model.name" />
    </m-form-item>
    <m-form-item prop="age">
      <template #label>
        年龄
      </template>
      <input type="text" v-model="model.age" />
    </m-form-item>
    <m-form-item prop="hobby" label="爱好">
      <m-checkbox-group v-model="model.hobby">
        <m-checkbox v-for="item in hobbies" 
          :key="item.value" :label="item.value">
          {{item.name}}
        </m-checkbox>
      </m-checkbox-group>
    </m-form-item>
    <m-form-item>
      <!-- <div @click="submit(ruleFormRef)">submit</div> -->
      <m-button @click="submit(ruleFormRef)">submit</m-button>
    </m-form-item>
  </m-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
const useHobby = () => {
  const hobbies = reactive([
    {name: '篮球', value: 1},
    {name: '乒乓球', value: 2},
    {name: '羽毛球', value: 3},
    {name: '足球', value: 4},
  ])
  return {
    hobbies
  }
}

function useForm() {
  const model = reactive({
    name: 'xxx',
    age: 24,
    hobby: []
  })
  const ruleFormRef = ref()
  const submit = (ruleFormRef) => {
    ruleFormRef.validate()
  }
  return {
    ...useHobby(),
    model,
    ruleFormRef,
    submit
  }
}

function useRule() {
  const checkAge = (rule: any, value: any, callBack: any) => {
    if (value < 0 || value > 120) callBack(new Error('年龄不符合常理'))
    else callBack()
  }
  const rules = reactive({
    name: [{required: true, message: '请输入名字', trigger: 'change'}],
    age: [
      {required: true, message: '请输入年龄', trigger: 'change'},
      {validator: checkAge, trigger: 'change'}
    ],
    hobby: { required: true, message: '请选择爱好', trigger: 'change' }
  })
  return {
    rules
  }
}

export default defineComponent({
  setup() {
    return {
      ...useForm(),
      ...useRule()
    }
  },
})
</script>
