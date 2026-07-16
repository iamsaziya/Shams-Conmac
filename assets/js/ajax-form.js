$(function() {

	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.ajax-response');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Send via EmailJS (service/template configured in the EmailJS dashboard).
		emailjs.sendForm('service_f0o7g5i', 'template_mbfmzrl', form[0])
		.then(function() {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text('Thank You! Your message has been sent.');

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
		})
		.catch(function(err) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			$(formMessages).text('Oops! Something went wrong and your message could not be sent.');
		});
	});

	// Get the newsletter form.
	var newsletterForm = $('#newsletter-form');

	// Get the messages paragraph inside the newsletter form.
	var newsletterMessages = newsletterForm.find('.newsletter-response');

	// Set up an event listener for the newsletter form.
	newsletterForm.submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(newsletterForm).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(newsletterForm).attr('action'),
			data: formData
		})
		.done(function(response) {
			newsletterMessages.removeClass('error').addClass('success');
			newsletterMessages.text(response);
			newsletterForm.find('input').val('');
		})
		.fail(function(data) {
			newsletterMessages.removeClass('success').addClass('error');
			if (data.responseText !== '') {
				newsletterMessages.text(data.responseText);
			} else {
				newsletterMessages.text('Oops! An error occured and your subscription could not be processed.');
			}
		});
	});

});
