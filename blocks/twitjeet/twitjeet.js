modules.define('twitjeet', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {

    _onSubmit: function(e) {
        e.preventDefault();
        this._sendRequest();
    },

    _sendRequest: function() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            cache: false,
            url: '/search',
            data: this.elem('form').serialize(),
            success: function(result) {
                result && this._updateContent(result);
            },
            context: this
        });
    },

    _updateContent: function(data) {
        BEMDOM.update(this.elem('content'), data.map(function(item) {
            return '<br/><br/>' + item;
        }));
    }

}, {

    live: function() {
        this.liveBindTo('form', 'submit', this.prototype._onSubmit);
    }

}));

});