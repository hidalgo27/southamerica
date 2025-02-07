module.exports = {
    apps: [
        {
            name: 'southamerica:3003',
            port: '3003',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
