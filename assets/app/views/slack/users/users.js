"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const Style = require("./user_style");
class Users extends React.Component {
    render() {
        const personas = this.props.user && this.props.user.members
            .map(member => ({
            key: member.id,
            className: Style.PERSONA,
            primaryText: member.name,
            secondaryText: member.profile.title,
            imageUrl: member.profile.image_48
        }))
            .map(personaProps => React.createElement(office_ui_fabric_react_1.Persona, Object.assign({}, personaProps)));
        return (React.createElement("div", null, personas));
    }
}
exports.default = Users;
