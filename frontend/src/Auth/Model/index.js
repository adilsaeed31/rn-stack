// @flow

// type assignment
import type Auth from '../Types';

export default class AuthModel {
	constructor(props: Auth) {
		this.initialize(props);
	}

	initialize(props: Auth) {
		this.name = props.name || 'Guest';
		this.email = props.email || 'guest@guest.com';
		this.password = props.password || '';
	}
}
