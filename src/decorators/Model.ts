import { createDecorator, Vue } from 'vue-class-component'
import { applyMetadata } from '../helpers/metadata'

/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
export function Model(
  event?: string,
  options: any | any[] | any = {},
) {
  return (target: Vue, key: string) => {
    applyMetadata(options, target, key)
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || ((componentOptions.props = {}) as any))[
        k
      ] = options
      componentOptions.model = { prop: k, event: event || k }
    })(target, key)
  }
}
