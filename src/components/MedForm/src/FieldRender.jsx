import { MedRadio, MedCheckbox } from './../../index'
export default {
  name: 'FieldRender',
  components: {
    MedRadio,
    MedCheckbox
  },
  data() {
    return {
      decorator: []
    }
  },
  props: {
    formLayout: Object,
    itemOptions: {
      type: Object,
      default: () => ({
        label: '控件名称',
        type: 'text',
        initialValue: '',
        value: '',
        placeholder: '',
        validator: (rule, value, callback) => {
          callback()
        }
      })
    }
  },
  created() {
    this.decorator = [
      this.itemOptions['fieldName'],
      {
        initialValue: this.itemOptions['initialValue'],
        validateTrigger: this.itemOptions['trigger'],
        validateFirst: this.itemOptions['validateFirst'],
        valuePropName: this.itemOptions.type === 'switch' ? 'checked' : 'value',
        rules: [
          {
            required: this.itemOptions.disabled
              ? false
              : this.itemOptions['required'],
            message: this.itemOptions['wrongMsg']
          },
          {
            validator: this.validator
          }
        ]
      }
    ]
  },
  methods: {
    validator(rule, value, callback) {
      !this.itemOptions.disabled && this.itemOptions['validator']
        ? this.itemOptions['validator'](rule, value, callback)
        : callback()
    },
    selectFilterOption(input, option) {
      // 下拉框过滤函数
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    cascaderFilter(inputValue, path) {
      // 级联过滤函数
      return path.some(
        option =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
    }
  },
  watch: {
    itemOptions: {
      deep: true,
      handler(n) {
        this.$nextTick(() => {
          this.decorator = [
            n['fieldName'],
            {
              initialValue: n['initialValue'],
              rules: [
                { required: n['required'], message: n['wrongMsg'] },
                {
                  validator: this.validator
                }
              ]
            }
          ]
        })
      }
    }
  },
  render(createElement) {
    const {
      itemOptions,
      itemOptions: {
        responsive,
        fieldName,
        type,
        labelText,
        formLayout,
        hasFeedback,
        disabled,
        format,
        valueFormat,
        showTime,
        optionList,
        customRender,
        change
      },
      decorator,
      cascaderFilter,
      selectFilterOption
    } = this
    const changeEvent = disabled ? () => {} : change
    const CUSTOM =
      fieldName && type && customRender ? customRender(createElement) : false
    // INPUT 输入框
    const INPUT =
      fieldName && type === 'text'
        ? CUSTOM || (
            <a-input
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null
    // TEXTAREA 输入框
    const TEXTAREA =
      fieldName && type === 'textarea'
        ? CUSTOM || (
            <a-textarea
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null
    // number 输入框
    const NUMBER =
      fieldName && type === 'number'
        ? CUSTOM || (
            <a-input-number
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null
    // radio 单选框
    const RADIO = CUSTOM ? (
      <a-form-item
        label={labelText}
        has-feedback={hasFeedback}
        label-col={formLayout.labelCol}
        wrapper-col={formLayout.wrapperCol}
      >
        {CUSTOM}
      </a-form-item>
    ) : (
      <med-radio
        isFormItem
        decorator={decorator}
        {...{
          attrs: itemOptions,
          on: {
            change: changeEvent
          }
        }}
      />
    )
    // checkbox 多选框
    const CHECKBOX = CUSTOM ? (
      <a-form-item
        label={labelText}
        has-feedback={hasFeedback}
        label-col={formLayout.labelCol}
        wrapper-col={formLayout.wrapperCol}
      >
        {CUSTOM}
      </a-form-item>
    ) : (
      <med-checkbox
        isFormItem
        decorator={decorator}
        {...{
          attrs: itemOptions,
          on: {
            change: changeEvent
          }
        }}
      />
    )
    // 日期 选择框
    const DATAPICKER =
      fieldName && type === 'datetime'
        ? CUSTOM || (
            <a-date-picker
              format={
                format
                  ? format
                  : showTime
                  ? 'YYYY-MM-DD HH:mm:ss'
                  : 'YYYY-MM-DD'
              }
              valueFormat={
                valueFormat
                  ? valueFormat
                  : showTime
                  ? 'YYYY-MM-DDTHH:mm:[00][Z]'
                  : 'YYYY-MM-DDT[00]:[00]:[00][Z]'
              }
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null
    // 时间段 选择框
    const RANGEPICKER =
      fieldName && type === 'datetimeRange'
        ? CUSTOM || (
            <a-range-picker
              format={
                format
                  ? format
                  : showTime
                  ? ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']
                  : ['YYYY-MM-DD', 'YYYY-MM-DD']
              }
              valueFormat={
                valueFormat
                  ? valueFormat
                  : showTime
                  ? 'YYYY-MM-DDTHH:mm:[00][Z]'
                  : 'YYYY-MM-DDT[00]:[00]:[00][Z]'
              }
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null
    // 级联 选择框
    const CASCADER =
      fieldName && type === 'cascader'
        ? CUSTOM || (
            <a-cascader
              vDecorator={decorator}
              showSearch={{ cascaderFilter }}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null
    // select 选择框
    const SELECT =
      fieldName && type === 'select'
        ? CUSTOM || (
            <a-select
              allowClear
              showSearch
              filterOption={selectFilterOption}
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            >
              {optionList &&
                optionList.map((item, index) => {
                  return (
                    <a-select-option value={item.value} key={index}>
                      {item.label}
                    </a-select-option>
                  )
                })}
            </a-select>
          )
        : null
    // treeSelect 选择框
    const TREESELECT =
      fieldName && type === 'treeSelect'
        ? CUSTOM || (
            <a-tree-select
              allowClear
              tree-data={optionList}
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null
    // 滑动 输入条
    const SLIDER =
      fieldName && type === 'slider'
        ? CUSTOM || (
            <a-slider
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null
    // 评分
    const RATE =
      fieldName && type === 'rate'
        ? CUSTOM || (
            <a-rate
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null
    // 开关
    const SWITCH =
      fieldName && type === 'switch'
        ? CUSTOM || (
            <a-switch
              vDecorator={decorator}
              {...{
                attrs: itemOptions,
                on: {
                  change: changeEvent
                }
              }}
            />
          )
        : null

    const isNormal = fieldName && type !== 'radio' && type !== 'checkbox'
    const renderSpecical =
      type === 'radio' ? (
        <a-col
          {...{
            attrs: responsive
          }}
        >
          {RADIO}
        </a-col>
      ) : type === 'checkbox' ? (
        <a-col
          {...{
            attrs: responsive
          }}
        >
          {CHECKBOX}
        </a-col>
      ) : null
    return isNormal ? (
      <a-col
        {...{
          attrs: responsive
        }}
      >
        <a-form-item
          label={labelText}
          has-feedback={hasFeedback}
          label-col={formLayout.labelCol}
          wrapper-col={formLayout.wrapperCol}
        >
          {INPUT}
          {TEXTAREA}
          {NUMBER}
          {DATAPICKER}
          {RANGEPICKER}
          {CASCADER}
          {SELECT}
          {TREESELECT}
          {SLIDER}
          {RATE}
          {SWITCH}
        </a-form-item>
      </a-col>
    ) : (
      renderSpecical
    )
  }
}
