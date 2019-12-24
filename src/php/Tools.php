<?php

class Tools {

    static function getAllFilesJS ($source) {
        foreach (scandir(getcwd()."\\".$source) as $value) {
            $accValue = str_replace(".", "", $value);
            if (strcmp($accValue, $value) === 0 && strcmp($accValue, "") !== 0) {
                Tools::getAllFilesJS ($source . "/" . $value);
            }
            if (strcmp($accValue, $value) !== 0 && strcmp($accValue, "") !== 0)  {
                echo "<script src=\"$source/$value\"></script>";
            }
        }
    }
}

?>
