<?php 
	// get the q parameter from URL
$type="";
$regex =
  '/^'.
  '[_a-z0-9-]+'.        /* One or more underscore, alphanumeric, 
                           or hyphen charactures. */
  '(\.[_a-z0-9-]+)*'.   /* Followed by zero or more sets consisting 
                           of a period and one or more underscore, 
                           alphanumeric, or hyphen charactures. */
  '@'.                  /* Followed by an "at" characture. */
  '[a-z0-9-]+'.         /* Followed by one or more alphanumeric 
                           or hyphen charactures. */
  '(\.[a-z0-9-]{2,})+'. /* Followed by one or more sets consisting 
                           of a period and two or more alphanumeric 
                           or hyphen charactures. */
  '$/';
 
$type = $_POST["type"];
switch ($type) {
	case '1':	
	$userName = $_POST["userName"];
	if ($userName !== "") {
		if (strlen($userName) > 7) {
				echo "true";
			}else echo "false";
	}
		break;
	case '2':
	$passWord = $_POST["passWord"];
	if ($passWord !== "") {
		if (strlen($passWord) > 7) {
				echo "true";
			}else echo "false";
	}
		break;
	case '3':
	$email = $_POST["email"];
	if ($email !== "") {
			if (preg_match($regex, $email)) {
				echo "true";
			}else echo "false";
	}
		break;
	default:
		# code...
		break;
}
?>