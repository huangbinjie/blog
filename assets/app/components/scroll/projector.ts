export class Projector {
  // 开始坐标
  public startIndex = 0
  // 结束坐标，endIndex 可以超过 items 最大长度
  public endIndex = 0
  // 描点，index 等于 index 或者 startIndex + 3。offset 等于描点顶部到容器顶部的scrollTop
  public anchorItem = { index: 0, offset: 0 }
  public needAdjustment = false
  public isAdjusting = false

  private callback: Callback
  private guestimatedItemCountPerPage: number
  private displayCount: number
  private direction = "up"

  constructor(
    public divDom: HTMLDivElement,
    public upperContentDom: HTMLDivElement,
    public items: any[],
    public averageHeight: number,
    public cachedItemRect = [] as Cache[]
  ) {
    this.guestimatedItemCountPerPage = Math.ceil(this.divDom.clientHeight / averageHeight)
    this.displayCount = this.guestimatedItemCountPerPage
    this.endIndex = this.startIndex + this.displayCount - 1
  }

  public next(items?: any[]) {
    if (items) this.items = items

    // slice 的第二个参数不包括在内，为了要算进去，所以要 + 1
    const projectedItems = this.items.slice(this.startIndex, this.endIndex + 1)

    const startItem = this.cachedItemRect[this.startIndex]

    let upperPlaceholderHeight = 0
    if (startItem) {
      // 正常
      upperPlaceholderHeight = startItem.top
    } else if (this.startIndex >= 0) {
      // 如果起点不存在，则判断是猜测得来的。目前会导致这种情况的场景只有 resize，因为resize会清空缓存
      if (this.direction === "up") {
        upperPlaceholderHeight = this.divDom.scrollTop - this.averageHeight * 3
      } else {
        upperPlaceholderHeight = this.upperContentDom.offsetHeight
        this.needAdjustment = true
      }
    } else {
      // items从空到填满，这个时候是初始化，所以是0
      upperPlaceholderHeight = 0
    }

    const cachedItemRectLength = this.cachedItemRect.length
    const unCachedItemCount = this.items.length - (cachedItemRectLength === 0 ? this.endIndex : cachedItemRectLength)
    const lastCachedItemRect = this.cachedItemRect[cachedItemRectLength - 1]
    const lastCachedItemRectBottom = lastCachedItemRect ? lastCachedItemRect.bottom : 0
    const lastItemRect = this.endIndex >= cachedItemRectLength ? this.cachedItemRect[cachedItemRectLength - 1] : this.cachedItemRect[this.endIndex]
    const lastItemRectBottom = lastItemRect ? lastItemRect.bottom : 0
    const underPlaceholderHeight = lastCachedItemRectBottom - lastItemRectBottom + unCachedItemCount * this.averageHeight

    this.callback(projectedItems, upperPlaceholderHeight, underPlaceholderHeight)
  }

  /**
   * 手往上滑， 屏幕往下滑
   */
  public up = () => {
    this.direction = "up"
    const scrollTop = this.divDom.scrollTop
    const anchorItemRect = this.cachedItemRect[this.anchorItem.index]
    // 滑动范围超过一个元素的高度之后再处理
    if (scrollTop > anchorItemRect.bottom) {
      const itemIndex = this.cachedItemRect.findIndex(item => item ? item.bottom > scrollTop : false)
      if (itemIndex === -1) {
        // 滑的太快,读不出坐标,猜一个 itemIndex
        const cachedItemLength = this.cachedItemRect.length
        const unCachedDelta = scrollTop - this.cachedItemRect[cachedItemLength - 1].bottom
        // 缓存最后一个到当前anchor位置之间的item数量，暂时是猜测
        const guestimatedUnCachedCount = Math.ceil(unCachedDelta / this.averageHeight)
        // this.anchorItem.index = this.endIndex + guestimatedUnCachedCount
        this.startIndex = this.endIndex + guestimatedUnCachedCount - 3
        this.endIndex = this.startIndex + this.displayCount - 1
        this.cachedItemRect.length = 0
      } else {
        // 正常滑动速度
        this.startIndex = itemIndex > 2 ? itemIndex - 3 : 0
        this.endIndex = this.startIndex + this.displayCount - 1
      }
      this.next()
    }
  }

  /**
   * 手往下滑， 屏幕往上滑
   */
  public down = () => {
    this.direction = "down"
    const scrollTop = this.divDom.scrollTop
    // 不处理由于调整填充高度带来的滚动事件
    if (this.isAdjusting) {
      return
    }
    if (this.anchorItem.index > 3 && scrollTop < this.anchorItem.offset) {
      const startItem = this.cachedItemRect[this.startIndex]
      const itemIndex = this.cachedItemRect.findIndex(item => item ? item.top > scrollTop : false) - 1
      if (this.divDom.scrollTop < startItem.top && itemIndex === this.anchorItem.index - 3) {
        const delta = this.anchorItem.offset - this.divDom.scrollTop
        // 往上快速滑动，假设 [1,2,3,undefined,4] 从4往上滑，如果是3和4之间，那么会拿到4的下标，4的下标恰好是 this.anchorItem.index - 3，
        // 其他情况会拿到1-3的下标
        const guestimatedOutOfProjectorDelta = delta - (this.anchorItem.offset - startItem.top)
        const guestimatedOutOfProjectorCount = Math.floor(guestimatedOutOfProjectorDelta / this.averageHeight)
        const guestimatedStartIndex = itemIndex - guestimatedOutOfProjectorCount - 3
        this.startIndex = guestimatedStartIndex < 0 ? this.startIndex : guestimatedStartIndex
        this.endIndex = this.startIndex + this.displayCount - 1
      } else {
        this.startIndex = itemIndex > 2 ? itemIndex - 3 : 0
        this.endIndex = this.startIndex + this.displayCount - 1
      }
      this.next()
    }
  }

  /**
   * 缓存更新之前的高度减去缓存之后的高度得到填充区需要修补的高度
   * @param cache 描点的缓存坐标
   * @param height 填充区的高度，也是第一个 item 的 top
   * 
   */
  public computeUpperPlaceholderHeight(cache: Cache, height: number): number {
    const scrollTop = this.divDom.scrollTop
    const prevStartIndex = this.anchorItem.index - 3
    const scrollThroughItemCount = prevStartIndex - this.startIndex
    const sliceEndIndex = scrollThroughItemCount > 3 ? 3 : scrollThroughItemCount
    const scrollThroughItem = this.cachedItemRect.slice(this.startIndex, this.startIndex + scrollThroughItemCount)
    const scrollThroughItemDistance = scrollThroughItem.reduce((acc, item) => acc + item.height, 0)
    const finalHeight = height - scrollThroughItemDistance
    this.isAdjusting = true
    // 有可能是负数
    return finalHeight
  }

  public adjustAnchor(index: number) {
    const underAnchorIndex = this.cachedItemRect.findIndex(item => item ? item.top > this.divDom.scrollTop : false)!
    const anchor = this.cachedItemRect[underAnchorIndex - 1]
    if (anchor) {
      this.anchorItem = { index: anchor.index, offset: anchor.top }
    }
  }

  public scrollToAnchor(startIndex: number) {
    const underAnchorIndex = this.cachedItemRect.findIndex(item => item ? item.top > this.divDom.scrollTop : false)!
    const currentAnchor = this.cachedItemRect[underAnchorIndex - 1]
    const oldAnchor = this.anchorItem
    const deltaBetweenCurrentAnchorToOldAnchor = oldAnchor.offset - currentAnchor.top
    return 1
  }

  public subscribe(callback: Callback) {
    this.callback = callback
  }
}

export type Callback = (projectedItems: any[], upperPlaceholderHeight: number, underPlaceholderHeight: number) => void
export type Cache = { index: number, top: number, bottom: number, height: number, needAdjustment?: boolean }
