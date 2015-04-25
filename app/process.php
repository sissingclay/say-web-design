<?php

$errors         = array();  	// array to hold validation errors
$data           = array(); 		// array to pass back data

// validate the variables ======================================================

$subject = 'Say Web Design';
// message
$message = '
    <html>
        <head>
            <title>Say Web Design</title>
        </head>
        <body>
            <table>
                <tr>
                  <th style="text-align: left;">First name</th>
                  <td>'.$_POST['firstName'].'</td>
                </tr>
                <tr>
                  <th style="text-align: left;">Last name</th>
                  <td>'.$_POST['lastName'].'</td>
                </tr>
                <tr>
                  <th style="text-align: left;">Email address</th>
                  <td>'.$_POST['email'].'</td>
                </tr>
                <tr>
                  <th style="text-align: left;">Contact Number</th>
                  <td>'.$_POST['phone'].'</td>
                </tr>
                <tr>
                  <th style="text-align: left;">Enquiry</th>
                  <td>'.$_POST['project'].'</td>
                </tr>
            </table>
        </body>
    </html>
';

// message
$message2 = '
    <html>
        <head>
            <title>Say Web Design</title>
        </head>
        <body>
            <table>
                <tr>
                  <td>Your details have been sent to us. We will aim to get back to you within 24 hours of receiving your query.</td>
                </tr>
            </table>
        </body>
    </html>
';
$to 	  = 'hello@saywebdesign.co.uk';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
//$headers .= 'To: Info <claysissing@gmail.com>' . "\r\n";
$headers .= 'From: Say Web Design <hello@saywebdesign.co.uk>' . "\r\n";

if($_POST) {
    
    if(!mail($to, $subject, $message, $headers)){
        $errors['not'] = 'Email not send';
    }
    
    mail($_POST['email'], $subject, $message2, $headers);
}

// return a response ===========================================================

	// response if there are errors
	if ( ! empty($errors)) {

		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = 'There has been a problem, please contact us on O17O8 735 567';
	} else {

		// if there are no errors, return a message
		$data['success'] = true;
		$data['message'] = 'Your details have been sent to us. We will aim to get back to you within 24 hours of receiving your query.';
	}

	// return all our data to an AJAX call
	echo json_encode($data);
        
?>