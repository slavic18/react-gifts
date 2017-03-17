import React from "react";
import {connect} from "react-redux";
import {stringify} from "query-string";
import {FormGroup, ControlLabel, HelpBlock, FormControl, Button, FieldGroup} from "react-bootstrap";
class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            _parent: '',
            thumbnailId: '',
            image: '',
            imagePreviewUrl: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleThumbnailChange = this.handleThumbnailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this);
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
        if (this.state._parent) {
            formData._parent = this.state._parent;
        }
        if (this.state.thumbnailId) {
            formData._thumbnail = this.state.thumbnailId;
        }
        fetch('http://localhost:9000/api/categories', {
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
        if (data.success && typeof data.category !== 'undefined') {
            this.props.router.push(`/categories/${data.category._id}`);
        }
    }

    render() {
        return (
            <div>
                <h2>Add new category</h2>
                <div className="row">
                    <div className="col-md-9">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                validationState={this.getTitleValidationState()}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.title}
                                    placeholder="Category title"
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
                                    placeholder="Category description"
                                    name="description"
                                    onChange={this.handleChange}
                                />
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
AddCategory.contextTypes = {
    router: React.PropTypes.object
};


// export the connected class
function mapStateToProps(state) {
    return {
        categories: state.category.categories || []
    };
}
export default connect(mapStateToProps)(AddCategory);