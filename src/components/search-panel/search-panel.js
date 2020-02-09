import React, {Component} from 'react';

export default class SearchPanel extends Component {
    state = {
        term: ''
    }

    onSearchChange = (e) => {
        const {onSearchItem = () => {}} = this.props;
        this.setState({
            term: e.target.value
        });
        onSearchItem(e.target.value);
    };

    render() {
        
        
        return (
            <input type="text" 
            className="form-control search-input" 
            placeholder="type to search" 
            value={this.state.term}
            onChange = {this.onSearchChange}
            />
        );
    }   
};
