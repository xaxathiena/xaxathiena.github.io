<?php
   $password = "thien";
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
  $regex1 = "^[_a-z1-9-][_a-z0-9-][_a-z0-9-][_a-z0-9-][_a-z0-9-][_a-z0-9-][_a-z0-9-][_a-z0-9-]+";
   if (! preg_match ($regex, $password))
   {
      print "Invalid password! Passwords must be from 8 - 10 chars";
   }
   else
   {
      print "Valid password";
   }
?>