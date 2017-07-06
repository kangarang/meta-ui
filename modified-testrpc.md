Clone modified `testrpc`

    $ git clone git@github.com:kangarang/testrpc.git
    $ cd testrpc
    $ npm run build
    $ cp build/cli.node.js bin/testrpci
    $ sudo chmod u+x bin/testrpci

Add `export PATH="$PATH:/path/to/testrpc/bin"` to `.bashrc`
