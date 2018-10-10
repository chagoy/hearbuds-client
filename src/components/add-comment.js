import React from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import Input from './input';
import {setComment} from '../actions/comments';
require('./add-comment.css');

export class AddComment extends React.Component {

	onSubmit(values) {
		const {body} = values;
		console.log(body)
		return this.props.dispatch(setComment(body))
	}

	render() {
		return (
			<form 
				className="comment-form"
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
				>
				<label htmlFor="body">Leave a comment</label>
				<Field
					component={Input}
					type="text"
					name="body"
					inputClass='commentInput'
				/>
				<button
					className='comment-button'
					type="submit"
					disabled={this.props.pristine || this.props.submitting}>
					Submit
				</button>
			</form>
		)
	}
}

const afterSubmit = (result, dispatch) => dispatch(reset('comment'));

export default reduxForm({
	form: 'comment',
	onSubmitSuccess: afterSubmit

})(AddComment);