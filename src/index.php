<?php
    require('config.php');

    $png = '';
    $filename = '';
    $current = false;
    $title = 'Index';

    if (isset($_GET['s']) && $_GET['s'] !== '')
    {
        $current = $_GET['s'];
        $title = ucfirst($current);
    }
    
    if (isset($_GET['f']) && $_GET['f'] !== '')
    {
        $filename = $_GET['f'];
        $png = str_replace('.js', '.png', $filename);
        $png = str_replace('/', '_', $png);
        $title = $filename;
    }

    $ignore = array('.', '..', 'src', '_site', 'assets', 'lib');

    $path = realpath(dirname(__FILE__));

    //  http://uk1.php.net/manual/en/class.splfileinfo.php

    $directory = new RecursiveDirectoryIterator($path);
    $filter = new RecursiveCallbackFilterIterator($directory, function ($current, $key, $iterator) {

        global $ignore;

        if ($current->isDir())
        {
            $name = $current->getBasename();
            $path = $current->getPath();

            if ($name === 'wip')
            {
                return true;
            }
            else if (strpos($path, 'wip'))
            {
                return false;
            }
            else
            {
                return (array_search($current->getBasename(), $ignore) === false);
            }
        }
        else
        {
            return ($current->getType() === 'file' && $current->getExtension() === 'js');
        }

        return false;

    });

    $iterator = new RecursiveIteratorIterator($filter);

    $examples = [];
    $previous = '';

    foreach ($iterator as $info)
    {
        $section = $info->getPathInfo()->getBasename();

        if ($section !== $previous)
        {
            $examples[$section] = [];
            $previous = $section;

            if (count($examples[$section]) > 0)
            {
                sort($examples[$section]);
            }
        }

        $examples[$section][] = $info->getBasename();

    }

    $dist = 'php';

    if (isset($_COOKIE['dist']) && $_COOKIE['dist'] === 'js')
    {
        $dist = 'js';
    }

    $target = 'div';

    if (isset($_COOKIE['target']) && $_COOKIE['target'] === 'iframe')
    {
        $target = 'iframe';
    }
?>
<!doctype html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Lazer Test Runner - <?php echo $title ?></title>
        <script src="lib/browser.js" type="text/javascript"></script>
        <script src="lib/system.js" type="text/javascript"></script>
        <script src="lib/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="lib/jquery.cookie.js" type="text/javascript"></script>
        <script src="lib/record-rtc.js" type="text/javascript"></script>
        <script src="lib/blob.js" type="text/javascript"></script>
        <script src="lib/canvas-to-blob.js" type="text/javascript"></script>
        <script src="lib/filesaver.js" type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" href="_site/debug.css" />
        <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
        <?php
            if ($target == 'div')
            {
                if ($dist === 'php' && in_array($_SERVER['SERVER_NAME'], $config_hosts))
                {
                    //  Runtime version
                }
                else
                {
                    //  Built version
                    // echo '<script src="_site/phaser/' . $config_phaser_min . '" type="text/javascript"></script>';
                }
            }
        ?>
    </head>
    <body>

    <?php
        if ($target === 'div')
        {
    ?>
        <div id="game"></div>
    <?php
        }
        else
        {
    ?>
        <iframe id="game" width="800" height="600" src="iframe.php?f=<?php echo $filename ?>" style="border: 1px solid #2ab7ec"></iframe>
    <?php
        }
    ?>

        <div id="options">

            <div id="controls">

                <img src="assets/lazer2.png" style="margin: 16px 0px 0px -8px" />

                <hr />

                <input type="button" id="start" value="start" class="mini" />
                <input type="button" id="stop" value="stop" class="mini" />
                <input type="button" id="step" value="step" class="mini" />

                <hr />

                <input type="button" id="minimal" value="minimal" />

                <?php
                    if ($dist === 'php')
                    {
                ?>
                <input type="button" id="dist" value="lazer.js" />
                <?php
                    }
                    else
                    {
                ?>
                <input type="button" id="dist" value="dynamic" />
                <?php
                    }
                ?>

                <?php
                    if ($target === 'div')
                    {
                ?>
                <input type="button" id="to" value="iframe" />
                <?php
                    }
                    else
                    {
                ?>
                <input type="button" id="to" value="div" />
                <?php
                    }
                ?>

                <!-- <input type="button" id="fs" value="fullscreen" /> -->
                <input type="button" id="grab" value="screen grab (g)" />
                <input type="button" id="optionsSubmit" value="Reload" />

            </div>

        </div>

        <section>

            <div class="clr">
            <?php
                if ($current)
                {
                ?>
                    <div style="display: inline-block; margin: 16px">
                        <div class="exampleTotal"><?php echo count($examples[$current]) ?></div>
                        <a class="example selected" href="index.php?s=<?php echo $current ?>"><?php echo $current ?></a>
                    </div>

                    <div id="examples">
                <?php
                    foreach ($examples[$current] as $category => $item)
                    {
                        $fcheck = $current . '/' . $item;
                        $url = "index.php?s=$current&amp;f=$current/$item";
                        $item = substr($item, 0, -3);

                        if ($category !== 'wip')
                        {
                            //  Remove the 01- part of the filename (used for ordering, not needed for display)
                            $item = substr($item, strpos($item, '-') + 1);
                        }

                        if ($fcheck === $filename)
                        {
                            echo "<a href=\"$url\" class=\"selected\">$item</a>";
                        }
                        else
                        {
                            echo "<a href=\"$url\">$item</a>";
                        }
                    }
                ?>
                    </div>
                <?php
                }

                $total = 0;
                $keys = array_keys($examples);

                foreach ($keys as $key)
                {
                    $total += count($examples[$key]);

                    if ($current === $key)
                    {
                        continue;
                    }
                ?>
                <div style="display: inline-block; margin: 16px">
                    <div class="exampleTotal"><?php echo count($examples[$key]) ?></div>
                    <a class="example" href="index.php?s=<?php echo $key ?>"><?php echo $key ?></a>
                </div>
                <?php
                }
                ?>
            </div>


        </section>

        <div id="footer"><?php echo $total ?> Examples - @photonstorm</div>

        <?php
            if ($filename !== '' && $target === 'div')
            {
        ?>

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

        <?php
            }
        ?>

        <script type="text/javascript" charset="utf-8">
            
            /*
            $('#step').click(function(){
                game.step();
            });

            $('#start').click(function(){
                game.enableStep();
            });

            $('#stop').click(function(){
                game.disableStep();
            });

            $('#fs').click(function(){
                if (game.scale.isFullScreen)
                {
                    game.scale.stopFullScreen();
                }
                else
                {
                    game.scale.startFullScreen(false);
                }
            });
            */

            $(window).keydown(function(event) {

                //  Press G to capture
                if (event.which === 71)
                {
                    game.canvas.toBlob(function(blob) {
                        saveAs(blob, "<?php echo $png ?>");
                    });
                }

            });

            $('#grab').click(function(){

                game.canvas.toBlob(function(blob) {
                    saveAs(blob, "<?php echo $png ?>");
                });

            });

            $('#optionsSubmit').click(function(){

                saveCookies();
                window.location.reload();

            });

            $("#minimal").click(function() {

                window.location.href = 'minimal.php?<?php echo $_SERVER['QUERY_STRING'] ?>';

            });

            $("#dist").click(function() {

                console.log($(this).prop('value'));

                if ($(this).prop('value') === 'phaser.js')
                {
                    //  swap to pre-built package
                    $.cookie('dist', 'js', { expires: 7 });
                }
                else
                {
                    //  swap to PHP build
                    $.cookie('dist', 'php', { expires: 7 });
                }

                window.location.reload();

            });

            $("#to").click(function() {

                console.log($(this).prop('value'));

                if ($(this).prop('value') === 'div')
                {
                    //  Swap from iframe to div
                    $.cookie('target', 'div', { expires: 7 });
                }
                else
                {
                    //  Swap from div to iframe
                    $.cookie('target', 'iframe', { expires: 7 });
                }

                window.location.reload();

            });

            function saveCookies() {

                for (var i = 0; i < modules.length; i++)
                {
                    $.cookie(modules[i], $('#' + modules[i]).prop('checked'), { expires: 7 });
                }

            }

        </script>

        <?php //print_r($_SERVER) ?>

    </body>
</html>
