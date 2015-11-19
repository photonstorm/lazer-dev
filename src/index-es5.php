<?php
    $file = '';

    if (isset($_GET['f']))
    {
        $file = $_GET['f'];
    }
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Lazer Test Runner</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
            margin: 16px;
        }

        a {
            text-decoration: none;
        }

        a:Hover {
            text-decoration: underline;
            color: red;
        }
    </style>
</head>
<body>

    <div id="game"></div>

    <?php
        if ($file !== '')
        {
    ?>
    <script type="text/javascript">

    <?php
        $src = file_get_contents("../src/$file");
        echo $src;
    ?>

    </script>
    <?php
        }
    ?>

    <ul>
    <?php
        $projects = scandir('.');

        $ignore = array('.', '..', '.git', 'node_modules', 'assets', 'dist');

        foreach ($projects as $key => $value) {

            if (!in_array($value, $ignore) && substr($value, -2) === 'js')
            {
                echo "<li><a href=\"index-es5.php?f=$value\">$value</a></li>";
            }
        }
    ?>
    </ul>

</body>
</html>