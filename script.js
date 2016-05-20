// Main Angular Application
var App = angular.module("myApp", []);

// Master Angular Controller
App.controller('masterCtrl', function($scope) {
	
	$scope.tasks = [];
	$scope.archived = [];
	
	$scope.numberOfTasks = 0;
	$scope.completedTasks = 0;
	
	$scope.Editor = true;
	
	$scope.addTask = function() {
		
		var title = $('#title').val();
		var desc = $('#desc').val();
		
		if( title == '' || desc == '' ) {
			$('#msg1').text('Please Fill In All Inputs.');
			setTimeout(function(){$('#msg1').text('');}, 3000);
			return;
		}
		
		$scope.tasks.push({
			id: Math.random(),
			title: title,
			desc: desc,
			done: false
		})
		
		$('#title').val('');
		$('#desc').val('');
		
		$('#msg1').text('Task Created!');
		setTimeout(function(){$('#msg1').text('');}, 3000);
		
		$scope.countTasks();
	}
	
	$scope.countTasks = function() {
		num = $scope.tasks.length;
		$scope.numberOfTasks = num;
	}
	
	$scope.archiveTask = function(obj) {
		var index = $scope.tasks.indexOf(obj);
		$scope.archived.push(obj)
		$scope.tasks.splice(index, 1)
		$('#msg1').text('Task Archived!');
		setTimeout(function(){$('#msg1').text('');}, 3000);
		
		$scope.countTasks();
	}
	
	$scope.restoreTask = function(obj) {
		var index = $scope.archived.indexOf(obj);
		$scope.tasks.push(obj)
		$scope.archived.splice(index, 1)
		$('#msg1').text('Task Restored!');
		setTimeout(function(){$('#msg1').text('');}, 3000);
		
		$scope.countTasks();
	}
	
	$scope.deleteTask1 = function(obj) {
		var index = $scope.tasks.indexOf(obj);
		$scope.tasks.splice(index, 1)
		
		$scope.countTasks();
	}
	
	$scope.deleteTask2 = function(obj) {
		var index = $scope.archived.indexOf(obj);
		$scope.archived.splice(index, 1)
	}
	
	$scope.editor = function(obj) {
		
		$scope.Editor = false;
		
		var title = obj.title;
		var desc = obj.desc;
		
		$('#e-title').val(title);
		$('#e-desc').val(desc);
		
		$scope.editTask = function() {
			var Title = $('#e-title').val();
			var Desc = $('#e-desc').val();
			obj.title = Title;
			obj.desc = Desc;
			$scope.Editor = true;
			
			$('#msg1').text('Task Edited!');
			setTimeout(function(){$('#msg1').text('');}, 3000);
			
			return obj;
		}
	}
	
	$scope.closeEditor = function(obj) {
		$scope.Editor = true;
	}
	
	$scope.countCompleted = function(obj) {
		var count = 0;
		angular.forEach($scope.tasks, function(task) {
			count += task.done ? 1 : 0;
		});
		
		return count;
	}
	
	$scope.remainingTasks = function(obj) {
		var count = 0;
		angular.forEach($scope.tasks, function(task) {
			count += task.done ? 0 : 1;
		});
		
		return count;
	}
	
});