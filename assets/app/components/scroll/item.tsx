import * as React from "react"
import { Projector } from "./projector"


export type Props = {
  item: any,
  itemIndex: number,
  index: number,
  isLast: boolean
  onRenderCell: (item?: any, index?: number) => React.ReactNode
  upperPlaceholderHeight: number
  projector: Projector
}

export class Item extends React.Component<Props> {
  public dom: HTMLDivElement

  public componentWillReceiveProps(nextProps: Props) {
    this.setCache(nextProps)
  }

  public shouldComponentUpdate(nextProps: Props) {
    return this.props.itemIndex !== nextProps.itemIndex ? true : false
  }

  // 不知道怎么回事，这个函数拿不到 parent.div
  public componentDidMount() {
    this.setCache(this.props)
  }

  public render() {
    return <div ref={div => this.dom = div!}>
      {this.props.onRenderCell(this.props.item, this.props.itemIndex)}
    </div>
  }

  public updateCache = (nextProps: Props) => {
    const { projector, itemIndex, upperPlaceholderHeight } = nextProps
    const cachedItemRect = projector.cachedItemRect
    const curItem = cachedItemRect[itemIndex]
    const prevItem = cachedItemRect[itemIndex - 1]
  }

  public setCache = (nextProps: Props) => {
    const { projector, itemIndex, upperPlaceholderHeight } = nextProps
    const cachedItemRect = projector.cachedItemRect
    const curItem = cachedItemRect[itemIndex]
    const prevItem = cachedItemRect[itemIndex - 1]

    // 需要调整啥事都不用干(不过还是走到if的分支去了)，这个时候的填充高度不准(待优化)。等新的填充高度计算出来再更新缓存
    // 更新已存在的缓存有2种情况
    // 1、window.resize
    // 2、一次性滑动过多，纠正填充高度之后需要纠正之后的缓存
    if (projector.needAdjustment) {
      const rect = this.dom.getBoundingClientRect()
      if (itemIndex === projector.startIndex) {
        const bottom = upperPlaceholderHeight + rect.height
        const top = upperPlaceholderHeight
        cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: true }
      } else {
        // 加了 pure 之后，会从之前的第一个开始计算，但是这个时候的startIndex不同
        // 之前是 17 18 19 20，从20滑动到 19，17先收到props，再 mount 16
        if (!prevItem) return
        const bottom = prevItem.bottom + rect.height
        const top = prevItem.bottom
        cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: true }
      }
      // if (projector.isAdjusting && this.props.isLast) {
      //   projector.needAdjustment = false
      //   projector.isAdjusting = false
      // }
    } else {
      if (curItem && curItem.needAdjustment === false) return
      // if (!curItem) {
      const rect = this.dom.getBoundingClientRect()
      if (prevItem) {
        // 当前item不存在但是前一个存在
        const bottom = prevItem.bottom + rect.height
        const top = prevItem.bottom
        cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: false }
      } else {
        // 当前 item 不存在，且前一个也不存在
        const bottom = upperPlaceholderHeight + rect.height
        const top = upperPlaceholderHeight
        cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: false }
      }
    }
  }
}