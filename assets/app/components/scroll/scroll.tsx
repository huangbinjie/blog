import * as React from "react"
import { Projector, Cache } from "./projector"

export type Props<T= {}> = {
  cache?: Cache,
  containerHeight: number
  itemAverageHeight: number
  className?: string
  items: T[]
  key?: string
  onRenderCell: (item?: T, index?: number) => React.ReactNode
  onScroll?: (dom: HTMLDivElement) => void
  initialScrollTop?: number
}

export type State = {
  projectedItems: any[]
  uponContentPlaceholderHeight: number
  underContentPlaceholderHeight: number
}

export class InifiteScroll extends React.Component<Props, State> {
  public static defaultProps = {
    initialScrollTop: 0,
    onScroll: () => { }
  }
  public state: State = { projectedItems: [], underContentPlaceholderHeight: 0, uponContentPlaceholderHeight: 0 }
  private divDom: HTMLDivElement

  private scrollTop = 0
  private projector: Projector

  public componentWillReceiveProps(nextProps: Props) {
    this.projector.next(nextProps.items)
  }

  /**
   * 第一次加载空数组，为了拿到容器的dom：divDom
   * 预估显示数量
   * 根据预估数量计算出下描点位置
   */
  public componentDidMount() {
    this.projector = new Projector(this.divDom, this.props.items, this.props.itemAverageHeight, this.props.cache)
    this.projector.subscribe((projectedItems, uponContentPlaceholderHeight, underContentPlaceholderHeight) => {
      const prevStateItemsLength = this.state.projectedItems.length
      this.setState({ projectedItems, uponContentPlaceholderHeight, underContentPlaceholderHeight }, () => {
        if (prevStateItemsLength === 0 && projectedItems.length > 0) {
          this.divDom.scrollTop = this.props.initialScrollTop!
        }
      })
    })
    this.projector.next()
  }

  public render() {
    const offsetTop = this.divDom ? this.divDom.offsetTop : 0
    return (
      <div ref={div => this.divDom = div!} style={{ overflow: "scroll", boxSizing: "border-box", height: this.props.containerHeight }} onScroll={this.onScroll}>
        <div style={{ height: this.state.uponContentPlaceholderHeight }}></div>
        {this.state.projectedItems.map((item, index) => React.createElement(this.createChild(item, this.projector.startIndex + index, offsetTop), { key: this.props.key ? item[this.props.key] : index }))}
        <div style={{ height: this.state.underContentPlaceholderHeight }}></div>
      </div>
    )
  }

  public createChild = (item: any, index: number, offsetTop: number) => {
    const parent = this
    return class Child extends React.Component {
      public dom: HTMLDivElement

      // 不知道怎么回事，这个函数拿不到 parent.div
      public componentDidMount() {
        this.setCache()
      }
      public render() {
        return <div ref={div => this.dom = div!}>
          {parent.props.onRenderCell(item, index)}
        </div>
      }

      /**
       * 定义：marginTop 所在位置的 top + marginTop + height
       * ------container top
       *    |   marginTop
       * ------ 这里不是top
       * |    | height offsetHeight
       * ------ bottom 下一个 item 的 top
       */
      public setCache() {
        const cachedItemRect = parent.projector.cachedItemRect
        const curItem = cachedItemRect[index]
        const prevItem = cachedItemRect[index - 1]

        if (!curItem) {
          const rect = this.dom.getBoundingClientRect()
          if (prevItem) {
            // 当前item不存在但是前一个存在
            const bottom = prevItem.bottom + rect.height
            const top = prevItem.bottom
            cachedItemRect[index] = { top, bottom, height: rect.height }
          } else {
            // 当前 item 不存在，且前一个也不存在
            const bottom = parent.state.uponContentPlaceholderHeight + rect.height
            const top = parent.state.uponContentPlaceholderHeight
            cachedItemRect[index] = { top, bottom, height: rect.height }
          }
        }
      }
    }
  }

  public onScroll = () => {
    const newScrollTop = this.divDom.scrollTop
    this.props.onScroll!(this.divDom)
    if (newScrollTop < this.scrollTop) {
      //手往下滑,屏幕往上滑
      this.projector.down()
    } else {
      //往上滑,屏幕往下滑
      this.projector.up()
    }
    this.scrollTop = newScrollTop
  }
}
