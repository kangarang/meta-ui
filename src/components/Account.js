import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

const styles = {
    container: {
        padding: '1em 1em 0',
        border: '1px solid black',
        margin: '2em',
        fontFamily: 'monospace',
        width: '40%',
    },
    account: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    button: {
        backgroundColor: '#EEE',
        border: '1px solid #333',
        color: "#333",
        padding: '.3em',
        textDecoration: 'none',
    },
    send: {
        backgroundColor: '#EEE',
        border: '1px solid #333',
        color: "#333",
        padding: '.3em',
        marginTop: '.3em'
    },
    balance: {
        marginTop: '1em'
    },
    form: {
        margin: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
}

const Account = ({ ind, setTo, account, kangBalance, balance, send, setAmount, copy, sendKang, vote }) => {
    return (
        <div style={styles.container}>
            <div style={{ border: `3px solid #${account.slice(-6)}`, padding: '1em' }}>
                <div style={styles.account}>
                    Account {ind}: {account}
                </div>
                <div style={styles.balance}>
                    <CopyToClipboard text={account} onCopy={copy}>
                        <button style={styles.button}>Copy</button>
                    </CopyToClipboard>
                </div>
                <div style={styles.balance}>
                    ETH: {balance(account)}
                </div>
                <div style={styles.balance}>
                    KNG: {kangBalance}
                </div>
            </div>

            <form style={styles.form}>
                <input placeholder={'address'} onChange={setTo} />
                <input placeholder={'amount'} onChange={setAmount} />
                <div onClick={e => send(e, ind, account)} style={styles.send}>Send ETH</div>
                <div onClick={e => sendKang(account, ind)} style={styles.send}>Send KNG</div>
                <div onClick={e => vote(account)} style={styles.send}>Vote</div>
            </form>
        </div>
    )
}

export default Account
