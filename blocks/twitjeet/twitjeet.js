modules.define('twitjeet', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {

    _onSubmit: function(e) {
        e.preventDefault();
        this._sendRequest();
    },

    _sendRequest: function() {
        $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: '/search',
            data: this.elem('form').serialize(),
            success: function(result) {
                result && BEMDOM.update(this.elem('content'), result);
            },
            context: this
        });
    }

}, {

    live: function() {
        this.liveBindTo('form', 'submit', this.prototype._onSubmit);
    }

}));

});