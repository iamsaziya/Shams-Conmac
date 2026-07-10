<?php

    // Only process POST requests.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

        // Check that a valid email was sent.
        if (empty($email) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "Please enter a valid email address.";
            exit;
        }

        // Set the recipient email address.
        $recipient = "shamsconmac@gmail.com";

        // Set the email subject.
        $subject = "New Newsletter Subscriber";

        // Build the email content.
        $email_content = "New newsletter subscription:\n\n";
        $email_content .= "Email: $email\n";

        // Build the email headers.
        $email_headers = "From: Website Newsletter <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            http_response_code(200);
            echo "Thank you for subscribing!";
        } else {
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't process your subscription.";
        }

    } else {
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
