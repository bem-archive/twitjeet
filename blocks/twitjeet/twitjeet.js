modules.define('twitjeet', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {

    _onSubmit: function(e) {
        e.preventDefault();
        this.findBlockInside('input').getVal()?
            this._sendRequest() :
            this._updateContent();
    },

    _sendRequest: function() {
        $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: '/search',
            data: this.elem('form').serialize(),
            success: this._updateContent,
            context: this
        });
    },

    _updateContent: function(html) {
        BEMDOM.update(this.elem('content'), html || '');
    }

}, {

    live: function() {
        this.liveBindTo('form', 'submit', this.prototype._onSubmit);
    }

}));

});