
angular.module('main', ['ngSanitize'])
	.controller('MainController', function($scope, $timeout) {
		$scope.dataNeeded = {};
		$scope.submitFile = function() {
			var fileName = $scope.fileName;
			var template = Handlebars.getTemplate(fileName);
			
			$("#myDivToPrint").html(template);
			console.log($('.edit'));
			
			$(".edit").each(function() {
				$(this).froalaEditor({
			        toolbarContainer: '#toolbarContainer',
			        toolbarButtons: ['undo', 'redo' , '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html'],
			        toolbarButtonsMD: ['undo', 'redo' , 'bold', 'italic', 'underline'],
			        toolbarButtonsSM: ['undo', 'redo' , 'bold', 'italic', 'underline'],
			        toolbarButtonsXS: ['undo', 'redo' , 'bold', 'italic', 'underline']
		      	});	
			})
			$scope.showSetting = true;

		}

		$scope.submitFor = function() {
			var template = $("#myDivToPrint").html();
			$scope.template = template;
			var dataNeeded = {};
			var values = [];
			if(!!$scope.template.match(/\{\{(.*?)\}\}/g)) {
				$scope.template.match(/\{\{(.*?)\}\}/g).forEach(function(val){
					console.log(val)
				   	var data = val.replace(/\{?\}?/g,'');
				   	console.log(data);
					if(!dataNeeded.hasOwnProperty(data)){
						dataNeeded[data] = '';
					}
					values.push(data);
				});
				console.log(dataNeeded)
				
			}
			$timeout(function() {
				$scope.dataNeeded = dataNeeded;
			})
			$scope.showPublish = true;
		}

		$scope.publish = function() {
			var template = $("#myDivToPrint").html();
			$scope.template = template;
			var compiledTemplate = Handlebars.compile($scope.template);
			$("#printThis").html(compiledTemplate($scope.dataNeeded));
			console.log(compiledTemplate($scope.dataNeeded))
			$("#myModal").modal();
		}

		function downloadInnerHtml(filename, elId, mimeType) {
		    var elHtml = document.getElementById(elId).innerHTML;
		    var link = document.createElement('a');
		    mimeType = mimeType || 'text/plain';

		    link.setAttribute('download', filename);
		    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
		    link.click(); 
		}


		$scope.downloadSource = function(){
			var fileName =  $scope.fileName + '.html'; // You can use the .txt extension if you want
		    downloadInnerHtml(fileName, 'myDivToPrint','text/html');
		};
	})

