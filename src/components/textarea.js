import React from 'react';

export default class Textarea extends React.Component {
	componentDidUpdate(prevProps) {
		if (!prevProps.meta.active && this.props.meta.active) {
			this.input.focus();
		}
	}

	render() {
		let error;
		if (this.props.meta.touched && this.props.meta.error) {
			error = <div className='form-error'>{this.props.meta.error}</div>
		}

		let warning;
		if (this.props.meta.touched && this.props.meta.warning) {
			warning = (<div className='form-warning'>{this.props.meta.warning}</div>);
		}

		return (
			<div className='form-input'>
				<label htmlFor={this.props.input.name}>
					{this.props.label}
					{error}
					{warning}
				</label>
				<textarea 
					{...this.props.textarea}
					id={this.props.name}
					ref={input => (this.input = input)}
					className={this.props.textareaClass}
				>
				</textarea>
			</div>
		)
	}
}