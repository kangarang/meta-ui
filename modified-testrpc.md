Clone `testrpc`

    $ git clone https://github.com/ethereumjs/testrpc
    $ cd testrpc

Make changes found in [Pull request #342](https://github.com/ethereumjs/testrpc/pull/342)

    $ npm run build
    $ cp build/cli.node.js bin/testrpci
    $ sudo chmod u+x bin/testrpci

Add `export PATH="$PATH:/path/to/testrpc/bin"` to `.bashrc`
