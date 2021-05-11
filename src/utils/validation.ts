interface validateParams {
   value: string,
   setErrorText(text: string): void
}

export function validateEmail(value: string, setErrorText:(text: string) => void ): boolean {
	let regexp = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
	let isValueValid = regexp.test(value);
	if(!isValueValid) {
      setErrorText('Invalid email');
		return false;
	}
	setErrorText('');
	return true;
}

export function validatePassword(value: string, setErrorText:(text: string) => void): boolean {
	// let regexp = /^[a-zA-Z0-9]+{5,}$/;
   let regexp = /^[0-9]$/;
	let isValueValid = regexp.test(value);
	if(!isValueValid) {
		setErrorText('The password should consist of at least 5 symbols: letters and numbers');
		return false;
	}
	setErrorText('');
	return true;
}