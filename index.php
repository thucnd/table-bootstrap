<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Grid Template for Bootstrap</title>
        <link href="bootstrap.min.css" rel="stylesheet">
        <link href="bootstrap.js" rel="stylesheet">
        <script src="jquery-1.7.2.js"></script>
        <script src="bootstrap-paginator.js"></script>
        <script src="bTable.js"></script>
        <script src="colResizable-1.3.min.js"></script>
        <link href="table.css" rel="stylesheet">
    </head>

    <body>
        <div class="container">
            <div class="bTable"></div>
        </div> <!-- /container -->
       
    </body>
</html>
<script type="text/javascript">

    $(document).ready(function() {
        var wizard = $('.bTable').btable({
            url: 'post2.php',
            dataType: 'json',
            colModel: [
                {display: 'ISO', name: 'iso', width: 40, sortable: true, align: 'center'},
                {display: 'Name', name: 'name', width: 180, sortable: true, align: 'left'},
                {display: 'Printable Name', name: 'printable_name', width: 120, sortable: true, align: 'left'},
                {display: 'ISO3', name: 'iso3', width: 130, sortable: true, align: 'left', hide: true},
                {display: 'Number Code', name: 'numcode', width: 80, sortable: true, align: 'right'}
            ],
            sortname: "iso",
            sortorder: "asc",
            usepager: true,
            title: 'Countries',
            useRp: true,
            rp: 15,
            tblClass: 'table-bordered table-hover table-responsive table-striped',
            showTableToggleBtn: true,
            width: 700,
            height: 200
        });
    });
</script>