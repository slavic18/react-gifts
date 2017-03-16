import React from "react";
import {connect} from "react-redux";
import {stringify} from "query-string";
import {FormGroup, ControlLabel, HelpBlock, FormControl, Button, FieldGroup} from "react-bootstrap";

class AddGift extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            _category: '',
            thumbnailId: '',
            image: '',
            imagePreviewUrl: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleThumbnailChange = this.handleThumbnailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this);
    }

    componentWillMount(){
        this.props.dispatch({type:'FETCH_CATEGORIES'});
    }

    getTitleValidationState() {
        const length = this.state.title.length;
        if (length > 5) {
            return 'success';
        } else if (length > 3) {
            return 'warning';
        }
        else if (length > 0) {
            return 'error';
        }
    }

    handleChange(e) {
        let name = e.target.name,
            updatedState = this.state;
        updatedState[name] = e.target.value;
        this.setState(updatedState);
    }

    handleThumbnailChange(e) {
        if (typeof e.target.files !== 'undefined') {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    image: file,
                    imagePreviewUrl: reader.result
                });
                var data = new FormData();
                data.append('thumbnail', file);
                var req = new XMLHttpRequest();
                req.onload = (e) => {
                    let response = JSON.parse(req.response);
                    if (response.success && typeof response.Media !== 'undefined') {
                        this.setState({
                            thumbnailId: response.Media._id
                        });
                    }
                };
                req.open('POST', 'http://localhost:9000/fileUpload');
                req.send(data);
            };
            reader.readAsDataURL(file);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // validate fields
        if (this.state.title.length < 5) {
            return;
        }
        let formData = {
            title: this.state.title,
            description: this.state.description,
        };
        if (this.state._category) {
            formData._category = this.state._category;
        }

        if (this.state.thumbnailId) {
            formData._thumbnail = this.state.thumbnailId;
        }
        fetch('http://localhost:9000/api/gifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: stringify(formData)
        }).then(function (response) {
            return response.json();
        }).then(this.handleSuccessSubmit);

        return false;
    }

    handleSuccessSubmit(data) {
        if (data.success && typeof data.gift !== 'undefined') {
            this.props.router.push(`/gifts/${data.gift._id}`);
        }
    }

    render() {
        return (
            <div>
                <h2>Add new gift</h2>
                <div className="row">
                    <div className="col-md-9">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                validationState={this.getTitleValidationState()}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.title}
                                    placeholder="Gift title"
                                    name="title"
                                    onChange={this.handleChange}
                                />
                                <HelpBlock>Min length is 5 symbols</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    value={this.state.description}
                                    placeholder="Gift description"
                                    name="description"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Category</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    value={this.state._category}
                                    placeholder="Select category"
                                    name="_category"
                                    onChange={this.handleChange}
                                >
                                    {this.props.categories.map(category => {
                                        return (
                                            <option key={category._id} value={category._id}>{category.title}</option>
                                        )
                                    })}
                                </FormControl>
                            </FormGroup>
                            <Button type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                    <div className="col-md-3">
                        <form method="POST" encType="multipart/form-data">
                            <FormGroup>
                                <ControlLabel>Thumbnail</ControlLabel>
                                <FormControl
                                    type="file"
                                    name="file"
                                    onChange={this.handleThumbnailChange}
                                />
                                <div className={!this.state.imagePreviewUrl ? 'hidden' : ''}>
                                    <img className="thumbnail-preview" src={this.state.imagePreviewUrl}/>
                                </div>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
AddGift.contextTypes = {
    router: React.PropTypes.object
};


// export the connected class
function mapStateToProps(state) {
    console.log(state);
    return {
        categories: state.category.categories || []
    };
}
export default connect(mapStateToProps)(AddGift);