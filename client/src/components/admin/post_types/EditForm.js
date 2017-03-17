import React from "react";
import {connect} from "react-redux";
import {stringify} from "query-string";
import {FormGroup, ControlLabel, HelpBlock, FormControl, Button, FieldGroup} from "react-bootstrap";
import {push} from "react-router-redux";

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            title: '',
            description: '',
            _category: '',
            thumbnailId: '',
            image: '',
            imagePreviewUrl: '',
            formUrl: 'http://localhost:9000/api/gifts'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleThumbnailChange = this.handleThumbnailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.thumbnailForm = this.thumbnailForm.bind(this);
        this.handleRemoveThumbnail = this.handleRemoveThumbnail.bind(this);
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch({type: 'FETCH_CATEGORIES'});
        if (!!this.context.router.params.gift_id) {
            dispatch({type: 'FETCH_GIFT', payload: {giftId: this.context.router.params.gift_id}});
            this.setState({
                formUrl: 'http://localhost:9000/api/gifts/edit'
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gift && this.context.router.params.gift_id) {
            const gift = nextProps.gift;
            let updatedState = {
                _id: gift._id,
                title: gift.title,
                description: gift.description,
            };
            if (gift._thumbnail) {
                updatedState.thumbnailId = gift._thumbnail._id;
                updatedState.imagePreviewUrl = 'http://localhost:9000/' + gift._thumbnail.path;
            }
            if (gift._category) {
                updatedState._category = gift._category._id;
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
            title: this.state.title,
            description: this.state.description,
        };
        if (this.state._category) {
            formData._category = this.state._category;
        }
        if (this.state._id) {
            formData._id = this.state._id;
        }

        if (this.state.thumbnailId) {
            formData._thumbnail = this.state.thumbnailId;
        }
        fetch(this.state.formUrl, {
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
            push(`/gifts/${data.gift._id}`);
        }
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
        let formTitle = this.state._id ? 'Edit gift' : 'Add new gift';
        return (
            <div>
                <h2>{formTitle}</h2>
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
                        {this.thumbnailForm()}
                    </div>
                </div>
            </div>
        );
    }
}
EditForm.contextTypes = {
    router: React.PropTypes.object
};

// export the connected class
function mapStateToProps(state) {
    return {
        gift: state.gifts.currentGift || false,
        categories: state.category.categories || []
    };
}
export default connect(mapStateToProps)(EditForm);