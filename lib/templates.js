var templates = {};
Handlebars.getTemplate = function(name) {
	if (templates === undefined || templates[name] === undefined) {
		$.ajax({
			url : 'templates/' + name + '.handlebars',
			success : function(data) {
				if (templates === undefined) {
					templates = {};
				}
				templates[name] = data;
			},
			async : false
		});
	}
	return templates[name];
};