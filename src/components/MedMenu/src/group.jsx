import T from 'ant-design-vue/es/menu/index'
import {
  getClass,
  getStyle,
  initDefaultProps,
  getListeners,
  getOptionProps
} from '../../_utils/props-util'

const selfProps = (defaultProps = {}) => {
  return initDefaultProps(T.ItemGroup.props, defaultProps)
}
export default {
  TreeNode: { ...T.ItemGroup.TreeNode, name: 'MedMenuItemGroupNode' },
  name: 'MedMenuItemGroup',
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
      <a-menu-item-group class="med-menu-item-group-wrapper" {...TProps}>
        {bodySlots}
      </a-menu-item-group>
    )
  }
}
