var bTable = {
    init: function(options, elem) {
        var self = this;
        // Mix in the passed in options with the default options
        this.options = $.extend({}, this.options, options);
        
        // Save the element reference, both as a jQuery
        // reference and a normal reference
        this.elem = elem;
        this.ajax = null;
        this.$elem = $(elem);
        
        //init table
        this.initTableTags();
        
        //Genarate header table 
        this.displayHeaderTable();
     
        //Get Data
        var results = this.getData();
         
        //Display data table
        this.displayDataTable(results);
        
        //Display pagination
        this.displayPagination();
        
        $("#idTable").colResizable({liveDrag:true});
        // draggingClass:"dragging"});
        
        var paginations = {
                bootstrapMajorVersion:3,
                currentPage: 3,
                numberOfPages: 5,
                totalPages:11,
                size: "small",
                //useBootstrapTooltip:true,
                alignment: "pagination-right"
        }
        $('#tbPagination').bootstrapPaginator(paginations);
         
        //Sorting click
        $('#idTable th').on('click', function(){
            self.resetSorting(this);
            self.displaySorting(this);
        });
        return this;
    },
    options: {},
    displaySorting: function(thisCol) {
        var sorting = $(thisCol).attr('class');
        if(sorting === 'sorting') {
            $(thisCol).removeClass('sorting');
            $(thisCol).addClass('sorting_asc');
            
        } else if(sorting === 'sorting_asc') {
            $(thisCol).removeClass('sorting_asc');
            $(thisCol).addClass('sorting_desc');
            
        } else if(sorting === 'sorting_desc') {
            $(thisCol).removeClass('sorting_desc');
            $(thisCol).addClass('sorting_asc');
        }
    },
    resetSorting: function(thisCol) {
        $('#idTable th').each(function() {
            var sorting = $(this).attr('class');
            if((sorting === 'sorting_asc' || sorting === 'sorting_desc') && this != thisCol) {
                $(this).removeClass(sorting);
                $(this).addClass('sorting');
            }
        });
    },    
    displayHeaderTable: function() {
        var self = this;
        var str = '<thead><tr>';
        var columns = self.options['colModel'];

        for (var i = 0; i < columns.length; i++) {
            var clsSorting = '';
            var relName = '';
            var align = ''
            var width = '';
            
            if(columns[i]['sortable']) {
                clsSorting = ' class="sorting" ';
            }
            
            //Display sort column
            if(columns[i]['name'] == self.options['sortname']) {
                clsSorting = ' class="sorting_' + self.options['sortorder'] + '" ';
            }
            
            //Display column name
            relName = ' rel="' + columns[i]['name'] + '" ';
            
            //Display aligin
            if(typeof columns[i]['align'] != 'undefined') {
                align = ' align="' + columns[i]['align'] + '" ';
            }
            
            //Display width
            if(typeof columns[i]['width'] != 'undefined') {
                width = ' style="width: ' + columns[i]['width'] + 'px;" ';
            }
            
            //Display sorting column
            str +='<th ' + clsSorting + relName + align + width + '>';
            str +=columns[i]['display'];
            str +='</th>';
        }
        str += '</tr></thead>';
        $('#idTable').append(str);
    },
    displayPagination: function() {
        var str = '<ul id="tbPagination">';
        str += '</ul>';
        $('.bTable').append(str);
    },
    displayDataTable: function(results) {
       var self = this;
       var str = '<tbody>';
       // var rows = results['data'];
       var rows = JSON.parse(results);
       var clsRow = '';
        for (var i = 0; i < rows.length; i++) {
            clsRow = '';
            
            // Display Row color
            if(i%2 != 0) {
                clsRow = 'class="success"';
            }
            str +='<tr ' + clsRow + '>';
            
            //Display data
            for (var j = 0; j < rows[i].length; j++) {
                str +='<td>';
                str +=rows[i][j];
                str +='</td>';
            }
            str +='</tr>';
        }
        str += '</tbody>';
        $('#idTable').append(str);
    },
    initTableTags: function() {
        var self = this;
        var clsTable ='class="table dataTable ';
        if(typeof self.options['tblClass'] != 'undefined') {
            clsTable += self.options['tblClass'];
        }
        clsTable +='"';
        $(self.elem).empty();
        $(self.elem).append('<table  ' + clsTable + ' id="idTable"></table>');
    },
    getData: function() {
        var results = new Array();
        for(var i = 0; i < 50; i++) {
            var data = new Array(); 
            data[0] = 'ISO' + i;
            data[1] = 'Name' + i;
            data[2] = 'Printable Name' + i;
            data[3] = 'ISO3' + i;
            data[4] = 'Number Code' + i;
            results.push(data);
        }
        
        return JSON.stringify(results);
    }
};

// Make sure Object.create is available in the browser (for our prototypal inheritance)
// Note this is not entirely equal to native Object.create, but compatible with our use-case
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        function F() {
        }// optionally move this outside the declaration and into a closure if you need more speed.
        F.prototype = o;
        return new F();
    };
}
;
(function($) {
    $.fn.btable = function(options) {
//        url: 'post2.php',
//	dataType: 'json',
//	colModel : [
//		{display: 'ISO', name : 'iso', width : 40, sortable : true, align: 'center'},
//		{display: 'Name', name : 'name', width : 180, sortable : true, align: 'left'},
//		{display: 'Printable Name', name : 'printable_name', width : 120, sortable : true, align: 'left'},
//		{display: 'ISO3', name : 'iso3', width : 130, sortable : true, align: 'left', hide: true},
//		{display: 'Number Code', name : 'numcode', width : 80, sortable : true, align: 'right'}
//		],
//	buttons : [
//		{name: 'Add', bclass: 'add', onpress : test},
//		{name: 'Delete', bclass: 'delete', onpress : test},
//		{separator: true}
//		],
//	searchitems : [
//		{display: 'ISO', name : 'iso'},
//		{display: 'Name', name : 'name', isdefault: true}
//		],
//	sortname: "iso",
//	sortorder: "asc",
//	usepager: true,
//	title: 'Countries',
//	useRp: true,
//	rp: 15,
//	showTableToggleBtn: true,
//	width: 700,
//	height: 200
        if (this.length) {
            return this.each(function() {
                var plugin = Object.create(bTable);
             
                // Run the initialization function of plugin
                plugin.init(options, this);

                // Save the instance of the object in the element's data store
                $.data(this, 'bTable', plugin);
            });
        }
    };
})(jQuery);
