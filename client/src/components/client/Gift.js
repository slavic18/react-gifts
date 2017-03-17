import React from "react";
export default class Gift extends React.Component {
    renderThumbnail() {
        if (this.props.item._thumbnail) {
            return (
                <div className="img-container">
                    <img src={"http://localhost:9000/" + this.props.item._thumbnail.path}/>
                </div>
            )
        }
    }

    render() {
        const {item} = this.props,
            panelColors = ["panel-primary", "panel-success", "panel-info", "panel-warning", "panel-danger"];
        let panelColor = panelColors[Math.floor(Math.random() * panelColors.length)];
        return (
            <div className="col-md-3">
                <div className={"panel " + panelColor}>
                    <div className="panel-heading title">
                        {item.title}
                    </div>
                    <div className="panel-body">
                        {this.renderThumbnail()}
                    </div>
                    <div className="panel-footer">
                        <div className="description">
                            {item.description}
                        </div>
                    </div>
                </div>
                {}
                <div className="title">

                </div>
                <div className="description">

                </div>
            </div>
        )
    }
}

