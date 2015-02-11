(function($) {
	$.fn.keyChange = function(options, callback) {

		if($.isFunction(options)) {
			callback = options;
			options = {};
		}

		options = $.extend({
			minLength: 0,
			delay: 300
		}, options || {});

		return this.each(function() {
			var $input = $(this);
			if(!$input.is('input') && !$input.is('textarea')) return;
			if($.isFunction(callback)) {
				$input.bind('keyChange', callback);
			}
			if(!$input.data('keyChangeBindingDone')) {
				var text = String($input.val());
				var search = null;
				$input.keyup(function() {
					var val = $input.val();
					if(text != val && val.length >= options.minLength) {
						text = val;
						search && clearTimeout(search);
						search = setTimeout(function() {
							$input.trigger('keyChange', val);
						}, options.delay);
					}
				});
				$input.data('keyChangeBindingDone', true);
			}
		});
	};
})(jQuery);
