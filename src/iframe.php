<?php
    require('config.php');

    $filename = $_GET['f'];
?>
<!doctype html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Lazer Example</title>
        <script src="lib/browser.js" type="text/javascript"></script>
        <script src="lib/system.js" type="text/javascript"></script>
        <script src="lib/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="lib/jquery.cookie.js" type="text/javascript"></script>
        <style>
            body {
                padding: 0;
                margin: 0;
            }
        </style>
    </head>
    <body>

        <div id="game"></div>

        <script type="text/babel">

        System.baseURL = '<?php echo $config_path ?>';
        System.transpiler = 'babel';

        System.import('../src/<?php echo $filename ?>').then(some_module => {

            //  party time

        })
        .catch(error => {
            console.log(error);
        });

        </script>

    </body>
</html>
