import { definePropType } from '@element-plus/utils'
import { buttonProps } from './button'

import type { ExtractPublicPropTypes } from 'vue'
import type { ButtonProps } from './button'

export interface ButtonGroupProps {
  /**
   * @description 控制此按钮组中按钮的尺寸
   */
  size?: ButtonProps['size']
  /**
   * @description 控制此按钮组中按钮的类型
   */
  type?: ButtonProps['type']
  /**
   * @description 显示方向
   */
  direction?: 'horizontal' | 'vertical'
}

/**
 * @deprecated 将在 3.0.0 后移除，请改用 `ButtonGroupProps`。
 */
export const buttonGroupProps = {
  /**
   * @description 控制此按钮组中按钮的尺寸
   */
  size: buttonProps.size,
  /**
   * @description 控制此按钮组中按钮的类型
   */
  type: buttonProps.type,
  /**
   * @description 显示方向
   */
  direction: {
    type: definePropType<'horizontal' | 'vertical'>(String),
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
} as const

/**
 * @deprecated 将在 3.0.0 后移除，请改用 `ButtonGroupProps`。
 */
export type ButtonGroupPropsPublic = ExtractPublicPropTypes<
  typeof buttonGroupProps
>
