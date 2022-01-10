import T from 'ant-design-vue/es/mentions/index'
import {
  getClass,
  getStyle,
  initDefaultProps,
  getListeners,
  getOptionProps
} from '../../_utils/props-util'

const selfProps = (defaultProps = {}) => {
  return initDefaultProps(T.Option.props, defaultProps)
}
export default {
  TreeNode: { ...T.Option.TreeNode, name: 'MedMentionsOptionNode' },
  name: 'MedMentionsOption',
  inheritAttrs: false,
  props: selfProps({}),
  render() {
    const { $attrs, $scopedSlots } = this
    const TProps = {
      props: getOptionProps(this),
      on: {
        ...getListeners(this)
      },
      attrs: $attrs,
      class: getClass(this),
      style: getStyle(this),
      scopedSlots: $scopedSlots
    }
    const bodySlots = Object.keys(this.$slots).map(slot => {
      if (slot === 'default') return this.$slots[slot]
      return <template slot={slot}>{this.$slots[slot]}</template>
    })
    return (
      <a-mentions-option class="med-mentions-option-wrapper" {...TProps}>
        {bodySlots}
      </a-mentions-option>
    )
  }
}
