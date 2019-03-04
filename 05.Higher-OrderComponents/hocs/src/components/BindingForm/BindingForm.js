import React, { Component } from 'react';

class BindingForm extends Component {
    handleChange(e) {
        this.setState({
            [e.target.name]: e.targe.value
        });
    }
    render() {
        return (
            <form onSubmit={(e) => this.props.onSubmit(e, this.state)}>
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, { onChange: this.handleChange.bind(this), ...child.props });
                })}
                <input type="submit" value="Register" />
            </form>
        );
    }
}

export default BindingForm;
