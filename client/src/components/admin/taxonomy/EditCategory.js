import React from "react";
import {FormGroup, ControlLabel, HelpBlock, FormControl, Button, FieldGroup} from "react-bootstrap";
import {stringify} from "query-string";
import {connect} from "react-redux";
class EditCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
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
        this.thumbnailForm = this.thumbnailForm.bind(this);
        this.handleRemoveThumbnail = this.handleRemoveThumbnail.bind(this);
    }

    componentDidMount() {
        var {dispatch} = this.props;
        dispatch({type: 'FETCH_CATEGORY', payload: {categoryId: this.props.params.category_id}});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category) {
            const category = nextProps.category;
            let updatedState = {
                _id: category._id,
                title: category.title,
                description: category.description,
            };
            if (category._thumbnail) {
                updatedState.thumbnailId = category._thumbnail._id;
                updatedState.imagePreviewUrl = 'http://localhost:9000/' + category._thumbnail.path
            }
            this.setState(updatedState);
        }
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
            _id: this.state._id,
            title: this.state.title,
            description: this.state.description,
        };
        if (this.state._parent) {
            formData._parent = this.state._parent;
        }

        formData._thumbnail = this.state.thumbnailId;
        fetch('http://localhost:9000/api/categories/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: stringify(formData)
        }).then(function (response) {
            return response.json();
        }).then((response)=> {
            if (response.success && typeof response.category !== 'undefined') {
                window.location.reload();
            }
        });

        return false;
    }

    handleRemoveThumbnail() {
        this.setState({
            thumbnailId: null,
            imagePreviewUrl: ''
        })
    }

    thumbnailForm() {
        let thumbnailInput;
        if (this.state.thumbnailId) {
            thumbnailInput = (
                <div className="close-thumb" onClick={this.handleRemoveThumbnail}><i className="fa fa-close"/></div>);
        } else {
            thumbnailInput = (<FormControl
                type="file"
                name="file"
                onChange={this.handleThumbnailChange}
            />);
        }

        return (
            <form method="POST" encType="multipart/form-data">
                <FormGroup>
                    <ControlLabel>Thumbnail</ControlLabel>
                    {thumbnailInput}
                    <div className={!this.state.imagePreviewUrl ? 'hidden' : ''}>
                        <img className="thumbnail-preview" src={this.state.imagePreviewUrl}/>
                    </div>
                </FormGroup>
            </form>
        )
    }

    render() {
        return (
            <div>
                <h2>Edit category page</h2>
                <div className="row">
                    <div className="col-md-9">
                        <form onSubmit={this.handleSubmit}>
                            <input type="hidden" name="_id" value={this.state._id}/>
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
                        {this.thumbnailForm()}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        category: state.category.currentCategory || {}
    };
};

export default connect(mapStateToProps)(EditCategory);