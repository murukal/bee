import ReactDOM from 'react-dom/client'
import { ReactNode, StrictMode } from 'react'
import { RouteObject } from 'react-router-dom'
import Router from './components/Router'
import { Provider as StoreProvide, ProviderProps } from 'react-redux'

/**
 * 插件枚举
 */
export enum PluginType {
  Store = 'store'
}

interface FoundationProps {
  store: ProviderProps['store'] | false
  isStrict: boolean
}

type Props = (
  | {
      routes: RouteObject[]
    }
  | {
      routes: false
      children: ReactNode
    }
) &
  FoundationProps

/**
 * 渲染器
 */
export const boorstrap = async (props: Props) => {
  let renderer: ReactNode = null

  // route 扩展
  if (props.routes) {
    renderer = <Router routes={props.routes} />
  } else {
    renderer = props.children
  }

  // store 扩展
  if (props.store) {
    renderer = <StoreProvide store={props.store}>{renderer}</StoreProvide>
  }

  // StrictMode 扩展
  if (props.isStrict) {
    renderer = <StrictMode>{renderer}</StrictMode>
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(renderer)
}
