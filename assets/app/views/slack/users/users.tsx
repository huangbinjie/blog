import * as React from "react"
import { Persona, PersonaSize } from "office-ui-fabric-react"
import * as Style from "./user_style"
import { ISlackListType, ISlackUserType } from "../../../types/slack_type"

type Props = {
  user?: ISlackUserType
}

export default class Users extends React.Component<Props, {}> {
  public render() {
    const personas = this.props.user && this.props.user.members
      .map(member => ({
        key: member.id,
        className: Style.PERSONA,
        primaryText: member.name,
        secondaryText: member.profile.title,
        imageUrl: member.profile.image_48
      }))
      .map(personaProps => <Persona {...personaProps} />)
    return (
      <div>
        {personas}
      </div>
    )
  }
}
