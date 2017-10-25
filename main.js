document.addEventListener('DOMContentLoaded', () => {
	
	let formIsVisible = false;
	
	const formAddContact = document.getElementById('contactInputForm');
	
	const input = formAddContact.querySelectorAll('input');

	const divForm = document.querySelector('#form-container');

	const mainDiv = document.querySelector('.main');
	const ul = document.getElementById('contactList');

	const div = document.createElement('div');
	const addLink = document.createElement('a');
	
	// Click to add contactform
	addLink.textContent = "Click here to add contact";
	div.appendChild(addLink);
	mainDiv.insertBefore(div, ul);
	
	
	//click event handler
	addLink.addEventListener('click', (e) => {
		if(!formIsVisible){
			divForm.style.display = 'block';
			addLink.style.display = 'none';
			formIsVisible = true;
		}
			
	});

	// add contact form submit handler
	formAddContact.addEventListener('submit', (e) => {
		e.preventDefault();
		
		const contact = {
				contactId: chance.guid(),
				firstName : '',
				lastName : '',
				phoneNumber : ''
		}
		
		contact.firstName = input[0].value;		
		contact.lastName = input[1].value;
		contact.phoneNumber = input[2].value;
		
		for(let i = 0; i < input.length; i++){
			input[i].value = '';
		}

		const li = createLI(contact.firstName, contact.lastName, contact.phoneNumber);
		
		save(contact);
		
		ul.appendChild(li);
		
	});
	
	// Contact tile buttons handler Delete, Edit Save Buttons
	ul.addEventListener('click', (e) => {
		if(e.target.tagName === 'BUTTON'){
			const button = e.target;
			const li = button.parentNode;
			const ul = li.parentNode;
			
			if(button.textContent === 'Delete'){
				ul.removeChild(li);
				
			}else if(button.textContent === 'Edit'){
				const fullName = li.firstElementChild;
				const phoneNumber = fullName.nextElementSibling;
				
				const inputFullName = document.createElement('input');
				const inputPhoneNumber = document.createElement('input');

				
				inputFullName.type = 'text';
				inputPhoneNumber.type = 'text';
				
				inputFullName.value = fullName.textContent;
				inputPhoneNumber.value = phoneNumber.textContent;
				
				
				li.insertBefore(inputFullName, fullName);
				li.insertBefore(inputPhoneNumber, phoneNumber);
				
				li.removeChild(fullName);
				li.removeChild(phoneNumber);
				
				button.textContent = 'Save';
				
			}else if(button.textContent === 'Save'){
				const fullName = li.firstElementChild;
				const phoneNumber = fullName.nextElementSibling;
				
				
				const inputFullName = document.createElement('span');
				const inputPhoneNumber = document.createElement('span');
				
				inputFullName.textContent = fullName.value ;
				inputPhoneNumber.textContent = phoneNumber.value ;
				
				li.insertBefore(inputFullName, fullName);
				li.insertBefore(inputPhoneNumber, phoneNumber);
				
				li.removeChild(fullName);
				li.removeChild(phoneNumber);
				
				button.textContent = 'Edit';
			}		
		}
	});

	
	// Create tiles for each contact
	function createLI(lastNameInput, firstNameInput,phoneNumberInput){
		const li = document.createElement('li');
		const span = document.createElement('span');

		span.textContent = lastNameInput + ' ' + firstNameInput;
		li.appendChild(span);
		
		const phoneNumber = document.createElement('span');
		phoneNumber.textContent = phoneNumberInput;
		li.appendChild(phoneNumber);
			
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		li.appendChild(editButton);
		
		const removeButton = document.createElement('button');
		removeButton.textContent = 'Delete';
		li.appendChild(removeButton);
		
		return li;
	}
	
	function save(contact){
		if(localStorage.getItem('contacts')){
			const contacts = JSON.parse(localStorage.getItem('contacts'));
			contacts.push(contact);
			localStorage.setItem('contacts', JSON.stringify(contacts));
		}else{
			const contacts = []
			contacts.push(contact);
			localStorage.setItem('contacts', JSON.stringify(contacts));
		}
	}
				

});