function LoadExtension() {
    this.tags = ['load'];

    this.parse = function(parser, nodes, lexer) {
        var load_tok = parser.nextToken();
        var args = new nodes.NodeList(load_tok.lineno, load_tok.colno);
        var tok;
        while(1) {
          tok = parser.peekToken();
          if(tok.type === lexer.TOKEN_BLOCK_END) {
            break;
          }
          args.addChild(parser.parseOr());
        }
        parser.advanceAfterBlockEnd(load_tok.value);
        return new nodes.Output(load_tok.lineno, load_tok.colno, []);
    };
}

module.exports = {
  LoadExtension: LoadExtension
}
