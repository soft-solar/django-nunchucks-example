
var Object = require('nunjucks/src/object');

var I18nExtension = Object.extend({

    init: function (gt, locale) {
        this.gt = gt;
        this.locale = locale;
        this.tags = ['trans'];
    },

    parse : function(parser, nodes, lexer) {
        var trans_tok = parser.nextToken();
        var args = new nodes.NodeList(trans_tok.lineno, trans_tok.colno);
        var tok;
        while(1) {
          tok = parser.peekToken();
          if(tok.type === lexer.TOKEN_BLOCK_END) {
            break;
          }
          args.addChild(parser.parseOr());
        }
        parser.advanceAfterBlockEnd(trans_tok.value);
        this.gt.textdomain(this.locale);
        return new nodes.Output(trans_tok.lineno, trans_tok.colno, [
          new nodes.TemplateData(trans_tok.lineno, trans_tok.colno, this.gt.gettext(args.children[0].value))
        ]);
    }
});

module.exports = {
  I18nExtension: I18nExtension
}
