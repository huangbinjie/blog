import * as React from "react"
import { FocusZone, FocusZoneDirection, List, TextField, Spinner, SpinnerType } from "office-ui-fabric-react"
import { Providers } from "ractor-react"
import { system } from "../../system"
import { HNState, HNStore } from "../../stores/HNStore"
import { CloseSocket, Init } from "../../messages/hn"
import Title from "./title/title"
import Pivot from "./pivot/pivot"
import Topics from "./topics/topics"

@Providers([HNStore])
export default class HN extends React.Component<HNState, {}> {
  public componentWillUnmount() {
    system.dispatch(new CloseSocket())
  }
  public componentDidMount() {
    if (!this.props.posts.length) {
      system.dispatch(new Init())
    }
  }
  public render() {
    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <Title />
        {Pivot(this.props.selectedKey)}
        <Topics posts={this.props.posts} />
      </FocusZone>
    )
  }
}
